const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema(
  {
    productId: { type: String},
    offerprice: { type: Number, required: true },
    offername: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    product: { type: String },
    category:{ type: String },
    subcategory:{ type: String }
  },
  { timestamps: true }
);
const Offer = mongoose.model("productoffer", offerSchema);
module.exports = Offer;
