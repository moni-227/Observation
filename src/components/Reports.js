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
    <div className="card shadow-lg animate__animated animate__fadeInUp">
      {/* Header */}
      <div
        className="card-header text-white"
        style={{ background: "linear-gradient(90deg, #55a669ff, #598892ff)" }}
      >
        <h4 className="mb-0">
          <i className="bi bi-table me-2"></i> Observation Reports
        </h4>
      </div>

      {/* Table */}
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
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
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#598892ff",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                            transition: "background-color 0.2s, transform 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#55a669ff";
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#598892ff";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
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

      {/* Popup Card with attractive header */}
      {selectedObs && (
        <div
          className="popup-container animate__animated animate__fadeIn"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // change from center to flex-start
            paddingTop: "50px",       // push popup slightly down
            zIndex: 1000,
          }}
          onClick={() => setSelectedObs(null)}
        >
          <div
            className="popup-card"
            style={{
              position: "relative",
              width: "80vh",
              maxWidth: "90%",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "default",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
              animation: "zoomIn 0.35s ease-in-out",
              backgroundColor: "#f7f7f7",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing on card click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedObs(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255,0,0,0.85)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              ✕
            </button>

            {/* Header Section */}
            <div
              style={{
                background: "linear-gradient(90deg, #55a669ff, #598892ff)",
                color: "white",
                padding: "16px",
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Observation captured Image
            </div>

            {/* Image */}
            <div style={{ position: "relative" }}>
              <img
                src={selectedObs.capturedImage}
                alt="Captured"
                style={{
                  width: "100%", height: "auto", display: "block",
                  objectFit: "cover",
                }}
              />
              {/* Overlay Info */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                  color: "#fff",
                  padding: "14px 16px",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                🌍 <b>Latitude:</b> {selectedObs.latitude?.toFixed(6) || "N/A"} |{" "}
                <b>Longitude:</b> {selectedObs.longitude?.toFixed(6) || "N/A"} <br />
                📍 <b>Address:</b> {selectedObs.resolvedAddress || "Not available"}
              </div>
            </div>
          </div>

          {/* Animations */}
          <style>
            {`
              @keyframes zoomIn {
                from { transform: scale(0.7); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              .animate__fadeIn {
                animation: fadeIn 0.25s ease-in-out;
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
}

export default Reports;


