import mongoose from "mongoose";

export async function dbConnect(){
   try {
    mongoose.connect(process.env.CONNECTION_STRING);
    const connection = mongoose.connection;
    connection.on("connected",() =>{
        console.log("Connected to the database.");
    })

    connection.on("error",() =>{
        console.log("Error occurred...");
    })
   } catch (error) {
    console.log("Couldnot connect to the database...");
    console.log(error);
   }
}