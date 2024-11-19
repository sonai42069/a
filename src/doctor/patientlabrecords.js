import React, { useState, useEffect } from "react";
import { db, storage } from "../config/FirebaseConfig";
import { collection, addDoc, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import "./patientlabrecords.css";

function Patientlabrecords() {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [pictureName, setPictureName] = useState("");
  const [pictureDetails, setPictureDetails] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams(); // Patient ID from URL params
  const navigate = useNavigate();

  // Predefined list of report names
  const reportNames = [
    "IOPA",
    "OPG",
    "X-Ray Report",
    "Lateral Cephalogram",
    "CBCT",
    "Others",
  ];

  useEffect(() => {
    if (id) {
      // Fetch existing patient record if editing
      const fetchPatientData = async () => {
        try {
          const patientDocRef = doc(db, "Patients Lab Reports", id);
          const patientDoc = await getDoc(patientDocRef);

          if (patientDoc.exists()) {
            const data = patientDoc.data();
            setPatientId(data.patientId);
            setPatientName(data.patientName);
            setPictureName(data.pictureName);
            setPictureDetails(data.pictureDetails);
            setPreview(data.imageUrl);
            setIsEditing(true); // Set to editing mode
          } else {
            alert("Patient record not found!");
            navigate("/doctorlogin"); // Redirect if record is not found
          }
        } catch (error) {
          console.error("Error fetching patient data: ", error);
        }
      };

      fetchPatientData();
    }
  }, [id, navigate]);

  // Fetch patient name from the "Patients" collection based on patientId
  const fetchPatientName = async (patient_id) => {
    try {
      const patientRef = doc(db, "Patients", patient_id); // Assuming Patients is the collection
      const patientDoc = await getDoc(patientRef);
      if (patientDoc.exists()) {
        setPatientName(patientDoc.data().patient_name || "Unknown"); // Handle missing field
      } else {
        setPatientName(""); // Clear name if no match
        alert("Patient not found in the database!");
      }
    } catch (error) {
      console.error("Error fetching patient name: ", error);
      setPatientName(""); // Clear name on error
    }
  };

  // Trigger fetchPatientName when patientId changes
  useEffect(() => {
    if (patientId.trim() !== "") {
      fetchPatientName(patientId);
    } else {
      setPatientName(""); // Clear the name if patientId is cleared
    }
  }, [patientId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId || !patientName || !pictureName || !pictureDetails || !image) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    try {
      const fileName = `${Date.now()}_${image.name}`;
      const imageRef = ref(storage, `Patients Lab Reports/${fileName}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      if (isEditing) {
        // If editing, delete old file and update document
        const patientDocRef = doc(db, "Patients Lab Reports", id);
        const patientDoc = await getDoc(patientDocRef);
        const oldImageUrl = patientDoc.data().imageUrl;

        // Delete the old image from Firebase Storage
        if (oldImageUrl) {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        }

        await updateDoc(patientDocRef, {
          patientId,
          patientName,
          pictureName,
          pictureDetails,
          imageUrl,
          fileName,
          uploadDate: formattedDate,
          uploadTime: formattedTime,
        });

        alert("Patient report updated successfully!");
      } else {
        // If adding new record
        await addDoc(collection(db, "Patients Lab Reports"), {
          patientId,
          patientName,
          pictureName,
          pictureDetails,
          imageUrl,
          fileName,
          uploadDate: formattedDate,
          uploadTime: formattedTime,
        });

        alert("Patient report added successfully!");
      }

      // Reset form after submission
      setPatientId("");
      setPatientName("");
      setPictureName("");
      setPictureDetails("");
      setImage(null);
      setPreview(null);

      navigate("/doctorlogin/viewLabReports"); // Redirect to history page
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Error: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const patientDocRef = doc(db, "Patients Lab Reports", id);
        const patientDoc = await getDoc(patientDocRef);

        if (patientDoc.exists()) {
          const oldImageUrl = patientDoc.data().imageUrl;
          if (oldImageUrl) {
            const oldImageRef = ref(storage, oldImageUrl);
            await deleteObject(oldImageRef); // Delete image from Firebase Storage
          }

          await deleteDoc(patientDocRef); // Delete record from Firestore
          alert("Patient report deleted successfully!");
          navigate("/doctorlogin/labuploadhistory");
        }
      } catch (error) {
        console.error("Error deleting patient record: ", error);
        alert("Failed to delete record. Error: " + error.message);
      }
    }
  };

  return (
    <div className="App-con">
      <form className="body-container" onSubmit={handleSubmit}>
        <h1>{isEditing ? "Edit Patient Report" : "Patient Report Submission"}</h1>
        <div>
          <label>Patient ID:</label><br />
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Patient Name:</label><br />
          <input
            type="text"
            value={patientName}
            readOnly
            placeholder="Patient name"
          />
        </div>
        <div>
          <label>Select Report Name:</label><br />
          <select
            className="styled-select"
            value={pictureName}
            onChange={(e) => setPictureName(e.target.value)}
            required
          >
            <option value="" disabled>Select a report</option>
            {reportNames.map((report) => (
              <option key={report} value={report}>
                {report}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Report Details:</label><br />
          <input
            type="text"
            value={pictureDetails}
            onChange={(e) => setPictureDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>
        {preview && (
          <div>
            <h3>Report Preview:</h3>
            <img src={preview} alt="Preview" className="image" />
          </div>
        )}
        <button className="patientlabrecordsbutton" type="submit">{isEditing ? "Update" : "Submit"}</button>
{/*         {isEditing && (
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Report
          </button>
        )} */}
      </form>
    </div>
  );
}

export default Patientlabrecords;
