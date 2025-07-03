
import app from "./app";
import { Server } from "http";
import configEnvVariable from "./config/envVariable";
import mongoose, { mongo } from "mongoose";



const server1 :Server =  app.listen(configEnvVariable.port,()=>{
    console.log(`server successfully run on port = ${configEnvVariable.port} ✅`);
})

const MainFunc = async () =>
    {

try{

// const url1 = configEnvVariable.database_url;// way-1
const url2 = process.env.DATABASE_URL;// way-2

await mongoose.connect(url2 as string)
.then(() => console.log("🟢 MongoDB connected"))
.catch((err) => console.error("🔴 MongoDB connection failed:", err));

}
 catch(error){
console.log("⚠️database connection issue: ",error);
};
};


MainFunc();
// MainFunc().catch((error)=>console.log(error));