const patientData = [
  {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      visits: [
          {
              date: "2024-01-15",
              doctor: "Dr. Nithya",
              laboratory: ["Blood Test", "X-Ray"],
              medicines: ["Aspirin", "Paracetamol"],
              description: "Mild chest pain, prescribed medication for two weeks.",
              consultantFee: 500,
              labFee: 300,
              medicineFee: 150,
          },
      ],
  },
  {
      id: 2,
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      visits: [
          {
              date: "2024-02-20",
              doctor: "Dr. Nithya",
              laboratory: ["MRI", "CT Scan"],
              medicines: ["Ibuprofen", "Antibiotics"],
              description: "Severe headache, prescribed medication for one week.",
              consultantFee: 600,
              labFee: 1000,
              medicineFee: 200,
          },
      ],
  },
  {
      id: 3,
      name: "Michael Johnson",
      age: 60,
      gender: "Male",
      visits: [
          {
              date: "2024-03-10",
              doctor: "Dr. Nithya",
              laboratory: ["ECG", "Urine Test"],
              medicines: ["Metformin", "Blood Pressure Medication"],
              description: "Diabetic check-up, BP regulation.",
              consultantFee: 400,
              labFee: 200,
              medicineFee: 300,
          },
      ],
  },
  {
      id: 4,
      name: "Emily Davis",
      age: 29,
      gender: "Female",
      visits: [
          {
              date: "2024-04-12",
              doctor: "Dr. Nithya",
              laboratory: ["Blood Test", "Ultrasound"],
              medicines: ["Vitamin D", "Iron Supplement"],
              description: "Routine check-up, low iron levels detected.",
              consultantFee: 550,
              labFee: 350,
              medicineFee: 100,
          },
      ],
  },
  {
      id: 5,
      name: "David Brown",
      age: 50,
      gender: "Male",
      visits: [
          {
              date: "2024-05-05",
              doctor: "Dr. Nithya",
              laboratory: ["X-Ray", "CBC"],
              medicines: ["Painkillers", "Antibiotics"],
              description: "Fractured wrist, prescribed rest and antibiotics.",
              consultantFee: 700,
              labFee: 400,
              medicineFee: 250,
          },
      ],
  },
];

export default patientData;
