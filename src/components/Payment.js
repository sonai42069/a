import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const consultants = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Dr. Jane Smith' },
  { id: 3, name: 'Dr. Emily Davis' },
];

const Payment = () => {
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedConsultant && amount && paymentDate) {
      const newPayment = { consultant: selectedConsultant, amount, paymentDate };
      setPaymentHistory([...paymentHistory, newPayment]);
      setPaymentSuccess(true);

      setSelectedConsultant('');
      setAmount('');
      setPaymentDate('');
    } else {
      setPaymentSuccess(false);
    }
  };

  const handleViewHistory = () => {
    navigate('/payment-history', { state: { paymentHistory } });
  };

  // Get today's date in YYYY-MM-DD format to restrict future dates
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  const paymentContainerStyle = {
    maxWidth: '1000px',
    minWidth: '600px',
    margin: '50px auto',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '22px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const subtopicStyle = {
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  };

  const selectStyle = {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#03C0C1',
    border: 'none',
    borderRadius: '19px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const messageStyle = (success) => ({
    fontSize: '14px',
    color: success ? 'green' : 'red',
    marginTop: '10px',
  });

  return (
    <div style={paymentContainerStyle}>
      <h2 style={titleStyle}>Consultant Payment</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={subtopicStyle}>Select Consultant</label>
        <select
          value={selectedConsultant}
          onChange={(e) => setSelectedConsultant(e.target.value)}
          required
          style={selectStyle}
        >
          <option value="">-- Choose Consultant --</option>
          {consultants.map((consultant) => (
            <option key={consultant.id} value={consultant.name}>
              {consultant.name}
            </option>
          ))}
        </select>

        <label style={subtopicStyle}>Payment Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter payment amount"
          required
          style={inputStyle}
        />

        <label style={subtopicStyle}>Payment Date</label>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
          style={inputStyle}
          max={todayDate} // Restrict future dates by setting the max attribute
        />

        <button type="submit" style={buttonStyle}>Save</button>
      </form>

      {paymentSuccess !== null && (
        <p style={messageStyle(paymentSuccess)}>
          {paymentSuccess ? 'Payment successful!' : 'Payment failed. Please check your details.'}
        </p>
      )}

     
    </div>
  );
};

export default Payment;
