// const mongoose = require('mongoose');

// const ObservationSchema = new mongoose.Schema(
//   {
//     date: { type: Date, required: true },
//     observerName: { type: String, required: true, trim: true },
//     department: { type: String, required: true, trim: true },
//     designation: { type: String, required: true, trim: true },
//     location: { type: String, required: true, trim: true },
//     details: { type: String, required: true },
//     immediateAction: { type: String, required: true },
//     rootCauseAnalysis: { type: String, required: true },
//     preventiveMeasures: { type: String, required: true },
//     recommendations: { type: String, required: true },
//      capturedImage: { type: String }, // Base64 image
//     latitude: { type: Number },      // ✅ new field
//     longitude: { type: Number },
//     resolvedAddress: { type: String }, // 📍 auto-generated from lat/lon

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Observation', ObservationSchema);


const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    observerName: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    details: { type: String, required: true },
    immediateAction: { type: String, required: true },
    rootCauseAnalysis: { type: String, required: true },
    preventiveMeasures: { type: String, required: true },
    recommendations: { type: String, required: true },
     capturedImage: { type: String }, // Base64 image
     latitude: { type: Number },      // ✅ new field
    longitude: { type: Number },
    resolvedAddress: { type: String }, // 📍 auto-generated from lat/lon

  },
  { timestamps: true }
);

module.exports = mongoose.model('Observation', ObservationSchema);

