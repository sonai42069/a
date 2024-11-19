import React, { useState, useEffect } from 'react';
import { getBookingByConsultant } from './booking'; // Make sure this function is defined and returns an array

const CancelAppointment = ({ consultantName }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Check if consultantName is defined before fetching appointments
    if (consultantName) {
      const bookings = getBookingByConsultant(consultantName) || [];
      setAppointments(bookings);
    }
  }, [consultantName]);

  const handleCancel = (appointmentId) => {
    // Ensure the appointment ID exists before attempting to cancel
    if (appointmentId) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
      console.log(`Cancelled appointment ID: ${appointmentId}`);
    }
  };

  return (
    <div className="cancel-appointment-container">
      <h1>Cancel Appointment</h1>
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <p>
              Appointment with {appointment.consultantName} on{' '}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </p>
            <button
              className="cancel-button"
              onClick={() => handleCancel(appointment.id)}
            >
              Cancel Appointment
            </button>
          </div>
        ))
      ) : (
        <p>No appointments found for this consultant.</p>
      )}

      <style>
        {`
          .cancel-appointment-container {
            padding: 20px;
            max-width: 1000px;
            min-width: 500px;
            margin: 40px auto;
            background-color: #f4f4f4;
            border-radius: 19px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .appointment-card {
            padding: 15px;
            margin-bottom: 10px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .cancel-button {
            background-color: #ff4f4f;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .cancel-button:hover {
            background-color: #e63939;
          }
          h1 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default CancelAppointment;
