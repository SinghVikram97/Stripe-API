const express=require('express');
const stripe=require('stripe')('sk_test_3brRkDrLyc5dBgxxuuiqRP4S');
const bodyParser=require('body-parser');
const cors=require('cors');
const exphbs=require('express-handlebars');

const app=express();

// Handlebar middleware
app.engine('handlebars',exphbs({
  defaultLayout:'main'
}))
app.set('view engine','handlebars');

// Cross Origin request middleware
app.use(cors());

// BodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/',(req,res)=>{
  res.render('index');
})

const port=process.env.PORT || 5555

app.listen(port,()=>{
  console.log("Server started on http://localhost:5555");
})