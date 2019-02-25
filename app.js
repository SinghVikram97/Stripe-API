const express=require('express');
const stripe=require('stripe')('sk_test_3brRkDrLyc5dBgxxuuiqRP4S');
const bodyParser=require('body-parser');
const cors=require('cors');
const exphbs=require('express-handlebars');

const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('Hi');
})

const port=process.env.PORT || 5555

app.listen(port,()=>{
  console.log("Server started on http://localhost:5555");
})