import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors'
import ArrayofForms from './formModels.js';

//App config
const app = express();
const port = process.env.PORT || 8000
const connection_url = 'mongodb+srv://our-first-user:muY2VV2o8x48lML3@ranavijaycluster.58sli.mongodb.net/formdb?retryWrites=true&w=majority'

//Middlewares
app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

app.get('/',(req,res) =>{
    res.status(200).send("HELLO ME!!! YOU ARE DOING GOOD")
})

app.use(express.json());

// Route to receive JSON data and store it in MongoDB
app.post('/createForm', async (req, res) => {
  try {
    const {  } = req.body; // Assuming your JSON data has "name" and "age" fields
    
    // Create a new document in MongoDB
    const newData = new DataModel({ name, age });
    await newData.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => 
console.log(`listenong on localhost: ${port}`));