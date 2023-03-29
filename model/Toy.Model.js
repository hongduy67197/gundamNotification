const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://gundambasevnstore:Anxiety16092020@cluster0.g3jsngi.mongodb.net/toyDB?retryWrites=true&w=majority"
);

const ToyModel = mongoose.Schema(
  {
    link: String,
    name: [{ type: String }],
  },
  { collection: "toy", timestamps: true }
);

module.exports.Toy = mongoose.model("toy", ToyModel);
