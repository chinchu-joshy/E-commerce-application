const mongoose = require("mongoose");
const coupenSchema = new mongoose.Schema(
  {
    coupenname: { type: String,required:true },
    offer: { type: Number, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    coupencode: { type: String ,required:true},
    
    
    limit:{ type: Number, required: true }
  },
  { timestamps: true }
);
const Coupen = mongoose.model("coupen", coupenSchema);
module.exports = Coupen;