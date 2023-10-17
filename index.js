//The password is Humanbynn

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app= express();
const port= 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var userAuthorisation=false;

function checkPassword(req,res,next){
  const password = req.body["password"];
  if (password === "Humanbynn") {
    userAuthorisation = true;
  }
  next();
};

app.use (bodyParser.urlencoded({extended:true}));

app.use (checkPassword);

app.get ("/", (req, res)=>{
    res.sendFile (__dirname + "/public/index.html");
});

app.post ("/check", (req,res)=>{
    if (userAuthorisation){
    res.sendFile (__dirname + "/public/secret.html");
    }
    else {
     res.redirect("/");
     console.log ("incorrect Password")
    }
});

app.listen(port,()=>{
console.log(`Listening on port ${port}`);
});