const mongoose = require("mongoose");
const { Schema } = mongoose;

var ImgsTemplateChema = new Schema();

ImgsTemplateChema.add({
  _id: mongoose.Types.ObjectId,
  imgId: String,
  templateId: String,
  imgType: Number,
});

mongoose.model("ImgsTemplate", ImgsTemplateChema);
