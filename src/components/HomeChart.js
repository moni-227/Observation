// src/components/HomeChart.js
import React, { useEffect, useState } from "react";
import { getObservations } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function HomeChart() {
  const [deptData, setDeptData] = useState([]);
  const [locData, setLocData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data } = await getObservations();

      // Group by department
      const deptCounts = {};
      data.forEach((obs) => {
        const dept = obs.department || "Unknown";
        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
      });
      const formattedDept = Object.keys(deptCounts).map((dept) => ({
        name: dept,
        value: deptCounts[dept],
      }));
      setDeptData(formattedDept);

      // Group by location
      const locCounts = {};
      data.forEach((obs) => {
        const loc = obs.location || "Unknown";
        locCounts[loc] = (locCounts[loc] || 0) + 1;
      });
      const formattedLoc = Object.keys(locCounts).map((loc) => ({
        name: loc,
        value: locCounts[loc],
      }));
      setLocData(formattedLoc);
    } catch (error) {
      console.error("Error loading chart data:", error);
    }
  };

  // 🎨 Different color palettes
  // 🎨 Different color palettes
const BAR_COLORS = ["#e3746aff", "#846ebaff", "#88b04b", "#ffa500", "#009688"]; // Bold
const PIE_COLORS = ["#589186ff", "#f9e79f", "#f5b7b1", "#d2b4de", "#aed6f1"]; // Pastels


  // custom label for pie
  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

  return (
    <div className="row">
      {/* Chart 1 - Bar (Departments) */}
      <div className="col-lg-6 col-md-12 mb-4">
        <div
          className="card shadow-lg border-0 animate__animated animate__fadeInLeft"
          style={{ borderRadius: "5px", overflow: "hidden" }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(90deg, #4e6788, #6c8dad)",
              fontWeight: "600",
            }}
          >
            <i className="bi bi-bar-chart-fill me-2"></i>
            Observations by Department
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", background: "#fff" }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1200}>
                  {deptData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]} // ✅ unique palette for bars
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 2 - Pie (Locations) */}
      <div className="col-lg-6 col-md-12 mb-4">
        <div
          className="card shadow-lg border-0 animate__animated animate__fadeInRight"
          style={{ borderRadius: "5px", overflow: "hidden" }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(90deg, #55a669, #7dbb8c)",
              fontWeight: "600",
            }}
          >
            <i className="bi bi-pie-chart-fill me-2"></i>
            Observations by Location
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                  animationDuration={1200}
                >
                  {locData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]} // ✅ different palette for pie
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "10px", background: "#fff" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomeChart;
