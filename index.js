const express=require('express');
const app=express();
const port=80;
const mongoose=require('mongoose');
const path=require("path");
main().catch(err=> console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost/login');
}
const loginSchema= new mongoose.Schema({email:String,
    password:String });
const id=mongoose.model('login',loginSchema);
app.use('/static',express.static('static'))
app.use(express.urlencoded());
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));

})
app.post('/',(req,res)=>{
    console.log(req.body.password);
    id.find({name:`${req.body.email}`},(err,foods)=>{
        console.log(foods[0].password)
        if( foods[0].password ==req.body.password)
        {
            res.send("Success");
        }
        else{
            res.send("Invalid sign in");
        }
    });

      //id.find({name:`${req.body.email}`},function (err,foods){
      //  console.log("done");
        //  if(err) return console.error(err);
        //  if(foods.password==req.body.password)
//console.log("access given");
      //});
});
app.listen(port,()=>{
    console.log(`the application started succesfully on ${port}`);
})
