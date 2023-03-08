import mongoose from 'mongoose';

const connectDB =  (url) =>{
  mongoose.set('strictQuery', true); //esta parte de codigo es para poder hacer consultas, posiblemente con regex

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    }).then((con) => console.log(`mongodb conectado,host: ${con.connection.host}`))
    .catch((err) => console.log(err))
}

export default connectDB;
