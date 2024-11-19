import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConsultantCard from './ConsultantCard';


// Define styled components for the list
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-width: 1000px;
  
  margin: auto;
`;


const Input = styled.input`
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  font-size: 16px;

  &:focus {
    border-color: #03c1c0;
    outline: none;
  }
`;




const SeeMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  background-color: #03c1c0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007F80;
  }
`;

const ConsultantList = () => {
  const [consultantData, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [openModalId, setOpenModalId] = useState(null);

  const initialConsultantData = [
    
{
  id: 1,
  name: 'Dr. John Doe',
  specialty: 'Orthodontics',
  availability: 'Mon-Fri 9 AM - 5 PM',
  bio: 'Dr. John Doe is a highly experienced orthodontist with over 10 years in the field.',
  experience: 10,
  contact: 'john.doe@example.com',
  phone: '123-456-7890',
  photo: 'john.jpg',
},
{
  id: 2,
  name: 'Dr. Jane Smith',
  specialty: 'Pediatric Dentistry',
  availability: 'Mon-Wed 10 AM - 6 PM',
  bio: 'Dr. Jane Smith specializes in pediatric dentistry and loves working with kids.',
  experience: 8,
  contact: 'jane.smith@example.com',
  phone: '098-765-4321',
  photo: 'jane.jpg',
},
{
  id: 3,
  name: 'Dr. Emily Davis',
  specialty: 'Periodontics',
  availability: 'Tue-Thu 8 AM - 3 PM',
  bio: 'Dr. Emily Davis is an expert in periodontics and has been practicing for 7 years.',
  experience: 7,
  contact: 'emily.davis@example.com',
  phone: '555-123-4567',
  photo: 'emily.jpg',
},
{
  id: 4,
  name: 'Dr. Robert Brown',
  specialty: 'Oral Surgery',
  availability: 'Mon-Fri 8 AM - 4 PM',
  bio: 'Dr. Robert Brown has extensive experience in oral surgery.',
  experience: 12,
  contact: 'robert.brown@example.com',
  phone: '555-987-6543',
  photo: 'robert.png',
},
{
  id: 5,
  name: 'Dr. Sarah Wilson',
  specialty: 'Cosmetic Dentistry',
  availability: 'Tue-Sat 10 AM - 6 PM',
  bio: 'Dr. Sarah Wilson is a leading cosmetic dentist.',
  experience: 9,
  contact: 'sarah.wilson@example.com',
  phone: '555-678-1234',
  photo: 'sarah.png',
},
{
  id: 6,
  name: 'Dr. Michael Johnson',
  specialty: 'Endodontics',
  availability: 'Mon-Thu 9 AM - 5 PM',
  bio: 'Dr. Michael Johnson specializes in root canal treatments.',
  experience: 11,
  contact: 'michael.johnson@example.com',
  phone: '555-234-5678',
  photo: 'micheal.png',
},
{
  id: 7,
  name: 'Dr. Laura Garcia',
  specialty: 'Prosthodontics',
  availability: 'Mon-Fri 9 AM - 4 PM',
  bio: 'Dr. Laura Garcia is an expert in prosthodontics.',
  experience: 8,
  contact: 'laura.garcia@example.com',
  phone: '555-321-9876',
  photo: 'laura.png',
},
{
  id: 8,
  name: 'Dr. James Lee',
  specialty: 'General Dentistry',
  availability: 'Mon-Sun 9 AM - 6 PM',
  bio: 'Dr. James Lee provides general dental care for all ages.',
  experience: 6,
  contact: 'james.lee@example.com',
  phone: '555-765-4321',
  photo: 'james.jpg',
},
{
  id: 9,
  name: 'Dr. Karen Martinez',
  specialty: 'Oral Medicine',
  availability: 'Tue-Fri 10 AM - 5 PM',
  bio: 'Dr. Karen Martinez focuses on oral medicine and treatment.',
  experience: 10,
  contact: 'karen.martinez@example.com',
  phone: '555-456-7890',
  photo: 'karen.jpg',
},
{
  id: 10,
  name: 'Dr. Daniel Anderson',
  specialty: 'Geriatric Dentistry',
  availability: 'Mon-Fri 8 AM - 4 PM',
  bio: 'Dr. Daniel Anderson specializes in geriatric dental care.',
  experience: 15,
  contact: 'daniel.anderson@example.com',
  phone: '555-123-7890',
  photo: 'daniel.jpg',
},
{
  id: 11,
  name: 'Dr. Patricia Thompson',
  specialty: 'Periodontics',
  availability: 'Mon-Wed 9 AM - 5 PM',
  bio: 'Dr. Patricia Thompson has over 20 years of experience in periodontics.',
  experience: 20,
  contact: 'patricia.thompson@example.com',
  phone: '555-654-3210',
  photo: 'patricia.png',
},
{
  id: 12,
  name: 'Dr. Matthew Young',
  specialty: 'Orthodontics',
  availability: 'Tue-Thu 10 AM - 4 PM',
  bio: 'Dr. Matthew Young specializes in braces and aligners.',
  experience: 5,
  contact: 'matthew.young@example.com',
  phone: '555-321-1234',
  photo: 'matthew.jpg',
},
{
  id: 13,
  name: 'Dr. Barbara White',
  specialty: 'Pediatric Dentistry',
  availability: 'Mon-Fri 9 AM - 6 PM',
  bio: 'Dr. Barbara White loves treating children and making them smile.',
  experience: 9,
  contact: 'barbara.white@example.com',
  phone: '555-123-4567',
  photo: 'barbara.png',
},
{
  id: 14,
  name: 'Dr. Charles Harris',
  specialty: 'Oral Surgery',
  availability: 'Mon-Sat 8 AM - 4 PM',
  bio: 'Dr. Charles Harris specializes in complex oral surgeries.',
  experience: 14,
  contact: 'charles.harris@example.com',
  phone: '555-987-6543',
  photo: 'charles.jpg',
},
{
  id: 15,
  name: 'Dr. Nancy Walker',
  specialty: 'Cosmetic Dentistry',
  availability: 'Tue-Sun 10 AM - 6 PM',
  bio: 'Dr. Nancy Walker is renowned for her cosmetic procedures.',
  experience: 11,
  contact: 'nancy.walker@example.com',
  phone: '555-678-1234',
  photo: 'nancy.jpg',
},
{
  id: 16,
  name: 'Dr. David Robinson',
  specialty: 'Endodontics',
  availability: 'Mon-Thu 9 AM - 5 PM',
  bio: 'Dr. David Robinson specializes in treating root canal issues.',
  experience: 8,
  contact: 'david.robinson@example.com',
  phone: '555-234-5678',
  photo: 'david.png',
},
{
  id: 17,
  name: 'Dr. Susan Martinez',
  specialty: 'Prosthodontics',
  availability: 'Mon-Fri 9 AM - 3 PM',
  bio: 'Dr. Susan Martinez focuses on creating and fitting dental prostheses.',
  experience: 9,
  contact: 'susan.martinez@example.com',
  phone: '555-321-9876',
  photo: 'susan.png',
},
{
  id: 18,
  name: 'Dr. Joshua Clark',
  specialty: 'General Dentistry',
  availability: 'Tue-Sun 9 AM - 5 PM',
  bio: 'Dr. Joshua Clark provides comprehensive dental care.',
  experience: 7,
  contact: 'joshua.clark@example.com',
  phone: '555-765-4321',
  photo: 'joshua.jpg',
},
{
  id: 19,
  name: 'Dr. Linda Rodriguez',
  specialty: 'Oral Medicine',
  availability: 'Mon-Fri 10 AM - 5 PM',
  bio: 'Dr. Linda Rodriguez specializes in oral disease management.',
  experience: 12,
  contact: 'linda.rodriguez@example.com',
  phone: '555-456-7890',
  photo: 'linda.jpg',
},
{
  id: 20,
  name: 'Dr. Joseph Taylor',
  specialty: 'Geriatric Dentistry',
  availability: 'Mon-Fri 8 AM - 4 PM',
  bio: 'Dr. Joseph Taylor specializes in dental care for seniors.',
  experience: 13,
  contact: 'joseph.taylor@example.com',
  phone: '555-321-6543',
  photo: 'joseph.png',
},
  ];

  // Initial data load
  useEffect(() => {
    setConsultants(initialConsultantData);
    setFilteredConsultants(initialConsultantData);
  }, []);


  

  // Function to handle See More button
  const handleSeeMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 5, filteredConsultants.length));
  };

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const deleteConsultant = (id) => {
    setConsultants((prevConsultants) => prevConsultants.filter(consultant => consultant.id !== id));
    setFilteredConsultants((prevFiltered) => prevFiltered.filter(consultant => consultant.id !== id));
  };

  return (
    <div>
      {/* Consultant Cards */}
      <ListContainer>
        {filteredConsultants.slice(0, displayCount).map((consultant) => (
          <ConsultantCard
            key={consultant.id}
            {...consultant}
            isOpen={openModalId === consultant.id}
            onOpen={() => handleOpenModal(consultant.id)}
            onClose={handleCloseModal}
            deleteConsultant={() => deleteConsultant(consultant.id)} // Pass delete function
          />
        ))}
      </ListContainer>

      {displayCount < filteredConsultants.length && (
        <SeeMoreButton onClick={handleSeeMore}>See More</SeeMoreButton>
      )}
    </div>
  );
};

export default ConsultantList;
export const consultants = [
  { id: 1, name: 'Dr.John Doe' },
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




