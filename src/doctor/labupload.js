import React, { useEffect, useState } from "react";
import { db, storage } from "../config/FirebaseConfig" // Import Firestore and Storage instances
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for getting the ID
import "./labUpload.css";

function LabInvoiceUpload() {
    const [LaboratoryName, setLaboratoryName] = useState(""); // Lab Name
    const [TotalAmount, setTotalAmount] = useState(""); // Total Amount
    const [AmountPaid, setAmountPaid] = useState(""); // Amount Paid
    const [DueAmount, setDueAmount] = useState(""); // Due Amount
    const [file, setFile] = useState(null); // Selected file
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // Image preview (if applicable)
    const [isEditing, setIsEditing] = useState(false); // Flag to check if editing
    const { id } = useParams(); // Get the invoice ID from the URL
    const navigate = useNavigate(); // Hook for navigation

    // List of laboratory names (replace with dynamic fetching if necessary)
    const laboratoryOptions = [
        "Lab A",
        "Lab B",
        "Lab C",
        "Lab D",
        "Lab E",
    ];

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            if (id) {
                try {
                    const docRef = doc(db, "invoices", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setLaboratoryName(data.LaboratoryName);
                        setTotalAmount(data.TotalAmount);
                        setAmountPaid(data.AmountPaid);
                        setDueAmount(data.DueAmount);
                        setPreview(data.fileUrl); // Use the file URL for preview
                        setIsEditing(true);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching invoice details: ", error.message);
                }
            }
        };

        fetchInvoiceDetails();
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(selectedFile.type.startsWith("image/") ? URL.createObjectURL(selectedFile) : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate DueAmount
        const dueAmount = parseFloat(TotalAmount) - parseFloat(AmountPaid);
        setDueAmount(dueAmount.toFixed(2)); // Update state with calculated due amount

        try {
            if (isEditing) {
                // Update existing invoice
                const invoiceRef = doc(db, "invoices", id); // Reference to the document to update
                const updatedData = {
                    LaboratoryName,
                    TotalAmount: parseFloat(TotalAmount),
                    AmountPaid: parseFloat(AmountPaid),
                    DueAmount: dueAmount,
                };

                // If a new file is uploaded, handle file upload
                if (file) {
                    const fileExtension = file.name.split('.').pop(); // Extract the file extension
                    const fileName = `${id}.${fileExtension}`; // Create the file name based on the ID
                    const fileRef = ref(storage, `Invoices/${fileName}`); // Use the new file name

                    // Upload file to Firebase Storage
                    await uploadBytes(fileRef, file);
                    const fileUrl = await getDownloadURL(fileRef); // Get file URL

                    updatedData.fileName = fileName; // Update the file name
                    updatedData.fileUrl = fileUrl; // Update the file URL
                }

                await updateDoc(invoiceRef, updatedData); // Update the document in Firestore
                alert("Invoice updated successfully!");
            } else {
                // Auto-generate LaboratoryId for new invoice
                const LaboratoryId = Date.now(); // Use current timestamp as a unique ID

                // Get the file extension
                const fileExtension = file.name.split('.').pop(); // Extract the file extension
                const fileName = `${LaboratoryId}.${fileExtension}`; // Create the new file name
                const fileRef = ref(storage, `Invoices/${fileName}`); // Use the new file name

                // Upload file to Firebase Storage
                await uploadBytes(fileRef, file);
                const fileUrl = await getDownloadURL(fileRef); // Get file URL

                // Get current date and time
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString(); // Format date (e.g., "10/19/2024")
                const formattedTime = currentDate.toLocaleTimeString(); // Format time (e.g., "3:30:00 PM")

                // Save data to Firestore
                await addDoc(collection(db, "invoices"), {
                    LaboratoryId,
                    LaboratoryName,
                    TotalAmount: parseFloat(TotalAmount), // Ensure amounts are stored as numbers
                    AmountPaid: parseFloat(AmountPaid),
                    DueAmount: dueAmount,
                    fileName, // Store the file name instead of the full URL
                    fileUrl, // Optionally store the full URL for direct access
                    uploadDate: formattedDate, // Save current date
                    uploadTime: formattedTime, // Save current time
                });

                alert("Invoice data saved successfully!");
            }

            // Reset form
            setLaboratoryName("");
            setTotalAmount("");
            setAmountPaid("");
            setDueAmount("");
            setFile(null);
            setImage(null);
            setPreview(null);
            //navigate("/labuploadhistory"); // Redirect to the upload history page after submit
        } catch (error) {
            console.error("Error saving data: ", error);
            alert("Failed to save data. Error: " + error.message);
        }
    };

    return (
        <div className="App-con">
            <form className="labupload-body-container" onSubmit={handleSubmit}>
                <h1>{isEditing ? "Edit Invoice" : "Upload  Monthly Invoice "}</h1>
                <div>
                    <label>Laboratory Name</label><br />
                    <select
                        className="styled-select"
                        value={LaboratoryName}
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
                    <label>Total Amount:</label><br />
                    <input
                        type="number"
                        value={TotalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount Paid:</label><br />
                    <input
                        type="number"
                        value={AmountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Upload File:</label>
                    <input 
                        type="file" 
                        accept="image/*,.pdf,.doc,.docx" // Allow image, PDF, and DOC files
                        onChange={handleFileChange} 
                    />
                </div>
                {/* Optional: Show image preview if an image is uploaded */}
                {preview && (
                    <div>
                        <h3>Image Preview:</h3>
                        <img src={preview} alt="Preview" className="image" />
                    </div>
                )}
                <button className="labUploadbutton" type="submit">{isEditing ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
}

export default LabInvoiceUpload;
