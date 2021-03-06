import express from 'express'
import jwt from 'jsonwebtoken'
import { type } from 'os';
const app = express();

//Create a get request

app.get('/api',(req,res)=>{
    res.json({
          message: "Welcome to API Authentication!!"    
    })
})

// Create post request

app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=> {
  if(err){
      res.sendStatus(403);
  }else{
    res.json({
        message: "Post request success!",
        authData    
    });
}
});
});

//Create login request

app.post('/api/login',(req,res)=>{
    //Mock user
    const user = {
        id: 1,
        username: 'sher karim',
        email: 'karimdeveloper12@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err, token)=> {
        res.json({
             token
        })
    })
})

//Verify Token
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');

        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}
app.listen(5000,()=>console.log(`Server is listening at port 5000`))