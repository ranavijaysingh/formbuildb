import mongoose from 'mongoose'

const formModelSchema = mongoose.Schema({
        id: Number,
        type: String,
        question: String,
        ans: String,
        inputValues: {
            type: [String],
            default: [], 
        }
})

const arrayOfFormsSchema = new mongoose.Schema({
    form: [formModelSchema],
  });

  
const ArrayOfFormsModel = mongoose.model('ArrayOfForms', arrayOfFormsSchema);

module.exports = ArrayOfFormsModel;


export default mongoose.model("formModels", formModelSchema)

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
  // Define the schema for the array of objects
  const arrayOfObjectsSchema = new mongoose.Schema({
    people: [personSchema],
  });
  
  // Create a model based on the schema
  const ArrayOfObjectsModel = mongoose.model('ArrayOfObjects', arrayOfObjectsSchema);
  
  module.exports = ArrayOfObjectsModel;