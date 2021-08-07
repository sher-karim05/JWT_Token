const express  = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api',(req,res)=>{
  res.json({
      message: 'Welcome to the API'
  });

})
  app.post('/api/posts',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secrectkey',(err, authData)=>{
      if(err){
        res.sendStatus(403)
      }else{
        res.json({
          message: 'Post Created...',
          authData
        })
      }
    });
  })
  
  app.post('/api/login', (req,res)=> {
    //Mock User
    const user = {
      id: 1,
      username: 'sher karim',
      email: 'karimdeveloper12@gmail.com'
    }
    jwt.sign({user}, 'secretkey',(err, token)=>{
      res.json({
        token
      })
    })
  })

  // verify Token
  function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.header['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
      // //Split at the space
      const bearer  =  bearerHeader.split(' ');

      // //get token from array
      const bearerToken = bearer[1];
      // //Set the token 
      req.token = bearerToken
      // Next middleware
      next();

    }else{ 
      res.sendStatus(403);
    }
   }
      app.listen(5000, ()=>console.log('Server is listening at port 5000'));
