import React, { useEffect, useState } from "react";
import { getObservations } from "../api";

export default function ObservationList({ refresh }) {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    load();
  }, [refresh]);

  const load = async () => {
    const { data } = await getObservations();
    setObservations(data);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {observations.map((obs) => (
          <div key={obs._id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 rounded-3 h-100 animate__animated animate__fadeInUp">
              <div
                className="card-header text-white"
                style={{
                  background: "linear-gradient(90deg, #007bff, #00c6ff)",
                }}
              >
                <small>
                  <i className="bi bi-calendar-event me-2"></i>
                  {new Date(obs.date).toLocaleDateString()}
                </small>
              </div>
              <div className="card-body">
                <p className="mb-1">
                  <i className="bi bi-person-fill me-2 text-primary"></i>
                  <b>{obs.observerName}</b> ({obs.department})
                </p>
                <p className="mb-1">
                  <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                  {obs.location}
                </p>
                <p className="mb-0">
                  <i className="bi bi-chat-left-text-fill me-2 text-success"></i>
                  {obs.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
