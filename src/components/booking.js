import React, { useState } from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { db } from '../config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs} from 'firebase/firestore';

// Sample booking data
const bookings = [
  { id: 1, consultantName: 'Dr. John Doe', appointmentDate: '2024-10-01T10:00' },
  { id: 2, consultantName: 'Dr. Jane Smith', appointmentDate: '2024-10-02T11:00' },
  // Add more bookings as needed
];

// Function to get booking by consultant name
export const getBookingByConsultant = async (consultantName) => {
  const q = query(collection(db, 'bookings'), where('consultantName', '==', consultantName));
  const querySnapshot = await getDocs(q);
  const bookings = [];
  querySnapshot.forEach((doc) => bookings.push({ id: doc.id, ...doc.data() }));
  return bookings;
};
// Validation schema with Yup
const validationSchema = Yup.object().shape({
  consultantName: Yup.string().required('Consultant name is required'),
  consultantEmail: Yup.string().email('Invalid email').required('Email is required'),
  appointmentDate: Yup.date()
    .required('Appointment date and time are required')
    .min(new Date(), 'Date cannot be in the past'),
  reference: Yup.string()
});

const Booking = () => {
  // State to track booking confirmation
  const [isBooked, setIsBooked] = useState(false);
  const [consultantName, setConsultantName] = useState('');

  // Get current date and time in the required format
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format for "YYYY-MM-DDTHH:MM"
  };

  // List of consultants
  const consultants = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. Emily Davis' },
    { id: 4, name: 'Dr. Robert Brown' }, 
    { id: 5, name: 'Dr. Sarah Wilson' },
    { id: 6, name: 'Dr. Michael Johnson' },
    { id: 7, name: 'Dr. Laura Garcia' },
    { id: 8, name: 'Dr. James Lee' },
    { id: 9, name: 'Dr. Karen Martinez' },
    { id: 10, name: 'Dr. Daniel Anderson' },
    { id: 11, name: 'Dr. Patricia Thompson' },
    { id: 12, name: 'Dr. Matthew Young' },
    { id: 13, name: 'Dr. Barbara White' },
    { id: 14, name: 'Dr. Charles Harris' },
    { id: 15, name: 'Dr. Nancy Walker' },
    { id: 16, name: 'Dr. David Robinson' },
    { id: 17, name: 'Dr. Susan Martinez' },
    { id: 18, name: 'Dr. Joshua Clark' },
    { id: 19, name: 'Dr. Linda Rodriguez' },
    { id: 20, name: 'Dr. Joseph Taylor' },
  ];

  // Initial values for the form
  const initialValues = {
    consultantName: '',
    consultantEmail: '',
    appointmentDate: '',
    reference: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, 'bookings'), {
        consultantName: values.consultantName,
        consultantEmail: values.consultantEmail,
        appointmentDate: values.appointmentDate,
        reference: values.reference,
      });
      setConsultantName(values.consultantName); // Save consultant name for confirmation
      setIsBooked(true); // Set booking status to true
      resetForm(); // Clear the form
    } catch (error) {
      console.error('Error adding booking: ', error);
    }
  };
  

  return (
    <div className="booking-container" id="booking">
      <h1 id="title-section">Book an Appointment</h1>
      {isBooked ? (
        <div className="confirmation-message" id="confirmation-section">
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {consultantName}. Your appointment has been successfully booked.</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="booking-form" id="form-section">
              <div className="form-group" id="consultant-name-section">
                <label htmlFor="consultantName" className="subtopic">Consultant Name</label>
                <Field
                  as="select"
                  id="consultantName"
                  name="consultantName"
                  className="form-field"
                >
                  <option value="" label="Select a consultant" />
                  {consultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.name}>
                      {consultant.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="consultantName" component="div" className="error-message" />
              </div>

              <div className="form-group" id="appointment-date-section">
                <label htmlFor="appointmentDate" className="subtopic">Appointment Date & Time</label>
                <Field
                  type="datetime-local"
                  id="appointmentDate"
                  name="appointmentDate"
                  className="form-field"
                  min={getMinDateTime()} // Set min attribute to disable past dates
                />
                <ErrorMessage name="appointmentDate" component="div" className="error-message" />
              </div>

              <div className="form-group" id="reference-section">
                <label htmlFor="reference" className="subtopic">Remarks</label>
                <Field
                  as="textarea"
                  id="reference"
                  name="reference"
                  className="form-field"
                />
                <ErrorMessage name="reference" component="div" className="error-message" />
              </div>

              <button type="submit" className="submit-button" id="submit-button">Save</button>
            </Form>
          )}
        </Formik>
      )}

      <style>
        {`
          .booking-container {
            padding: 20px;
            max-width: 1000px;
            min-width: 500px;
            margin: 40px auto;
            background-color: #f4f4f4;
            border-radius: 19px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .booking-form {
            display: flex;
            flex-direction: column;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .subtopic {
            font-size: 18px;
          }

          .form-field {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            box-sizing: border-box;
          }

          .error-message {
            color: red;
            font-size: 0.875em;
          }

          .submit-button {
            background-color: #03c1c0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 19px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #007F80;
          }

          .confirmation-message {
            text-align: center;
            color: #333;
            margin-top: 20px;
          }

          #title-section {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Booking; // Default export
