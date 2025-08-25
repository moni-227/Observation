import React, { useEffect, useState } from "react";
import { getObservations } from "../api"; // ✅ use your axios API

function Reports({ refresh }) {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    loadObservations();
  }, [refresh]);

  const loadObservations = async () => {
    try {
      const { data } = await getObservations(); // ✅ axios call
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

      {/* Table Body */}
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No observations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
