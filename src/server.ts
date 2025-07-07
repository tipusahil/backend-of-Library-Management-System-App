
import app from "./app";

import configEnvVariable from "./config/envVariable";
import mongoose, { mongo } from "mongoose";





const MainFunc = async () =>
    {

try{

// const url1 = configEnvVariable.database_url;// way-1..
const url2 = process.env.DATABASE_URL;// way-2

await mongoose.connect(url2 as string)
.then(() => console.log("🟢 MongoDB connected"))
.catch((err) => console.error("🔴 MongoDB connection failed:", err));


// -------server listening korar agei database er sate connect hote hoi,nahoi deploy korar pore dta get korar somoy data kuje pawa jabena.--------
const server1  =  app.listen(configEnvVariable.port,()=>{
    console.log(`server successfully run on port = ${configEnvVariable.port} ✅`);
})


}
 catch(error){
console.log("⚠️database connection issue: ",error);
};
};


MainFunc();
// MainFunc().catch((error)=>console.log(error));