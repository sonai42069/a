import React, { useState } from 'react';
import styled from 'styled-components';
import { db, storage } from '../config/FirebaseConfig'; // Import Firebase configurations

// Styled Components
const Form = styled.form`
  max-width: 600px;
  min-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  margin-top: 45px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

const ImgPreview = styled.img`
  margin-top: 10px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;



const AddConsultant = ({ onAddConsultant }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoURL = '';
      
      // Upload photo to Firebase Storage
      if (photo) {
        const storageRef = storage.ref();
        const photoRef = storageRef.child(`consultantPhotos/${photo.name}`);
        await photoRef.put(photo);
        photoURL = await photoRef.getDownloadURL();
      }

      // Save consultant data to Firestore
      await db.collection('consultants').add({
        name,
        specialty,
        contact,
        phone,
        availability,
        bio,
        experience,
        photoURL,
      });

      // Reset form
      setName('');
      setSpecialty('');
      setContact('');
      setPhone('');
      setAvailability('');
      setBio('');
      setExperience('');
      setPhoto(null);
      setPreviewPhoto('');
      
      alert("Consultant added successfully!");

    } catch (error) {
      console.error("Error adding consultant: ", error);
      alert("Failed to add consultant.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>Add Consultant</Heading>

      <FormGroup>
        <Label>Photo:</Label>
        <Input 
          type="file" 
          onChange={handlePhotoChange} 
          accept="image/*" 
          required 
        />
        {previewPhoto && (
          <ImgPreview src={previewPhoto} alt="Consultant Preview" />
        )}
      </FormGroup>

      <FormGroup>
        <Label>Name:</Label>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Speciality:</Label>
        <Input 
          type="text" 
          value={specialty} 
          onChange={(e) => setSpecialty(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Email:</Label>
        <Input 
          type="email" 
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Phone Number:</Label>
        <Input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Availability:</Label>
        <Input 
          type="text" 
          value={availability} 
          onChange={(e) => setAvailability(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Bio:</Label>
        <Textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          required 
        />
      </FormGroup>

      <FormGroup>
        <Label>Experience (years):</Label>
        <Input 
          type="number" 
          value={experience} 
          onChange={(e) => setExperience(e.target.value)} 
          required 
        />
      </FormGroup>

      <Button type="submit">Add Consultant</Button>
    </Form>
  );
};

export default AddConsultant;