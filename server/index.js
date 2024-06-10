const express =require("express");
const users = require("./sample.json");
const app=express();
app.use(express.json());
const port=8000;
const cors =require("cors");
const fs =require("fs");

app.use(cors({
    orgin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
}))
app.get("/users",(req,res)=>{
    return res.json(users);

});

//Delete user details
app.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let filteredUsers=users.filter((user)=> user.id !== id);
fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data)=>{
    return  res.json(filteredUsers);
  
})
});


// add new user
app.post("/users",(req,res)=>{
    let {firstName,lastName,location,education,about,day,month,year,email}=req.body;
    if(!firstName || !lastName || !location || !education|| !about||!day||!month||!year ||!email){
    res.statusCode(400).send({
        message:"ALL field required"
    });
    }
    let id=Date.now();
users.push({id,firstName,lastName,location,education,about,day,month,year,email});
fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
    return res.json({"message":"user detail added success"});
})
    
});

// app.post("/users",(req,res)=>{
//     let {firstName,lastName,location,education,about,day,month,year}=req.body;
//     if(!firstName || !lastName||!location||!education||!about||!day||!month||!year){
//         res.status(400).send({
//             message:"all fleid required"
//         })
//     }
//     let id=Date.now();
//     users.push({id,firstName,lastName,location,education,about,day,month,year});
//     fs.writeFile("./sample.json",JSON.stringify(filteredUsers),
// (err,data)=>{
//     return res.json({message:"user detail added"});})
//     console.log(err,data)
// });
    




app.listen(port,(err)=>{
    console.log(`app is running  ${port}`);
});
