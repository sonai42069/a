import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { consultants } from './ConsultantList'; // Import consultant data as an array
import { getBookingByConsultant } from './booking'; // Function to fetch booking by consultant

const validationSchema = Yup.object().shape({
  rescheduleDate: Yup.date()
    .required('Rescheduled date and time are required')
    .min(new Date(), 'Date cannot be in the past'),
  remarks: Yup.string()
});

const RescheduleConsultant = () => {
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isRescheduled, setIsRescheduled] = useState(false);

  useEffect(() => {
    // Fetch consultants from consultantData
    setConsultants(consultants);
  }, []);

  useEffect(() => {
    if (selectedConsultant) {
      // Fetch existing appointments for selected consultant
      const bookings = getBookingByConsultant(selectedConsultant);
      setAppointments(bookings || []);
    }
  }, [selectedConsultant]);

  const initialValues = {
    rescheduleDate: '',
    remarks: ''
  };

  const handleSubmit = async (values) => {
    try {
      // Assuming each appointment has an ID and your backend endpoint for updating appointments is `/api/appointments/:id`
      const response = await fetch(`/api/appointments/${selectedConsultant}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rescheduleDate: values.rescheduleDate,
          remarks: values.remarks
        })
      });
  
      if (response.ok) {
        // If the response is successful, display confirmation
        console.log('Appointment updated successfully.');
        setIsRescheduled(true);
      } else {
        console.error('Failed to reschedule the appointment.');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  

  return (
    <div className="reschedule-container" id="reschedule">
      <h1 id="title-section">Reschedule Appointment</h1>
      {isRescheduled ? (
        <div className="confirmation-message" id="confirmation-section">
          <h2>Appointment Rescheduled!</h2>
          <p>Your appointment has been successfully rescheduled.</p>
        </div>
      ) : (
        <>
          <div className="form-group" id="consultant-select-section">
            <label htmlFor="consultantSelect" className="subtopic">Select Consultant</label>
            <select
              id="consultantSelect"
              className="form-field"
              onChange={(e) => setSelectedConsultant(e.target.value)}
              value={selectedConsultant}
            >
              <option value="" label="Select a consultant" />
              {consultants.map((consultant) => (
                <option key={consultant.id} value={consultant.name}>
                  {consultant.name}
                </option>
              ))}
            </select>
          </div>

          {appointments.length > 0 ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => (
                <Form className="reschedule-form" id="form-section">
                  <div className="appointments-list">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="appointment-item">
                        <p>Current Appointment: {appointment.consultantName} on {appointment.appointmentDate}</p>
                      </div>
                    ))}
                  </div>
                  <div className="form-group" id="reschedule-date-section">
                    <label htmlFor="rescheduleDate" className="subtopic">New Appointment Date & Time</label>
                    <Field
                      type="datetime-local"
                      id="rescheduleDate"
                      name="rescheduleDate"
                      className="form-field"
                    />
                    <ErrorMessage name="rescheduleDate" component="div" className="error-message" />
                  </div>

                  <div className="form-group" id="remarks-section">
                    <label htmlFor="remarks" className="subtopic">Remarks</label>
                    <Field
                      as="textarea"
                      id="remarks"
                      name="remarks"
                      className="form-field"
                    />
                    <ErrorMessage name="remarks" component="div" className="error-message" />
                  </div>

                  <button type="submit" className="submit-button" id="submit-button">Reschedule</button>
                </Form>
              )}
            </Formik>
          ) : (
            <p className="no-appointment-message">No appointments found for this consultant.</p>
          )}
        </>
      )}

      <style>
        {`
          .reschedule-container {
            padding: 20px;
            max-width: 1000px;
            min-width: 500px;
            margin: 40px auto;
            background-color: #f4f4f4;
            border-radius: 19px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .reschedule-form, .form-group { margin-bottom: 15px; }
          .form-field { width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
          .submit-button { background-color: #ff9f00; color: white; border: none; padding: 10px 20px; border-radius: 19px; cursor: pointer; transition: background-color 0.3s ease; }
          .submit-button:hover { background-color: #ff7f00; }
          .confirmation-message, .no-appointment-message { text-align: center; color: #333; margin-top: 20px; }
          #title-section { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
          .appointments-list { margin-bottom: 20px; }
          .appointment-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        `}
      </style>
    </div>
  );
};

export default RescheduleConsultant;
