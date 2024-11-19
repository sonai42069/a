import React, { useState} from 'react';
import './sidenav.css';
import { Link, Outlet } from 'react-router-dom';

const SideNavbar = () => {
    const [isConsultantVisible, setIsConsultantVisible] = useState(false);  // Control consultant dropdown visibility
    const [isManageAppointment, setIsManageAppointment] = useState(false);
    const [isPatientVisit, setIsPatientVisit] = useState(false);
    const [isLabVisible, setIsLabVisible] = useState(false);  // Control lab dropdown visibility
    const [isProfileSettings, setIsProfileSettings] = useState(false);  // Control lab dropdown visibility
    const [isConsultantprofileVisible, setIsConsultantprofileVisible] = useState(false);  // Control consultant dropdown visibility

    const [isConsultantAppointment, setIsConsultantAppointment] = useState(false);  // Control consultant dropdown visibility

    const [isConsultantPaymentHistory, setIsConsultantPaymentHistory] = useState(false);  // Control consultant dropdown visibility

  // Toggle Consultant div visibility
  const toggleConsultantVisibility = () => {
    setIsConsultantVisible(prevState => !prevState);  // Toggle visibility state
  };

  const toggleConsultantprofileVisible = () => {
    setIsConsultantprofileVisible(prevState => !prevState);  // Toggle visibility state
  };

  const toggleConsultantAppointment = () => {
    setIsConsultantAppointment(prevState => !prevState);  // Toggle visibility state
  };

  const toggleConsultantPaymentHistory = () => {
    setIsConsultantPaymentHistory(prevState => !prevState);  // Toggle visibility state
  };
  const toggleManageAppointment = () => {
    setIsManageAppointment(prevState => !prevState);  // Toggle visibility state
  };
  const togglePatientVisit = () => {
    setIsPatientVisit(prevState => !prevState);  // Toggle visibility state
  };
  const toggleLabVisibility = () => {
    setIsLabVisible(prevState => !prevState);  // Toggle visibility state
  };
  const toggleProfileSettings = () => {
    setIsProfileSettings(prevState => !prevState);  // Toggle visibility state
  };

  return (
    <div className="side-navbar-container">
      <div className="side-navbar">
        <a onClick={toggleManageAppointment} style={{ color: '#fff' }}>
            Manage Appointment
        </a>

            {/* Show the consultant options based on isConsultantVisible state */}
            {isManageAppointment && (
              <div className="options">
                <Link to="/doctorlogin/dailyappointments">View</Link>
                <Link to="/doctorlogin/view-Appointments">Future Appointments</Link>
                <Link to="/doctorlogin/dashboard">Reschedule</Link>
                <Link to="/doctorlogin/dashboard">Cancel</Link>
                <Link to="/doctorlogin/dashboard">Book</Link>
                
              </div>
            )}
        <a onClick={togglePatientVisit} style={{ color: '#fff' }}>
          Patient Visit
        </a>

          {/* Show the consultant options based on isConsultantVisible state */}
          {isPatientVisit && (
            <div className="options">
              <Link to="/doctorlogin/view&editpatient">View Patient</Link>
              <Link to="/doctorlogin/addprescription">Add Prescription</Link>
            </div>
          )}
          
          

          {/* Toggle Consultant dropdown */}
          <a onClick={toggleConsultantVisibility} style={{ color: '#fff' }}>
            Consultant
          </a>

          {/* Show the consultant options based on isConsultantVisible state */}
          {isConsultantVisible  && (
            <div className="options">
                  <a onClick={toggleConsultantprofileVisible} style={{ color: '#fff' }}>
                    Consultant Management
                  </a>

              {/* Show the consultant options based on isConsultantVisible state */}
              {isConsultantprofileVisible && (
                <div className="options">
                  <Link to="/doctorlogin/consultantlist">View</Link>
                  <Link to="/doctorlogin/AddConsultant">Add</Link>
                </div>
              )}
              <a onClick={toggleConsultantAppointment} style={{ color: '#fff' }}>
                Consultant Appointment
              </a> 

              {/* Show the consultant options based on isConsultantVisible state */}
              {isConsultantAppointment && (
                <div className="options">
                  <Link to="/doctorlogin/consultantBookAppointment">Book Appointment</Link>
                  <Link to="/doctorlogin/consultantAppointmentReschedule">Reschedule</Link>
                  <Link to="/doctorlogin/consultantAppointmentCancel">Cancel</Link>
                </div>
              )}
              <a onClick={toggleConsultantPaymentHistory} style={{ color: '#fff' }}>
                Consultant Payment
              </a>

              {/* Show the consultant options based on isConsultantVisible state */}
              {isConsultantPaymentHistory && (
                <div className="options">
                  <Link to="/doctorlogin/consultantpayment">Payment</Link>
                  <Link to="/doctorlogin/consultantpaymenthistory">Payment History</Link>
                </div>
              )}
            </div>
          )}
          <a onClick={toggleLabVisibility} style={{ color: '#fff' }}>
            Lab Management
          </a>
          {isLabVisible && (
            <div className="options">
                <Link to="/doctorlogin/viewLabReports">View Lab Reports</Link> 
                <Link to="/doctorlogin/patientlab">Add Lab Records</Link>
                <Link to="/doctorlogin/labUpload">Invoice Upload</Link>
                <Link to="/doctorlogin/labUploadHistory">Invoice History</Link>
            </div>
          )}
          <Link to="/doctorlogin/diary">Diary</Link>
          {/* <Link to="/doctorlogin/approval">Approval</Link> */}
          <a onClick={toggleProfileSettings} style={{ color: '#fff' }}>
            Settings
          </a>
          {isProfileSettings && (
            <div className="options">
                
                <Link to="/doctorlogin/changepassword">Change Password</Link>
                
            </div>
          )}
      </div>
      <Outlet />
    </div>
  );
};

export default SideNavbar;
