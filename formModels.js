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
  
export default mongoose.model('ArrayOfForms', arrayOfFormsSchema);



