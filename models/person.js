const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


const uniqueValidator = require("mongoose-unique-validator");



// const password = process.argv[2];

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  },
});


//Apply the uniqueValidator plugin to userSchema:

personSchema.plugin(uniqueValidator)


personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
