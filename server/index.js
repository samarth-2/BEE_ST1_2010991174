const express=require('express');
const app=express();
const dotenv=require("dotenv");
const mysql=require("mysql");
const bodyParser=require('body-parser');
const cors=require('cors');
const fs=require('fs')


let db = require('./store/db.json');



app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config();






app.get('/get-each',(req,res)=>{
    var roll=req.query.roll;
    console.log(db)
    for(var i=0;i<db.length;i++)
    {
        if(db[i].rollno==roll)
        {
            res.send("exist");
            return;
        }
    }
    res.send("new");
})

app.post('/post-data',(req,res)=>{
    var roll=req.body.roll
    var name=req.body.name
    var address=req.body.address
    var social=req.body.social
    var english=req.body.english
    var chemistry=req.body.chemistry
    var physics=req.body.physics
    var math=req.body.math
    var avg=req.body.avg
    var total=req.body.total
    var img=req.body.img;
    var grade=req.body.grade;
    var ele=
    {
        "rollno":roll,
        "name":name,
        "address":address,
        "social":social,
        "english":english,
        "chemistry":chemistry,
        "physics":physics,
        "math":math,
        "avg":avg,
        "total":total,
        "img":img,
        "grade":grade
    }
    db.push(ele);
    fs.writeFile("./store/db.json",JSON.stringify(db),(err)=>{
        if(err) throw err;
        res.send(false)
    })
    res.send(true)
})


app.get('/getter-all',(req,res)=>{
    res.send(db)
})

app.get('/get-each-info',(req,res)=>{
    var roll=req.query.roll;
    for(var i=0;i<db.length;i++)
    {
        if(db[i].rollno==roll)
        {
            res.send(db[i]);
            return;
        }
    }
    res.send([]);
})

app.post('/post-all',(req,res)=>{
    var rollno=req.body.rollno;
    var name=req.body.name;
    var address=req.body.address;
    var sub1=req.body.sub1;
    var sub2=req.body.sub2;
    var sub3=req.body.sub3;
    var sub4=req.body.sub4;
    var sub5=req.body.sub5;
    var avg=rea.body.avg;
    var total=req.body.total;
    var img=req.body.img;

    db.push(ele);
    fs.writeFile("./store/db.json",JSON.stringify(db),(err)=>{
        if(err) throw err;
        res.send(false)
    })
    res.send(true)
})


const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`listning on port ${port}`);
});
