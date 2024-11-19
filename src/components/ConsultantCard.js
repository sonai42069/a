import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Define styled components for the card
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px 30px;
  max-width: 260px;
  text-align: center;
  transition: transform 0.3s;
  position: relative;
`;

const Photo = styled.img`
  width: 282px;
  height: 200px;
  border-radius: 0px;
  object-fit: cover;
 
  
`;

const Content = styled.div`
  padding: 15px;
`;

const Specialty = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

const Availability = styled.p`
  margin: 10px 0;
  color: #555;
`;

const Button = styled.button`
  background-color: #03c1c0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007F80;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

// Define styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
`;

const CloseButton = styled.button`
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #ff4040;
  }
`;

// ConsultantCard component with modal and delete button
const ConsultantCard = ({ photo, name, specialty, availability, bio, experience, contact, phone, deleteConsultant }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Card>
        <Photo src={photo} alt={`${name}'s photo`} />
        <Content>
          <h3>{name}</h3>
          <Specialty>Specialty: {specialty}</Specialty>
          <Availability>Availability: {availability}</Availability>
          <p>Phone: {phone}</p>

          <Button onClick={handleOpenModal}>View Profile</Button>
          <DeleteButton onClick={deleteConsultant}>Delete</DeleteButton>
        </Content>
      </Card>

      {/* Modal for displaying additional information */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h3>{name}</h3>
            <p><strong>Specialty:</strong> {specialty}</p>
            <p><strong>Availability:</strong> {availability}</p>
            <p><strong>Bio:</strong> {bio}</p>
            <p><strong>Experience:</strong> {experience} years</p>
            <p><strong>Contact:</strong> {contact}</p>
            <p><strong>Phone:</strong> {phone}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Define PropTypes for the component
ConsultantCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  contact: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  deleteConsultant: PropTypes.func.isRequired,
};

export default ConsultantCard;
