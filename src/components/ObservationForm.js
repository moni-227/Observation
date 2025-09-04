// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "", // new field for storing base64 image
//   });

//   const [cameraOn, setCameraOn] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: "",
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//       });
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "user" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       // Stop camera
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   // Draw video frames to canvas
//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   // Capture current frame as image
//   const handleCaptureImage = () => {
//     if (!canvasRef.current) return;
//     const dataURL = canvasRef.current.toDataURL("image/png");
//     setForm({ ...form, capturedImage: dataURL });
//     alert("📸 Image captured!");
//   };

//   const styles = {
//     container: {
//       margin: "0 auto",
//       padding: "40px 20px",
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "#f4f6f9",
//     },
//     card: {
//       borderRadius: "10px",
//       overflow: "hidden",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//       background: "#fff",
//       animation: "fadeInUp 1s ease",
//       width: "100%",
//       maxWidth: "1300px",
//     },
//     header: {
//       background: "linear-gradient(90deg,#55a669ff, #598892ff)",
//       color: "#fff",
//       padding: "10px",
//       fontSize: "24px",
//       fontWeight: "600",
//       display: "flex",
//     },
//     formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//     formGroup: { marginBottom: "20px", position: "relative" },
//     input: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//       outline: "none",
//       transition: "0.3s",
//     },
//     textarea: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//       outline: "none",
//       transition: "0.3s",
//       minHeight: "80px",
//     },
//     label: {
//       fontSize: "20px",
//       fontWeight: "600",
//       marginBottom: "8px",
//       display: "block",
//       background: "linear-gradient(90deg, #37427bff, #00d4ff)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       animation: "fadeInLeft 1s",
//       letterSpacing: "0.5px",
//     },
//     button: {
//       background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)",
//       border: "none",
//       padding: "12px 25px",
//       fontSize: "14px",
//       fontWeight: "600",
//       borderRadius: "10px",
//       cursor: "pointer",
//       color: "#fff",
//       transition: "0.3s",
//       boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
//       marginRight: "10px",
//     },
//     canvas: {
//       marginTop: "20px",
//       width: "100%",
//       maxHeight: "300px",
//       borderRadius: "10px",
//       border: "2px solid #5b708b",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "25px" }}>
//           <div style={styles.formGrid}>
//             {[
//               { label: "Date", type: "date", name: "date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter Observer Name" },
//               { label: "Department", type: "text", name: "department", placeholder: "Enter Department" },
//               { label: "Designation", type: "text", name: "designation", placeholder: "Enter Designation" },
//               { label: "Location", type: "text", name: "location", placeholder: "Enter Location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   required
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//               </div>
//             ))}
//           </div>

//           {[
//             { label: "Observation Details", name: "details", placeholder: "Enter Observation Details" },
//             { label: "Immediate Action", name: "immediateAction", placeholder: "Enter Immediate Action" },
//             { label: "Root Cause Analysis", name: "rootCauseAnalysis", placeholder: "Enter Root Cause Analysis" },
//             { label: "Preventive Measures", name: "preventiveMeasures", placeholder: "Enter Preventive Measures" },
//             { label: "Recommendations", name: "recommendations", placeholder: "Enter Recommendations" },
//           ].map((field, index) => (
//             <div style={styles.formGroup} key={index}>
//               <label style={styles.label}>{field.label}</label>
//               <textarea
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 required
//                 style={styles.textarea}
//                 placeholder={field.placeholder}
//               />
//             </div>
//           ))}

//           <div className="mb-3">
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//                <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : "Open Front Camera"}
//             </button>
//             {cameraOn && (
//               <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i>Capture Image
//               </button>
//             )}
//           </div>

//           {cameraOn && (
//             <canvas
//               ref={canvasRef}
//               width={320}
//               height={240}
//               style={{ ...styles.canvas, width: "350px", maxHeight: "240px" }}
//             />
//           )}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img
//                 src={form.capturedImage}
//                 alt="Captured"
//                 style={{ display: "block", width: "200px", marginTop: "10px", borderRadius: "10px", border: "2px solid #5b708b" }}
//               />
//             </div>
//           )}

//           <div className="text-end mt-4">
//             <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
//                 <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>

//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "",
//   });

//   const [cameraOn, setCameraOn] = useState(false);
//   const [useFrontCamera, setUseFrontCamera] = useState(true); // 👈 new state

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: "",
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//       });
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   // Open / Close Camera
//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   // Switch between front/back
//   const handleSwitchCamera = async () => {
//     setUseFrontCamera((prev) => !prev);

//     if (cameraOn) {
//       // Stop current stream
//       streamRef.current?.getTracks().forEach((track) => track.stop());

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: !useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         alert("⚠️ Failed to switch camera: " + err.message);
//       }
//     }
//   };

//   // Draw video frames to canvas
//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   // Capture current frame as image
//   const handleCaptureImage = () => {
//     if (!canvasRef.current) return;
//     const dataURL = canvasRef.current.toDataURL("image/png");
//     setForm({ ...form, capturedImage: dataURL });
//     alert("📸 Image captured!");
//   };

//   const styles = {
//     container: {
//       margin: "0 auto",
//       padding: "40px 20px",
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "#f4f6f9",
//     },
//     card: {
//       borderRadius: "10px",
//       overflow: "hidden",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//       background: "#fff",
//       animation: "fadeInUp 1s ease",
//       width: "100%",
//       maxWidth: "1300px",
//     },
//     header: {
//       background: "linear-gradient(90deg,#55a669ff, #598892ff)",
//       color: "#fff",
//       padding: "10px",
//       fontSize: "24px",
//       fontWeight: "600",
//       display: "flex",
//     },
//     formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//     formGroup: { marginBottom: "20px", position: "relative" },
//     input: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//       outline: "none",
//       transition: "0.3s",
//     },
//     textarea: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//       outline: "none",
//       transition: "0.3s",
//       minHeight: "80px",
//     },
//     label: {
//       fontSize: "20px",
//       fontWeight: "600",
//       marginBottom: "8px",
//       display: "block",
//       background: "linear-gradient(90deg, #37427bff, #00d4ff)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       animation: "fadeInLeft 1s",
//       letterSpacing: "0.5px",
//     },
//     button: {
//       background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)",
//       border: "none",
//       padding: "12px 25px",
//       fontSize: "14px",
//       fontWeight: "600",
//       borderRadius: "10px",
//       cursor: "pointer",
//       color: "#fff",
//       transition: "0.3s",
//       boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
//       marginRight: "10px",
//     },
//     canvas: {
//       marginTop: "20px",
//       width: "100%",
//       maxHeight: "300px",
//       borderRadius: "10px",
//       border: "2px solid #5b708b",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "25px" }}>
//           <div style={styles.formGrid}>
//             {[
//               { label: "Date", type: "date", name: "date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter Observer Name" },
//               { label: "Department", type: "text", name: "department", placeholder: "Enter Department" },
//               { label: "Designation", type: "text", name: "designation", placeholder: "Enter Designation" },
//               { label: "Location", type: "text", name: "location", placeholder: "Enter Location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   required
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//               </div>
//             ))}
//           </div>

//           {[
//             { label: "Observation Details", name: "details", placeholder: "Enter Observation Details" },
//             { label: "Immediate Action", name: "immediateAction", placeholder: "Enter Immediate Action" },
//             { label: "Root Cause Analysis", name: "rootCauseAnalysis", placeholder: "Enter Root Cause Analysis" },
//             { label: "Preventive Measures", name: "preventiveMeasures", placeholder: "Enter Preventive Measures" },
//             { label: "Recommendations", name: "recommendations", placeholder: "Enter Recommendations" },
//           ].map((field, index) => (
//             <div style={styles.formGroup} key={index}>
//               <label style={styles.label}>{field.label}</label>
//               <textarea
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 required
//                 style={styles.textarea}
//                 placeholder={field.placeholder}
//               />
//             </div>
//           ))}

//           <div className="mb-3">
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//               <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
//             </button>

//             {cameraOn && (
//               <>
//                 <button type="button" onClick={handleSwitchCamera} style={styles.button}>
//                   <i className="fa fa-refresh me-2"></i>
//                   Switch to {useFrontCamera ? "Back" : "Front"} Camera
//                 </button>
//                 <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i>Capture Image
//                 </button>
//               </>
//             )}
//           </div>

//           {cameraOn && (
//             <canvas
//               ref={canvasRef}
//               width={320}
//               height={240}
//               style={{ ...styles.canvas, width: "350px", maxHeight: "240px" }}
//             />
//           )}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img
//                 src={form.capturedImage}
//                 alt="Captured"
//                 style={{ display: "block", width: "200px", marginTop: "10px", borderRadius: "10px", border: "2px solid #5b708b" }}
//               />
//             </div>
//           )}

//           <div className="text-end mt-4">
//             <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
//               <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>

//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }



// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [cameraOn, setCameraOn] = useState(false);
//   const [useFrontCamera, setUseFrontCamera] = useState(true);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.date) newErrors.date = "Date is required";
//     if (!form.observerName.trim()) newErrors.observerName = "Observer name is required";
//     if (!form.department.trim()) newErrors.department = "Department is required";
//     if (!form.designation.trim()) newErrors.designation = "Designation is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.details.trim()) newErrors.details = "Observation details are required";
//     if (!form.immediateAction.trim()) newErrors.immediateAction = "Immediate action is required";
//     if (!form.rootCauseAnalysis.trim()) newErrors.rootCauseAnalysis = "Root cause analysis is required";
//     if (!form.preventiveMeasures.trim()) newErrors.preventiveMeasures = "Preventive measures are required";
//     if (!form.recommendations.trim()) newErrors.recommendations = "Recommendations are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert("⚠️ Please fix validation errors before submitting.");
//       return;
//     }
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: "",
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//       });
//       setErrors({});
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   const handleSwitchCamera = async () => {
//     setUseFrontCamera((prev) => !prev);
//     if (cameraOn) {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: !useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         alert("⚠️ Failed to switch camera: " + err.message);
//       }
//     }
//   };

//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   // const handleCaptureImage = () => {
//   //   if (!canvasRef.current) return;
//   //   const dataURL = canvasRef.current.toDataURL("image/png");
//   //   setForm({ ...form, capturedImage: dataURL });
//   //   alert("📸 Image captured!");
//   // };
// // Capture current frame as image + location
// const handleCaptureImage = () => {
//   if (!canvasRef.current) return;
//   const dataURL = canvasRef.current.toDataURL("image/png");

//   // Get geolocation
//   navigator.geolocation.getCurrentPosition(
//     (pos) => {
//       const { latitude, longitude } = pos.coords;
//       setForm({
//         ...form,
//         capturedImage: dataURL,
//         latitude,
//         longitude,
//       });
//       alert("📸 Image & Location captured!");
//     },
//     (err) => {
//       alert("⚠️ Failed to get location: " + err.message);
//       setForm({ ...form, capturedImage: dataURL });
//     }
//   );
// };

//   const styles = {
//     container: { margin: "0 auto", padding: "40px 20px", background: "#f4f6f9" },
//     card: {
//       borderRadius: "10px",
//       overflow: "hidden",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//       background: "#fff",
//       animation: "fadeInUp 1s ease",
//       maxWidth: "1300px",
//       margin: "0 auto",
//     },
//     header: {
//       background: "linear-gradient(90deg,#55a669ff, #598892ff)",
//       color: "#fff",
//       padding: "10px",
//       fontSize: "24px",
//       fontWeight: "600",
//     },
//     formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
//     formGroup: { marginBottom: "20px" },
//     input: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//     },
//     textarea: {
//       width: "100%",
//       padding: "12px 15px",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       fontSize: "15px",
//       minHeight: "80px",
//     },
//     label: { fontSize: "18px", fontWeight: "600", marginBottom: "8px", display: "block" },
//     errorText: { color: "red", fontSize: "14px", marginTop: "5px" },
//     button: {
//       background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)",
//       border: "none",
//       padding: "12px 25px",
//       fontSize: "14px",
//       fontWeight: "600",
//       borderRadius: "10px",
//       cursor: "pointer",
//       color: "#fff",
//       marginRight: "10px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "25px" }}>
//           <div style={styles.formGrid}>
//             {[
//               { label: "Date", type: "date", name: "date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter Observer Name" },
//                { label: "Department", type: "text", name: "department", placeholder: "Enter Department" },
//                { label: "Designation", type: "text", name: "designation", placeholder: "Enter Designation" },
//                { label: "Location", type: "text", name: "location", placeholder: "Enter Location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//                 {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//               </div>
//             ))}
//           </div>

//           {[
//             { label: "Observation Details", name: "details", placeholder: "Enter Observation Details" },
//             { label: "Immediate Action", name: "immediateAction", placeholder: "Enter Immediate Action" },
//             { label: "Root Cause Analysis", name: "rootCauseAnalysis", placeholder: "Enter Root Cause Analysis" },
//             { label: "Preventive Measures", name: "preventiveMeasures", placeholder: "Enter Preventive Measures" },
//             { label: "Recommendations", name: "recommendations", placeholder: "Enter Recommendations" },
//           ].map((field, index) => (
//             <div style={styles.formGroup} key={index}>
//               <label style={styles.label}>{field.label}</label>
//               <textarea
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 style={styles.textarea}
//                 placeholder={field.placeholder}
//               />
//               {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//             </div>
//           ))}

//           {/* Camera Controls */}
//           <div className="mb-3">
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//               <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
//             </button>

//             {cameraOn && (
//               <>
//                 <button type="button" onClick={handleSwitchCamera} style={styles.button}>
//                   <i className="fa fa-refresh me-2"></i>
//                   Switch to {useFrontCamera ? "Back" : "Front"} Camera
//                 </button>
//                 <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i>Capture Image
//                 </button>
//               </>
//             )}
//           </div>

//           {cameraOn && (
//             <canvas ref={canvasRef} width={320} height={240} style={{ width: "350px", border: "2px solid #5b708b" }} />
//           )}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img
//                 src={form.capturedImage}
//                 alt="Captured"
//                 style={{
//                   display: "block",
//                   width: "200px",
//                   marginTop: "10px",
//                   borderRadius: "10px",
//                   border: "2px solid #5b708b",
//                 }}
//               />
//               {form.latitude && form.longitude && (
//                 <p>
//                   🌍 Location: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}
//                 </p>
//               )}
//             </div>
//           )}


//           <div className="text-end mt-4">
//             <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
//               <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>
//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }




// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "",
//     latitude: null,
//     longitude: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [cameraOn, setCameraOn] = useState(false);
//   const [useFrontCamera, setUseFrontCamera] = useState(true);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.date) newErrors.date = "Date is required";
//     if (!form.observerName.trim()) newErrors.observerName = "Observer name is required";
//     if (!form.department.trim()) newErrors.department = "Department is required";
//     if (!form.designation.trim()) newErrors.designation = "Designation is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.details.trim()) newErrors.details = "Observation details are required";
//     if (!form.immediateAction.trim()) newErrors.immediateAction = "Immediate action is required";
//     if (!form.rootCauseAnalysis.trim()) newErrors.rootCauseAnalysis = "Root cause analysis is required";
//     if (!form.preventiveMeasures.trim()) newErrors.preventiveMeasures = "Preventive measures are required";
//     if (!form.recommendations.trim()) newErrors.recommendations = "Recommendations are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert("⚠️ Please fix validation errors before submitting.");
//       return;
//     }
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: "",
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//         latitude: null,
//         longitude: null,
//       });
//       setErrors({});
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   const handleSwitchCamera = async () => {
//     setUseFrontCamera((prev) => !prev);
//     if (cameraOn) {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: !useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         alert("⚠️ Failed to switch camera: " + err.message);
//       }
//     }
//   };

//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   const handleCaptureImage = () => {
//     if (!canvasRef.current) return;
//     const dataURL = canvasRef.current.toDataURL("image/png");

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm({
//           ...form,
//           capturedImage: dataURL,
//           latitude,
//           longitude,
//         });
//         alert("📸 Image & Location captured!");
//       },
//       (err) => {
//         alert("⚠️ Failed to get location: " + err.message);
//         setForm({ ...form, capturedImage: dataURL });
//       }
//     );
//   };

//   // ✅ Responsive Styles
//   const styles = {
//     container: {
//       margin: "0 auto",
//       padding: "20px",
//       background: "#f4f6f9",
//       width: "100%",
//       boxSizing: "border-box",
//     },
//     card: {
//       borderRadius: "12px",
//       boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//       background: "#fff",
//       animation: "fadeInUp 1s ease",
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "15px",
//     },
//     header: {
//       background: "linear-gradient(90deg,#55a669ff, #598892ff)",
//       color: "#fff",
//       padding: "15px",
//       fontSize: "20px",
//       fontWeight: "600",
//       textAlign: "center",
//     },
//     formGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "15px",
//     },
//     formGroup: { marginBottom: "15px" },
//     input: {
//       width: "100%",
//       padding: "12px",
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       fontSize: "14px",
//       boxSizing: "border-box",
//     },
//     textarea: {
//       width: "100%",
//       padding: "12px",
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       fontSize: "14px",
//       minHeight: "80px",
//       boxSizing: "border-box",
//     },
//     label: { fontSize: "16px", fontWeight: "600", marginBottom: "6px", display: "block" },
//     errorText: { color: "red", fontSize: "13px", marginTop: "4px" },
//     button: {
//       background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)",
//       border: "none",
//       padding: "12px 20px",
//       fontSize: "14px",
//       fontWeight: "600",
//       borderRadius: "8px",
//       cursor: "pointer",
//       color: "#fff",
//       margin: "5px 5px 5px 0",
//       flex: "1",
//     },
//     buttonGroup: {
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "10px",
//       marginBottom: "15px",
//     },
//     previewImage: {
//       display: "block",
//       width: "100%",
//       maxWidth: "220px",
//       marginTop: "10px",
//       borderRadius: "10px",
//       border: "2px solid #5b708b",
//     },
//     responsiveTwoCol: {
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: "15px",
//     },
//     "@media (max-width: 768px)": {
//       responsiveTwoCol: { gridTemplateColumns: "1fr" },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
//           <div style={styles.responsiveTwoCol}>
//             {[
//               { label: "Date", type: "date", name: "date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter Observer Name" },
//               { label: "Department", type: "text", name: "department", placeholder: "Enter Department" },
//               { label: "Designation", type: "text", name: "designation", placeholder: "Enter Designation" },
//               { label: "Location", type: "text", name: "location", placeholder: "Enter Location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//                 {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//               </div>
//             ))}
//           </div>

//           {[
//             { label: "Observation Details", name: "details", placeholder: "Enter Observation Details" },
//             { label: "Immediate Action", name: "immediateAction", placeholder: "Enter Immediate Action" },
//             { label: "Root Cause Analysis", name: "rootCauseAnalysis", placeholder: "Enter Root Cause Analysis" },
//             { label: "Preventive Measures", name: "preventiveMeasures", placeholder: "Enter Preventive Measures" },
//             { label: "Recommendations", name: "recommendations", placeholder: "Enter Recommendations" },
//           ].map((field, index) => (
//             <div style={styles.formGroup} key={index}>
//               <label style={styles.label}>{field.label}</label>
//               <textarea
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 style={styles.textarea}
//                 placeholder={field.placeholder}
//               />
//               {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//             </div>
//           ))}

//           {/* Camera Controls */}
//           <div style={styles.buttonGroup}>
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//               <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
//             </button>

//             {cameraOn && (
//               <>
//                 <button type="button" onClick={handleSwitchCamera} style={styles.button}>
//                   <i className="fa fa-refresh me-2"></i>
//                   Switch to {useFrontCamera ? "Back" : "Front"} Camera
//                 </button>
//                 <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i> Capture Image
//                 </button>
//               </>
//             )}
//           </div>

//           {cameraOn && (
//             <canvas
//               ref={canvasRef}
//               width={320}
//               height={240}
//               style={{
//                 width: "100%",
//                 maxWidth: "400px",
//                 border: "2px solid #5b708b",
//                 borderRadius: "10px",
//               }}
//             />
//           )}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img src={form.capturedImage} alt="Captured" style={styles.previewImage} />
//               {form.latitude && form.longitude && (
//                 <p>
//                   🌍 Location: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="text-end mt-4">
//             <button
//               type="submit"
//               style={styles.button}
//               className="animate__animated animate__pulse animate__infinite"
//             >
//               <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>
//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "",
//     latitude: null,
//     longitude: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [cameraOn, setCameraOn] = useState(false);
//   const [useFrontCamera, setUseFrontCamera] = useState(true);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   // ✅ Prefill observer name from logged-in user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setForm((prev) => ({ ...prev, observerName: user.name || "" }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.date) newErrors.date = "Date is required";
//     if (!form.observerName.trim()) newErrors.observerName = "Observer name is required";
//     if (!form.department.trim()) newErrors.department = "Department is required";
//     if (!form.designation.trim()) newErrors.designation = "Designation is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.details.trim()) newErrors.details = "Observation details are required";
//     if (!form.immediateAction.trim()) newErrors.immediateAction = "Immediate action is required";
//     if (!form.rootCauseAnalysis.trim()) newErrors.rootCauseAnalysis = "Root cause analysis is required";
//     if (!form.preventiveMeasures.trim()) newErrors.preventiveMeasures = "Preventive measures are required";
//     if (!form.recommendations.trim()) newErrors.recommendations = "Recommendations are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert("⚠️ Please fix validation errors before submitting.");
//       return;
//     }
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: form.observerName, // keep prefilled observer name
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//         latitude: null,
//         longitude: null,
//       });
//       setErrors({});
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   const handleSwitchCamera = async () => {
//     setUseFrontCamera((prev) => !prev);
//     if (cameraOn) {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: !useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         alert("⚠️ Failed to switch camera: " + err.message);
//       }
//     }
//   };

//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   const handleCaptureImage = () => {
//     if (!canvasRef.current) return;
//     const dataURL = canvasRef.current.toDataURL("image/png");

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm({
//           ...form,
//           capturedImage: dataURL,
//           latitude,
//           longitude,
//         });
//         alert("📸 Image & Location captured!");
//       },
//       (err) => {
//         alert("⚠️ Failed to get location: " + err.message);
//         setForm({ ...form, capturedImage: dataURL });
//       }
//     );
//   };

//   const styles = {
//     container: { margin: "0 auto", padding: "20px", background: "#f4f6f9", width: "100%" },
//     card: { borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", background: "#fff", animation: "fadeInUp 1s ease", maxWidth: "1200px", margin: "0 auto", padding: "15px" },
//     header: { background: "linear-gradient(90deg,#55a669ff, #598892ff)", color: "#fff", padding: "15px", fontSize: "20px", fontWeight: "600", textAlign: "center" },
//     formGroup: { marginBottom: "15px" },
//     input: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" },
//     textarea: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", minHeight: "80px" },
//     label: { fontSize: "16px", fontWeight: "600", marginBottom: "6px", display: "block" },
//     errorText: { color: "red", fontSize: "13px", marginTop: "4px" },
//     button: { background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)", border: "none", padding: "12px 20px", fontSize: "14px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", color: "#fff", margin: "5px 5px 5px 0", flex: "1" },
//     buttonGroup: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" },
//     previewImage: { display: "block", width: "100%", maxWidth: "220px", marginTop: "10px", borderRadius: "10px", border: "2px solid #5b708b" },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
//             {[
//               { label: "Date", type: "date", name: "date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter Observer Name" },
//               { label: "Department", type: "text", name: "department", placeholder: "Enter Department" },
//               { label: "Designation", type: "text", name: "designation", placeholder: "Enter Designation" },
//               { label: "Location", type: "text", name: "location", placeholder: "Enter Location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//                 {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//               </div>
//             ))}
//           </div>

//           {/* Rest of form: textarea fields */}
//           {["details","immediateAction","rootCauseAnalysis","preventiveMeasures","recommendations"].map((fieldName, idx) => (
//             <div style={styles.formGroup} key={idx}>
//               <label style={styles.label}>{fieldName.replace(/([A-Z])/g, " $1")}</label>
//               <textarea
//                 name={fieldName}
//                 value={form[fieldName]}
//                 onChange={handleChange}
//                 style={styles.textarea}
//               />
//               {errors[fieldName] && <div style={styles.errorText}>{errors[fieldName]}</div>}
//             </div>
//           ))}

//           {/* Camera */}
//           <div style={styles.buttonGroup}>
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//               <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
//             </button>
//             {cameraOn && (
//               <>
//                 <button type="button" onClick={handleSwitchCamera} style={styles.button}>
//                   <i className="fa fa-refresh me-2"></i>Switch Camera
//                 </button>
//                 <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i>Capture Image
//                 </button>
//               </>
//             )}
//           </div>

//           {cameraOn && <canvas ref={canvasRef} width={320} height={240} style={{ width: "100%", maxWidth: "400px", border: "2px solid #5b708b", borderRadius: "10px" }} />}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img src={form.capturedImage} alt="Captured" style={styles.previewImage} />
//               {form.latitude && form.longitude && <p>🌍 Location: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}</p>}
//             </div>
//           )}

//           <div className="text-end mt-4">
//             <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
//               <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>
//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }





// import React, { useState, useRef, useEffect } from "react";
// import { createObservation } from "../api";
// import "animate.css";

// export default function ObservationForm({ onSuccess }) {
//   const [form, setForm] = useState({
//     date: "",
//     observerName: "",
//     department: "",
//     designation: "",
//     location: "",
//     details: "",
//     immediateAction: "",
//     rootCauseAnalysis: "",
//     preventiveMeasures: "",
//     recommendations: "",
//     capturedImage: "",
//     latitude: null,
//     longitude: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [cameraOn, setCameraOn] = useState(false);
//   const [useFrontCamera, setUseFrontCamera] = useState(true);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const animationRef = useRef(null);

//   // Prefill observer name from logged-in user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setForm((prev) => ({ ...prev, observerName: user.name || "" }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.date) newErrors.date = "Date is required";
//     if (!form.observerName.trim()) newErrors.observerName = "Observer name is required";
//     if (!form.department.trim()) newErrors.department = "Department is required";
//     if (!form.designation.trim()) newErrors.designation = "Designation is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.details.trim()) newErrors.details = "Observation details are required";
//     if (!form.immediateAction.trim()) newErrors.immediateAction = "Immediate action is required";
//     if (!form.rootCauseAnalysis.trim()) newErrors.rootCauseAnalysis = "Root cause analysis is required";
//     if (!form.preventiveMeasures.trim()) newErrors.preventiveMeasures = "Preventive measures are required";
//     if (!form.recommendations.trim()) newErrors.recommendations = "Recommendations are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert("⚠️ Please fix validation errors before submitting.");
//       return;
//     }
//     try {
//       await createObservation(form);
//       alert("✅ Observation submitted successfully");
//       setForm({
//         date: "",
//         observerName: form.observerName,
//         department: "",
//         designation: "",
//         location: "",
//         details: "",
//         immediateAction: "",
//         rootCauseAnalysis: "",
//         preventiveMeasures: "",
//         recommendations: "",
//         capturedImage: "",
//         latitude: null,
//         longitude: null,
//       });
//       setErrors({});
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//     }
//   };

//   const handleOpenCamera = async () => {
//     if (!cameraOn) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//         setCameraOn(true);
//       } catch (err) {
//         alert("⚠️ Camera access denied: " + err.message);
//       }
//     } else {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       cancelAnimationFrame(animationRef.current);
//       setCameraOn(false);
//     }
//   };

//   const handleSwitchCamera = async () => {
//     setUseFrontCamera((prev) => !prev);
//     if (cameraOn) {
//       streamRef.current?.getTracks().forEach((track) => track.stop());
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: !useFrontCamera ? "user" : "environment" },
//         });
//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         alert("⚠️ Failed to switch camera: " + err.message);
//       }
//     }
//   };

//   const drawCanvas = () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//     animationRef.current = requestAnimationFrame(drawCanvas);
//   };

//   useEffect(() => {
//     if (cameraOn) {
//       videoRef.current.play();
//       drawCanvas();
//     }
//   }, [cameraOn]);

//   const handleCaptureImage = () => {
//     if (!canvasRef.current) return;
//     const dataURL = canvasRef.current.toDataURL("image/png");

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm({
//           ...form,
//           capturedImage: dataURL,
//           latitude,
//           longitude,
//         });
//         alert("📸 Image & Location captured!");
//       },
//       (err) => {
//         alert("⚠️ Failed to get location: " + err.message);
//         setForm({ ...form, capturedImage: dataURL });
//       }
//     );
//   };

//   const styles = {
//     container: { margin: "0 auto", padding: "20px", background: "#f4f6f9", width: "100%" },
//     card: { borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", background: "#fff", animation: "fadeInUp 1s ease", maxWidth: "1200px", margin: "0 auto", padding: "15px" },
//     header: { background: "linear-gradient(90deg,#55a669ff, #598892ff)", color: "#fff", padding: "15px", fontSize: "20px", fontWeight: "600", textAlign: "center" },
//     formGroup: { marginBottom: "15px" },
//     input: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" },
//     textarea: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", minHeight: "80px" },
//     label: { fontSize: "16px", fontWeight: "600", marginBottom: "6px", display: "block" },
//     errorText: { color: "red", fontSize: "13px", marginTop: "4px" },
//     button: { background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)", border: "none", padding: "12px 20px", fontSize: "14px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", color: "#fff", margin: "5px 5px 5px 0", flex: "1" },
//     buttonGroup: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" },
//     previewImage: { display: "block", width: "100%", maxWidth: "220px", marginTop: "10px", borderRadius: "10px", border: "2px solid #5b708b" },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card} className="animate__animated animate__fadeInUp">
//         <div style={styles.header}>
//           <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
//             {[
//               { label: "Date", type: "date", name: "date", placeholder: "Select date" },
//               { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter your name" },
//               { label: "Department", type: "text", name: "department", placeholder: "Enter your department" },
//               { label: "Designation", type: "text", name: "designation", placeholder: "Enter your designation" },
//               { label: "Location", type: "text", name: "location", placeholder: "Enter observation location" },
//             ].map((field, index) => (
//               <div style={styles.formGroup} key={index}>
//                 <label style={styles.label}>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={handleChange}
//                   style={styles.input}
//                   placeholder={field.placeholder || ""}
//                 />
//                 {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//               </div>
//             ))}
//           </div>

//           {/* Textareas */}
//           {[
//             { name: "Details", placeholder: "Enter observation details" },
//             { name: "ImmediateAction", placeholder: "Enter immediate action taken" },
//             { name: "RootCauseAnalysis", placeholder: "Enter root cause analysis" },
//             { name: "PreventiveMeasures", placeholder: "Enter preventive measures" },
//             { name: "Recommendations", placeholder: "Enter recommendations" },
//           ].map((field, idx) => (
//             <div style={styles.formGroup} key={idx}>
//               <label style={styles.label}>{field.name.replace(/([A-Z])/g, " $1")}</label>
//               <textarea
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 style={styles.textarea}
//                 placeholder={field.placeholder}
//               />
//               {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
//             </div>
//           ))}

//           {/* Camera Buttons */}
//           <div style={styles.buttonGroup}>
//             <button type="button" onClick={handleOpenCamera} style={styles.button}>
//               <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
//               {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
//             </button>
//             {cameraOn && (
//               <>
//                 <button type="button" onClick={handleSwitchCamera} style={styles.button}>
//                   <i className="fa fa-refresh me-2"></i>Switch Camera
//                 </button>
//                 <button type="button" onClick={handleCaptureImage} style={styles.button}>
//                   <i className="fa fa-camera-retro me-2"></i>Capture Image
//                 </button>
//               </>
//             )}
//           </div>

//           {cameraOn && <canvas ref={canvasRef} width={320} height={240} style={{ width: "100%", maxWidth: "400px", border: "2px solid #5b708b", borderRadius: "10px" }} />}

//           {form.capturedImage && (
//             <div className="mt-3">
//               <strong>Captured Image Preview:</strong>
//               <img src={form.capturedImage} alt="Captured" style={styles.previewImage} />
//               {form.latitude && form.longitude && <p>🌍 Location: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}</p>}
//             </div>
//           )}

//           <div className="text-end mt-4">
//             <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
//               <i className="fa fa-paper-plane me-2"></i>Submit Observation
//             </button>
//           </div>
//         </form>
//       </div>
//       <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
//     </div>
//   );
// }




import React, { useState, useRef, useEffect } from "react";
import { createObservation } from "../api";
import "animate.css";

export default function ObservationForm({ onSuccess }) {
  const [form, setForm] = useState({
    date: "",
    observerName: "",
    department: "",
    designation: "",
    location: "",
    details: "",
    immediateAction: "",
    rootCauseAnalysis: "",
    preventiveMeasures: "",
    recommendations: "",
    capturedImage: "",
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [cameraOn, setCameraOn] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  // Prefill observer name from logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setForm((prev) => ({ ...prev, observerName: user.name || "" }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "capturedImage" && key !== "latitude" && key !== "longitude" && !form[key].toString().trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("⚠️ Please fix validation errors before submitting.");
      return;
    }
    try {
      await createObservation(form);
      alert("✅ Observation submitted successfully");
      setForm({
        date: "",
        observerName: form.observerName,
        department: "",
        designation: "",
        location: "",
        details: "",
        immediateAction: "",
        rootCauseAnalysis: "",
        preventiveMeasures: "",
        recommendations: "",
        capturedImage: "",
        latitude: null,
        longitude: null,
      });
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  const handleOpenCamera = async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: useFrontCamera ? "user" : "environment" },
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        setCameraOn(true);
      } catch (err) {
        alert("⚠️ Camera access denied: " + err.message);
      }
    } else {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      cancelAnimationFrame(animationRef.current);
      setCameraOn(false);
    }
  };

  const handleSwitchCamera = async () => {
    setUseFrontCamera((prev) => !prev);
    if (cameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: !useFrontCamera ? "user" : "environment" },
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      } catch (err) {
        alert("⚠️ Failed to switch camera: " + err.message);
      }
    }
  };

  const drawCanvas = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    animationRef.current = requestAnimationFrame(drawCanvas);
  };

  useEffect(() => {
    if (cameraOn) {
      videoRef.current.play();
      drawCanvas();
    }
  }, [cameraOn]);

  const handleCaptureImage = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL("image/png");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm({
          ...form,
          capturedImage: dataURL,
          latitude,
          longitude,
        });
        alert("📸 Image & Location captured!");
      },
      (err) => {
        alert("⚠️ Failed to get location: " + err.message);
        setForm({ ...form, capturedImage: dataURL });
      }
    );
  };

  const styles = {
    container: { margin: "0 auto", padding: "20px", background: "#f4f6f9", width: "100%" },
    card: { borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", background: "#fff", animation: "fadeInUp 1s ease", maxWidth: "1200px", margin: "0 auto", padding: "15px" },
    header: { background: "linear-gradient(90deg,#55a669ff, #598892ff)", color: "#fff", padding: "15px", fontSize: "20px", fontWeight: "600", textAlign: "center" },
    formGroup: { marginBottom: "15px" },
    input: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px" },
    textarea: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", minHeight: "80px" },
    label: { fontSize: "16px", fontWeight: "600", marginBottom: "6px", display: "block" },
    errorText: { color: "red", fontSize: "13px", marginTop: "4px" },
    button: { background: "linear-gradient(90deg, #5b708bff, #9f9c3dff)", border: "none", padding: "12px 20px", fontSize: "14px", fontWeight: "600", borderRadius: "8px", cursor: "pointer", color: "#fff", margin: "5px 5px 5px 0", flex: "1" },
    buttonGroup: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" },
    previewImage: { display: "block", width: "100%", maxWidth: "220px", marginTop: "10px", borderRadius: "10px", border: "2px solid #5b708b" },
  };

  // Field definitions
  const inputFields = [
    { label: "Date", type: "date", name: "date", placeholder: "Select date" },
    { label: "Observer Name", type: "text", name: "observerName", placeholder: "Enter observer name", readOnly: true },
    { label: "Department", type: "text", name: "department", placeholder: "Enter department" },
    { label: "Designation", type: "text", name: "designation", placeholder: "Enter designation" },
    { label: "Location", type: "text", name: "location", placeholder: "Enter observation location" },
  ];

  const textareaFields = [
    { label: "Details", type: "textarea", name: "details", placeholder: "Enter observation details" },
    { label: "Immediate Action", type: "textarea", name: "immediateAction", placeholder: "Enter immediate action taken" },
    { label: "Root Cause Analysis", type: "textarea", name: "rootCauseAnalysis", placeholder: "Enter root cause analysis" },
    { label: "Preventive Measures", type: "textarea", name: "preventiveMeasures", placeholder: "Enter preventive measures" },
    { label: "Recommendations", type: "textarea", name: "recommendations", placeholder: "Enter recommendations" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card} className="animate__animated animate__fadeInUp">
        <div style={styles.header}>
          <i className="bi bi-clipboard-plus me-2"></i> Add New Observation
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {inputFields.map((field, index) => (
              <div style={styles.formGroup} key={index}>
                <label style={styles.label}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    backgroundColor: field.readOnly ? "#e0e0e0" : "#fff", // light gray for read-only
                    cursor: field.readOnly ? "not-allowed" : "text",
                  }}
                  placeholder={field.placeholder}
                  readOnly={field.readOnly || false}

                />
                {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
              </div>
            ))}
          </div>

          {textareaFields.map((field, idx) => (
            <div style={styles.formGroup} key={idx}>
              <label style={styles.label}>{field.label}</label>
              <textarea
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={styles.textarea}
                placeholder={field.placeholder}
              />
              {errors[field.name] && <div style={styles.errorText}>{errors[field.name]}</div>}
            </div>
          ))}

          {/* Camera Buttons */}
          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleOpenCamera} style={styles.button}>
              <i className={`fa ${cameraOn ? "fa-times" : "fa-camera"} me-2`}></i>
              {cameraOn ? "Close Camera" : `Open ${useFrontCamera ? "Front" : "Back"} Camera`}
            </button>
            {cameraOn && (
              <>
                <button type="button" onClick={handleSwitchCamera} style={styles.button}>
                  <i className="fa fa-refresh me-2"></i>Switch Camera
                </button>
                <button type="button" onClick={handleCaptureImage} style={styles.button}>
                  <i className="fa fa-camera-retro me-2"></i>Capture Image
                </button>
              </>
            )}
          </div>

          {cameraOn && <canvas ref={canvasRef} width={320} height={240} style={{ width: "100%", maxWidth: "400px", border: "2px solid #5b708b", borderRadius: "10px" }} />}

          {form.capturedImage && (
            <div className="mt-3">
              <strong>Captured Image Preview:</strong>
              <img src={form.capturedImage} alt="Captured" style={styles.previewImage} />
              {form.latitude && form.longitude && <p>🌍 Location: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}</p>}
            </div>
          )}

          <div className="text-end mt-4">
            <button type="submit" style={styles.button} className="animate__animated animate__pulse animate__infinite">
              <i className="fa fa-paper-plane me-2"></i>Submit Observation
            </button>
          </div>
        </form>
      </div>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
    </div>
  );
}
