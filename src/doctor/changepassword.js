import React, { useState, useEffect } from "react";
import { db } from "../config/FirebaseConfig"; // Import Firestore instance
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore"; // Firestore imports
import bcrypt from "bcryptjs"; // Import bcryptjs for hashing passwords
import "./changepassword.css";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doctorId, setDoctorId] = useState(""); // To store the doctor ID from session storage

  useEffect(() => {
    // Retrieve doctorId from sessionStorage on component load
    const storedDoctorId = sessionStorage.getItem("Doctor_id");
    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
    } else {
      alert("No doctor logged in. Please login first.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    try {
      // Query to fetch the doctor by doctorId
      const q = query(collection(db, 'Doctor'), where('Doctor_id', '==', doctorId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doctorData = querySnapshot.docs[0].data(); // Get the first document's data

        // Verify if the old password matches the stored password
        const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, doctorData.password);
        if (isOldPasswordCorrect) {
          // Old password is correct, hash the new password
          const hashedNewPassword = bcrypt.hashSync(newPassword, 10); // Hash the new password
          const docRef = querySnapshot.docs[0].ref; // Get reference of the document to update
          await updateDoc(docRef, {
            password: hashedNewPassword, // Save the hashed password
          });
          alert("Password updated successfully!");
        } else {
          alert("Old password is incorrect.");
        }
      } else {
        alert("Doctor record not found.");
      }
    } catch (error) {
      console.error("Error updating password: ", error);
      alert("Error updating password: " + error.message);
    }

    // Reset form fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const textStyle = {
    paddingLeft: '150px',
    paddingbottom: '1px',
  };

  return (
    <div className="changepassword-App-con">
      <form className="changepassword-body-container" onSubmit={handleSubmit}>
        <h1>Update Password</h1>
        <div style={textStyle}>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
       <div className="changepassword-New-container">
       <div style={{displsy:'flex'}}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div style={{displsy:'flex'}}>
          <label>Confirm Password:</label> 
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
       </div>
        <button className="patientlabrecordsbutton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
