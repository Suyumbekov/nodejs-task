const express = require('express');
const http = require('http');
const fs = require('fs');
const format = require('node.date-time');

function logTime(){
  return new Date().format("Y-M-d H:M:S")+' ';
}

const server = express();

server.set('view engine','ejs');

server.listen(3000);

let blogs = [];
let phrases = [];
let flags = [false,false]

const req1 = http.get('http://slowpoke.desigens.com/json/1/7000', res =>{
    flags[0]=true;
    res.on('data', d =>{
      blogs=JSON.parse(d);  
      
    }); 
    
});


req1.on('error', e =>{
  fs.appendFile('readme.log', logTime() + e + '\n', function(err,data){
    if(err)
     console.log(err);
  });
})

const req2 = http.get('http://slowpoke.desigens.com/json/2/3000', res => {
  flags[1]=true;
  res.on('data', d =>{
    phrases=JSON.parse(d);
  })
})

req2.on('error', e =>{
  fs.appendFile('readme.log', logTime() + e + '\n', function(err,data){
    if(err)
     console.log(err);
  });
})

setTimeout(function(){
  if(!flags[0]){
  const blogs=[{title: "не дождались новостей"}];
   fs.appendFile('readme.log', logTime() + "не дождались новостей" + '\n', function(err,data){
     if(err)
      console.log(err);
   });
   if(!flags[1]){
     const phrases=["не дождались фраз"];
      fs.appendFile('readme.log', logTime() + "не дождались фраз" + '\n', function(err,data){
        if(err)
         console.log(err);
      });
   }
  
}

},6000)

server.get('/',(req,res) =>{
    
  res.render('news',{blogs, phrases});

})
