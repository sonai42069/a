import React, { useState, useEffect } from "react";
import { db, storage } from "../config/FirebaseConfig"; // Import Firestore and Storage instances
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import "./patientlabrecords.css";

function Patientlabrecords() {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState(""); // Holds fetched patient name
  const [pictureName, setPictureName] = useState(""); // Selected report name
  const [pictureDetails, setPictureDetails] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Predefined list of report names
  const reportNames = [
    "IOPA",
    "OPG",
    "X-Ray Report",
    "Lateral Cephalogram",
    "CBCT",
    "Others",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch patient name using patient ID
  const fetchPatientName = async () => {
    if (patientId) {
      try {
        const patientDocRef = doc(db, "Patients", patientId);
        const patientDoc = await getDoc(patientDocRef);
        if (patientDoc.exists()) {
          setPatientName(patientDoc.data().patient_name);
        } else {
          setPatientName("");
          alert("Patient not found. Please check the Patient ID.");
        }
      } catch (error) {
        console.error("Error fetching patient name: ", error);
        alert("Error fetching patient data: " + error.message);
      }
    } else {
      setPatientName("");
    }
  };

  useEffect(() => {
    fetchPatientName();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Generate a unique filename
      const fileName = `${Date.now()}_${image.name}`;
      
      // Reference to the storage location with the unique filename
      const imageRef = ref(storage, `PatientsLabReports/${fileName}`);
      await uploadBytes(imageRef, image); // Upload the file to Firebase Storage
      const imageUrl = await getDownloadURL(imageRef); // Get the URL of the uploaded image
  
      // Get current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString(); // Format date (e.g., "10/19/2024")
      const formattedTime = currentDate.toLocaleTimeString(); // Format time (e.g., "3:30:00 PM")
  
      // Save data to Firestore, including the fileName
      const docRef = await addDoc(collection(db, "PatientsLabReports"), {
        patientId: patientId,
        patientName: patientName,
        pictureDetails: pictureDetails,
        pictureName: pictureName,
        imageUrl: imageUrl,
        fileName: fileName, // Store the filename in Firestore
        uploadDate: formattedDate,
        uploadTime: formattedTime,
      });
  
      console.log("Data successfully saved to Firestore! Document ID: ", docRef.id);
      alert("Patient data saved successfully!");
  
      // Reset form
      setPatientId("");
      setPatientName("");
      setPictureName("");
      setPictureDetails("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Error: " + error.message);
    }
  };
  

  return (
    <div className="App-con">
      <form className="body-container" onSubmit={handleSubmit}>
        <h1>Patient's Report Submission</h1>
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
            placeholder="Patient name "
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
            <h3>Image Preview:</h3>
            <img src={preview} alt="Preview" className="image" />
          </div>
        )}
        <button className="patientlabrecordsbutton" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Patientlabrecords;
