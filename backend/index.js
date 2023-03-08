import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));//en este caso ese limite es para las fotos que traiga dall-e

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req, res) =>{
  res.send('hola mundo');
});

//const database = process.env.MONGODB_URL;
const startServer = () =>{

  try{
    connectDB(process.env.MONGODB_URI);
    app.listen(8000, ()=> console.log(`server iniciado en el puerto ${8000}`))
  } catch (error){
    console.log(error)
  }
  
}

startServer();
