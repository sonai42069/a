import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for Container, Title, Table, etc.
const Container = styled.div`
  max-width: 1200px;
  min-width: 900px;
  margin: 50px auto;
  padding: 15px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 22px;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #03C0C1;
  color: white;
  padding: 10px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  text-align: left;
  border: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 10px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  text-align: left;
`;

const NoHistoryMessage = styled.td`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #999;
`;

const PaymentButton = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #03C0C1;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #029d9e;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FilterDropdown = styled.select`
  padding: 8px;
  font-size: 16px;
  width: 30%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const FilterInput = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 30%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PaymentHistory = ({ consultants = [] }) => {
  const location = useLocation();
  const { paymentHistory = [] } = location.state || {};

  const [filters, setFilters] = useState({
    name: '',
    date: '',
    month: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchName = filters.name ? payment.consultant === filters.name : true;
    const matchDate = filters.date ? payment.paymentDate === filters.date : true;
    const matchMonth = filters.month
      ? payment.paymentDate.startsWith(filters.month)
      : true;

    return matchName && matchDate && matchMonth;
  });

  return (
    <Container>
      <Title>Payment History</Title>

      <FilterContainer>
        <FilterDropdown
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Consultant Name</option>
          {consultants.map((consultantData) => (
            <option key={consultantData.id} value={consultantData.name}>
              {consultantData.name}
            </option>
          ))}
        </FilterDropdown>
        <FilterInput
          type="date"
          name="date"
          placeholder="Filter by Date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="month"
          name="month"
          placeholder="Filter by Month"
          value={filters.month}
          onChange={handleFilterChange}
        />
      </FilterContainer>

      <Table>
        <thead>
          <tr>
            <TableHeader>Consultant Name</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <TableRow key={index}>
                <TableData>{payment.consultant}</TableData>
                <TableData>{payment.amount}</TableData>
                <TableData>{payment.paymentDate}</TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <NoHistoryMessage colSpan="3">No payment history available</NoHistoryMessage>
            </TableRow>
          )}
        </tbody>
      </Table>

      <PaymentButton to="/doctorlogin/consultantpayment">Go to Payment</PaymentButton>
    </Container>
  );
};

export default PaymentHistory;
