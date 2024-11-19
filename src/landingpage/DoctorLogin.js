import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig"; // Firebase config
import bcrypt from 'bcryptjs'; // Import bcryptjs
import './login.css';
import Loginnavbar from './loginnavbar';

function DoctorLogin({ onLogin }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to fetch and validate login credentials from Firestore
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Query the 'Doctor' collection for a document where 'username' matches
      const q = query(collection(db, 'Doctor'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        let doctorData = null;

        // Firestore returns all matching documents (though you should have only one doctor per username)
        querySnapshot.forEach((doc) => {
          doctorData = doc.data(); // Get the doctor data
        });

        if (doctorData) {
          // Compare entered password with the hashed password stored in Firestore
          const passwordMatch = await bcrypt.compare(password, doctorData.password);

          if (passwordMatch) {
            alert('Login Successfully');
            sessionStorage.setItem('Doctor_id', doctorData.Doctor_id); // Store doctor ID in session storage
            onLogin(); // Trigger the onLogin function passed as a prop
            navigate("/doctorlogin/dailyappointments"); // Redirect to DoctorDashboard
          } else {
            alert('Invalid password');
          }
        } else {
          alert('Doctor data not found');
        }
      } else {
        alert('Username does not exist');
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      alert('Error logging in, please try again later. ' + error.message);
    }
  };

  return (
    <div>
      <Loginnavbar />
      <div className="signup-login-container">
        <h1>Doctor</h1>
        <center>
          <h3>Log In</h3>
        </center>
        <div className="login-div">
          <div className="username">
            <div className="icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="input">
              <input
                type="text"
                name="username"
                className="user-input"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="password">
            <div className="icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                className="user-input"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="hide-icon" />
              </span>
            </div>
          </div>
          <div className="login-btn">
            <input type="button" value="Log In" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
