import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import ArrayOfForms from './formModels.js';
import dotenv from 'dotenv';

//App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://our-first-user:muY2VV2o8x48lML3@ranavijaycluster.58sli.mongodb.net/formdb?retryWrites=true&w=majority'

//Middlewares
app.use(express.json());
app.use(Cors());
app.use(methodOverride("_method"));

//db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})

//Functions
function createArrayOfFormsFromJson(jsonData) {
  const arrayOfFormsData = {
    form: [],
  };
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const item = jsonData[key];

      const formModelData = {
        id: item.id,
        type: item.type,
        question: item.question,
        ans: item.ans,
        inputValues: item.inputValues || [],
        datetime: item.datetime || null
      };
      arrayOfFormsData.form.push(formModelData);
    }
  }
  return new ArrayOfForms(arrayOfFormsData);
}


//Routes
app.get('/',(req,res) =>{
    res.status(200).send("HELLO ME!!! ")
})


app.get('/forms', async (req, res) => {
  try {
    const ArrayOfFormsDB = await ArrayOfForms.find({});
    res.status(200).send(ArrayOfFormsDB)
  }
  catch (err) {
    console.log(err);
    res.status(500).send("NO CARDS FOUND");
  }
})

app.get('/forms/:id', async (req, res) => {
  try{
    const result = await ArrayOfForms.findById(req.params.id);
    res.status(200).send(result);
  }catch(error){
    res.status(200).send("No form with this ID is found");
  }
})

app.put('/forms/:id', async (req, res) => {
  try{
    const result = await ArrayOfForms.findById(req.params.id);
    res.status(200).send(result);
  }catch(error){
    res.status(200).send("No form with this ID is found");
  }
})

app.post('/forms/:id', async (req, res) =>{
  try{
    const result = await ArrayOfForms.findByIdAndUpdate(req.params.id, {...req.body})
    res.status(200).send("Data stored");
  }catch(error)
  {
    console.log('error',error);
    res.status(500).send('Error while Update')
  }
})
// Route to receive JSON data and store it in MongoDB
app.post('/createForm', async (req, res) => {
  try {
    const receivedData = createArrayOfFormsFromJson(req.body); 
    
    // Create a new document in MongoDB
    const newData = new ArrayOfForms(receivedData);
    const savedData = await newData.save();

    res.status(201).send(savedData._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/deleteAll', async (req, res) =>{
  try{
    const result = await ArrayOfForms.deleteMany({})
    console.log('Deleted', result.deletedCount, 'documents');
    res.status(200).send({ message: `Deleted ${result.deletedCount} documents` });
  }catch(error){
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'An error occurred while deleting documents' });
  }
})

//listener
app.listen(port, () => 
console.log(`listening on localhost: ${port}`));
