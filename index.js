const express = require('express')
const app=express();
const users = require('./users.json')
const fs = require('fs');
app.use(express.json())
app.get('/',(req,res)=>{
    res.end ("<h1>WELCOME...</h1>")
})
app.get('/users',(req,res)=>{
    // IN REAL PROJECT WE WILL FETCH THE DATA FORM THE DATABASE
    res.json(users)
}) 
app.post ('/add/user',(req,res)=>{
    console.log(req.body);
    users.push(req.body)
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("error...")
        }else{
            console.log("data added successfully...")
        }
    })
    res.end("ADD SUCCESFULLY")
})
app.get("/user/:id",(req,res)=>{
    let id = req.params.id;
    console.log(id);
    let user = users.find((user)=> user.id === parseInt(id));
    res.json(user);
})
//localhost:user/update/30
app.put('/user/update/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id)
    let index = users.findIndex((user)=> user.id == parseInt(id));
    console.log(index,'index');
    users[index].first_name='garv'
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("err...")
        }else{
            console.log("server is running at 3000...")
        }
    })
    res.end("updated successfully...");
})

app.delete('/user/delete/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id)
    let index = users.findIndex((user)=> user.id == parseInt(id));
    console.log(index,'index');
    users.splice(index,1);
    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log("err...")
        }else{
            console.log("server is running at 3000...")
        }
    })
    res.end("updated successfully...");
})

//http://localhost:3000/user/delete/2
// app.delete('user/delete/:id',(req,res)=>{
//     let id = req.params.id;
//     let index = users.findIndex((user)=> user.id == parseInt(id));
//     if(index>-1){
//         console.log(index,'index');
//     users.splice(index,1);
//     fs.writeFile('users.json',JSON.stringify(users),(err)=>{
//         if(err){
//             console.log("err...")
//         }else{
//             console.log("data added successfully..")
//         }
//         res.end("data deleted");
//     })
//     }else {
//         res.end('data not found...')
//     }
// })
app.listen(3000,(err)=>{
    if(err){
        console.log("err...")
    }else{
        console.log("server is running at 3000...")
    }
})