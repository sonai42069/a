import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig'; // Ensure this is your Firebase configuration file

const PatientDiary = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const patientsCollection = collection(db, 'Patient Appointments'); // Ensure this is the correct collection
        const patientsSnapshot = await getDocs(patientsCollection);
        const patientList = patientsSnapshot.docs.map(doc => doc.data());
        
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchBasicInfo();
  }, []);

  // Function to format the date of birth
  const formatDateOfBirth = (dob) => {
    const dateParts = dob.split('_'); // Split the string by underscores
    const year = dateParts[0];
    const month = dateParts[1] - 1; // Months are 0-indexed in JavaScript
    const day = dateParts[2];

    return new Date(year, month, day).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to handle viewing a patient's diary
  const handleViewDiary = (patient) => {
    setSelectedPatient(patient);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPatient(null);
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      patient.patient_name.toLowerCase().includes(searchTermLower) ||
      patient.patient_id.toLowerCase().includes(searchTermLower) ||
      patient.gender.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div>
      <h2 className="patient-diaries-header">Today's Diary</h2>

      {/* Search Input
      <input
        type="text"
        placeholder="Search by Patient Name, ID, or Gender"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}

      {filteredPatients.length > 0 ? (
        <table className="patient-diaries-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Gender</th>
              <th>Appointments Date</th>
              <th>Go Verify</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="patient-basic-info-row">
                <td>{patient.patient_name}</td>
                <td>{patient.patient_id}</td>
                <td>{patient.gender}</td>
               
                <td>{formatDateOfBirth(patient.appointment_date)}</td>
                <td>
                  <button className="btn" onClick={() => handleViewDiary(patient)}>
                    View Diary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Patient Diaries Available</h2>
      )}

      {/* Modal for displaying selected patient details */}
      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Patient Details</h3>
            <p><strong>Name:</strong> {selectedPatient.patient_name}</p>
            <p><strong>ID:</strong> {selectedPatient.patient_id}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Appointment_date:</strong> {formatDateOfBirth(selectedPatient.appointment_date)}</p>
            <h4>Chief Complaint</h4>
            <p>{selectedPatient.reason_for_visit || "Not available"}</p>
            <h4>Medicines Prescribed</h4>
            <p>{selectedPatient.medicines || "No medicines prescribed"}</p>
            <h4>Laboratory Tests</h4>
            <p>{selectedPatient.laboratory_tests || "No laboratory tests conducted"}</p>
            <h4>Consultant Verification</h4>
            <p>{selectedPatient.consultant_verification || "Pending verification"}</p>
            <h4>Payment Status</h4>
            <p>{selectedPatient.payment_status || "Payment pending"}</p>
            <button className="bt" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDiary;