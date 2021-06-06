const express = require('express')
const mongoose = require('mongoose')
const Cards = require('./dbCards')
const cors = require('cors')
//App config
const app = express();
const PORT = process.env.PORT || 8001
const connect_url = process.env.CONNECTION_URL
//middlewares
app.use(express.json())
app.use(cors())
//DB config
mongoose.connect(connect_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
//API endpoints
app.get('/',(req,res)=>res.status(200).json({
    success:true
}))

app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard,(err, data)=>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(201).send(data)
            
        }
    })
})
app.get('/tinder/cards',(req,res)=>{

    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
            
        }
    })
})
//Listener
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))