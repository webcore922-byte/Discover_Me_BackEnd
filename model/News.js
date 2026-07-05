const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String, required: true },
    sectionImage: { type: String, default: '' },
  },
  { _id: false }
);

const newsSchema = new mongoose.Schema(
  {
    tag: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, trim: true },
    image: { type: String, default: '' },
    author: { type: String, trim: true },
    date: { type: String, trim: true }, // نص زي "١٤ يونيو ٢٠٢٦" مش Date عادي
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);