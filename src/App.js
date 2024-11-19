import React, { useState, useEffect } from 'react';
import './App.css';
import Landingpage from './landingpage/landingpage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import SideNavbar from './doctor/sidenav';
import Dailyappointments from './doctor/dailyappointments';
import DoctorLogin from './landingpage/DoctorLogin';
import PatientDiary from './doctor/dairy';
import Globalnavbar from './doctor/globalnavbar';
import Approval from './doctor/approval';
import Patientlabrecords from './doctor/patientlabrecords';
import LabUpload from './doctor/labupload';
import LabHistory from './doctor/labuploadhistory';
import Changepassword from './doctor/changepassword';
import Rescheduleappointment from './doctor/ManagementAppointment/rescheduleAppointment';
import Cancelappointment from './doctor/ManagementAppointment/cancelAppointment';
import Bookappointment from './doctor/ManagementAppointment/bookAppointment';
import VieweditPatient from './doctor/PatientVisit/Patient';
import AddPrescription from './doctor/PatientVisit/Prescription';
import ConsultantBooking from './components/booking'; // Your Booking component
import BookingHistory from './components/History'; // New BookingHistory component
import ConsultantPayments from './components/Payment'; // Component for Payments
import ConsultantList from './components/ConsultantList'; // Import the ConsultantList component
import ConsultantPaymentHistory from './components/PaymentHistory'; // Import PaymentHistory component
import AddConsultant from './components/AddConsultant'; // Import PaymentHistory component
import RescheduleConsultant from './components/RescheduleConsultant'; // Import PaymentHistory component
import CancelConsultantAppointment from './components/CancelAppointment'; // Import PaymentHistory component
import ViewFutureAppointment from './doctor/PatientVisit/View_list';
import ViewLabReports from './doctor/viewlabRecord';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [passView, setPassView] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(savedAuthState);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Globalnavbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/doctorlogin/dailyappointments" /> : <Landingpage />
          }
        />
        <Route
          path="/authenticate"
          element={
            !isAuthenticated ? (
              <DoctorLogin onLogin={handleLogin} />
            ) : (
              <Navigate to="/doctorlogin/dailyappointments" />
            )
          }
        />
        {isAuthenticated ? (
          <Route path="/doctorlogin" element={<SideNavbar />}>
            <Route path="dailyappointments" element={<Dailyappointments />} />
            <Route path="rescheduleappointment" element={<Rescheduleappointment />} />
            <Route path="cancelappointment" element={<Cancelappointment />} />
            <Route path="bookappointment" element={<Bookappointment />} />
            <Route path="view&editpatient" element={<VieweditPatient />} />
            <Route path="addprescription" element={<AddPrescription />} />
            <Route path="view-Appointments" element={<ViewFutureAppointment />} />            
            <Route path="diary" element={<PatientDiary />} />
            <Route path="patientlab" element={<Patientlabrecords />} />
            <Route path="patientlab/:id" element={<Patientlabrecords />} />
            <Route path="labUpload" element={<LabUpload />} />
            <Route path="viewLabReports" element={<ViewLabReports />} />
            <Route path="labUploadHistory" element={<LabHistory />} />
            <Route path="approval" element={<Approval />} />
            <Route path="changepassword" element={<Changepassword />} />
            <Route path="consultantBookAppointment" element={<ConsultantBooking />} />
            <Route path="history" element={<BookingHistory />} />
            <Route path="consultantpayment" element={<ConsultantPayments />} />
            <Route path="consultantpaymenthistory" element={<ConsultantPaymentHistory />} />
            <Route path="consultantList" element={<ConsultantList />} />
            <Route path="AddConsultant" element={<AddConsultant />} />
            <Route path="consultantAppointmentReschedule" element={<RescheduleConsultant />} />
            <Route path="consultantAppointmentCancel" element={<CancelConsultantAppointment />} />
            <Route path="labupload/:id" element={<LabUpload />} />
   
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      
    </Router>
  );
}

export default App;
