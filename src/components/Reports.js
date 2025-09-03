// import React, { useEffect, useState } from "react";
// import { getObservations } from "../api"; // ✅ use your axios API

// function Reports({ refresh }) {
//   const [observations, setObservations] = useState([]);

//   useEffect(() => {
//     loadObservations();
//   }, [refresh]);

//   const loadObservations = async () => {
//     try {
//       const { data } = await getObservations(); // ✅ axios call
//       setObservations(data);
//     } catch (err) {
//       console.error("Error loading observations:", err);
//     }
//   };

//   return (
//     <div className="card shadow-lg animate__animated animate__fadeInUp">
//       {/* Header */}
//       <div
//         className="card-header text-white"
//         style={{ background: "linear-gradient(90deg, #55a669ff, #598892ff)" }}
//       >
//         <h4 className="mb-0">
//           <i className="bi bi-table me-2"></i> Observation Reports
//         </h4>
//       </div>

//       {/* Table Body */}
//       <div className="card-body">
//         <div className="table-responsive">
//           <table className="table table-striped table-hover align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Observer Name</th>
//                 <th>Department</th>
//                 <th>Designation</th>
//                 <th>Location</th>
//                 <th>Immediate Action</th>
//                 <th>Details</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {observations.length > 0 ? (
//                 observations.map((obs, index) => (
//                   <tr key={obs._id || index}>
//                     <td>{index + 1}</td>
//                     <td>{obs.observerName}</td>
//                     <td>{obs.department}</td>
//                     <td>{obs.designation}</td>
//                     <td>{obs.location}</td>
//                     <td>{obs.immediateAction}</td>
//                     <td>{obs.details}</td>
//                     <td>{new Date(obs.date).toLocaleDateString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center text-muted">
//                     No observations found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Reports;


import React, { useEffect, useState } from "react";
import { getObservations } from "../api";

function Reports({ refresh }) {
  const [observations, setObservations] = useState([]);
  const [selectedObs, setSelectedObs] = useState(null);

  useEffect(() => {
    loadObservations();
  }, [refresh]);

  const loadObservations = async () => {
    try {
      const { data } = await getObservations();
      setObservations(data);
    } catch (err) {
      console.error("Error loading observations:", err);
    }
  };

  return (
    <div className="card shadow-lg animate__animated animate__fadeInUp" style={{ margin: "10px" }}>
      {/* Header */}
      <div
        className="card-header text-white"
        style={{ background: "linear-gradient(90deg, #55a669ff, #598892ff)" }}
      >
        <h4 className="mb-0" style={{ fontSize: "1.2rem" }}>
          <i className="bi bi-table me-2"></i> Observation Reports
        </h4>
      </div>

      {/* Table */}
      <div className="card-body" style={{ padding: "0.5rem" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-hover align-middle" style={{ minWidth: "800px" }}>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Observer Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Location</th>
                <th>Immediate Action</th>
                <th>Details</th>
                <th>Date</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {observations.length > 0 ? (
                observations.map((obs, index) => (
                  <tr key={obs._id || index}>
                    <td>{index + 1}</td>
                    <td>{obs.observerName}</td>
                    <td>{obs.department}</td>
                    <td>{obs.designation}</td>
                    <td>{obs.location}</td>
                    <td>{obs.immediateAction}</td>
                    <td>{obs.details}</td>
                    <td>{new Date(obs.date).toLocaleDateString()}</td>
                    <td>
                      {obs.capturedImage ? (
                        <button
                          onClick={() => setSelectedObs(obs)}
                          className="view-image-btn"
                        >
                          View Image
                        </button>
                      ) : (
                        "No Image"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No observations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup */}
      {selectedObs && (
        <div
          className="popup-container"
          onClick={() => setSelectedObs(null)}
        >
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedObs(null)}>✕</button>
            <div className="popup-header">Observation Details</div>
            <div className="popup-image-container">
              <img src={selectedObs.capturedImage} alt="Captured" className="popup-image" />
              <div className="popup-overlay">
                🌍 <b>Latitude:</b> {selectedObs.latitude?.toFixed(6) || "N/A"} |{" "}
                <b>Longitude:</b> {selectedObs.longitude?.toFixed(6) || "N/A"} <br />
                📍 <b>Address:</b> {selectedObs.resolvedAddress || "Not available"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive & Animation Styles */}
      <style>
        {`
          .view-image-btn {
            padding: 6px 12px;
            background-color: #598892ff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: 0.2s;
          }
          .view-image-btn:hover {
            background-color: #55a669ff;
            transform: scale(1.05);
          }

          /* Popup */
          .popup-container {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.85);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 5% 10px;
            z-index: 1000;
            overflow-y: auto;
          }
          .popup-card {
            position: relative;
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            background-color: #f7f7f7;
            overflow: hidden;
            animation: zoomIn 0.35s ease-in-out;
          }
          .popup-close {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255,0,0,0.85);
            color: white;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
          }
          .popup-header {
            background: linear-gradient(90deg, #55a669ff, #598892ff);
            color: white;
            padding: 16px;
            font-size: 1.1rem;
            font-weight: 600;
            text-align: center;
          }
          .popup-image-container {
            position: relative;
          }
          .popup-image {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
          }
          .popup-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
            color: #fff;
            padding: 12px 16px;
            font-size: 0.85rem;
            line-height: 1.3;
          }

          @keyframes zoomIn {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          /* Table responsiveness */
          @media (max-width: 768px) {
            table {
              font-size: 0.85rem;
            }
          }
          @media (max-width: 480px) {
            .popup-card {
              max-width: 95%;
            }
            .popup-header {
              font-size: 1rem;
            }
            .popup-overlay {
              font-size: 0.75rem;
            }
            table {
              min-width: 600px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Reports;

