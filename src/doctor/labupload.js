import React, { useEffect, useState } from "react";
import { db, storage } from "../config/FirebaseConfig";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import "./labUpload.css";

function LabInvoiceUpload() {
    const [laboratoryName, setLaboratoryName] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [amountPaid, setAmountPaid] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const laboratoryOptions = ["Lab A", "Lab B", "Lab C", "Lab D", "Lab E"];

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            if (!id) return;

            try {
                const docRef = doc(db, "invoices", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLaboratoryName(data.laboratoryName);
                    setTotalAmount(data.totalAmount.toString());
                    setAmountPaid(data.amountPaid.toString());
                    setPreview(data.fileUrl);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Error fetching invoice details: ", error.message);
            }
        };

        fetchInvoiceDetails();
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(selectedFile && selectedFile.type.startsWith("image/") ? URL.createObjectURL(selectedFile) : null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!laboratoryName || !totalAmount || !amountPaid || (!file && !isEditing)) {
            alert("Please fill in all fields and upload a file.");
            return;
        }
    
        const dueAmount = (parseFloat(totalAmount) - parseFloat(amountPaid)).toFixed(2);
    
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            const formattedTime = currentDate.toLocaleTimeString();
    
            if (isEditing) {
                // Update existing invoice
                const invoiceRef = doc(db, "invoices", id);
                const updatedData = { 
                    laboratoryName, 
                    totalAmount: parseFloat(totalAmount), 
                    amountPaid: parseFloat(amountPaid), 
                    dueAmount, 
                    uploadDate: formattedDate,    // Update the upload date
                    uploadTime: formattedTime,    // Update the upload time
                };
    
                const docSnap = await getDoc(invoiceRef);
    
                if (docSnap.exists() && file) {
                    const oldFileUrl = docSnap.data().fileUrl;
                    const oldFileRef = ref(storage, `Invoices/${docSnap.data().fileName}`);
                    
                    // Delete old file if a new file is uploaded
                    await deleteObject(oldFileRef);
    
                    const fileExtension = file.name.split('.').pop();
                    const fileName = `${id}.${fileExtension}`;
                    const fileRef = ref(storage, `Invoices/${fileName}`);
                    await uploadBytes(fileRef, file);
                    updatedData.fileName = fileName;
                    updatedData.fileUrl = await getDownloadURL(fileRef);
                }
    
                await updateDoc(invoiceRef, updatedData);
                alert("Invoice updated successfully!");
            } else {
                // Add new invoice
                const LaboratoryId = Date.now();
                const fileExtension = file.name.split('.').pop();
                const fileName = `${id}.${fileExtension}`;
                const fileRef = ref(storage, `Invoices/${fileName}`);
                await uploadBytes(fileRef, file);
                const fileUrl = await getDownloadURL(fileRef);
    
                await addDoc(collection(db, "invoices"), {
                    LaboratoryId,
                    laboratoryName,
                    totalAmount: parseFloat(totalAmount),
                    amountPaid: parseFloat(amountPaid),
                    dueAmount,
                    fileName,
                    fileUrl,
                    uploadDate: formattedDate,    // Set the upload date
                    uploadTime: formattedTime,    // Set the upload time
                });
    
                alert("Invoice uploaded successfully!");
            }
    
            navigate("/doctorlogin/labuploadhistory");
        } catch (error) {
            console.error("Error saving data:", error.message);
            alert("Failed to save data. Error: " + error.message);
        }
    };  


    return (
        <div className="App-con">
            <form className="labupload-body-container" onSubmit={handleSubmit}>
                <h1>{isEditing ? "Edit Invoice" : "Upload Monthly Invoice"}</h1>
                <div>
                    <label>Laboratory Name</label>
                    <select
                        className="styled-select"
                        value={laboratoryName}
                        onChange={(e) => setLaboratoryName(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a laboratory</option>
                        {laboratoryOptions.map((lab) => (
                            <option key={lab} value={lab}>
                                {lab}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount Paid:</label>
                    <input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Upload File:</label>
                    <input
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                </div>
                {preview && (
                    <div>
                        <h3>Invoice Preview:</h3>
                        <img src={preview} alt="Preview" className="image" />
                        {/* {preview.startsWith("http") ? (
                            <a href={preview} target="_blank" rel="noopener noreferrer">
                                View Current File
                            </a>
                        ) : (
                            <img src={preview} alt="Preview" className="image" />
                        )} */}
                    </div>
                )}
                <button className="labUploadbutton" type="submit">{isEditing ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
}

export default LabInvoiceUpload;
