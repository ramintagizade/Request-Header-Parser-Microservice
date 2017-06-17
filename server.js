var express = require('express');
var app = express();
app.use(express.static('public'));
app.use('/api/whoami',function (req,res){
  var ip = req.headers['x-forwarded-for']!=null ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;
  var language = req.headers["accept-language"].split(',')[0];
  var user = (req.headers['user-agent']);
  var software = "";
  var ok = false;
  for(var i=0;i<user.length;i++){
    if(user[i]=='(') {
      ok = true;
    }
    else if(user[i]==')'){
      break;
    }
    else if(ok){
      software+=user[i];
    }
  }
  var json = {"ipaddress":ip,"language":language,"software":software};
  res.end(JSON.stringify(json));
});
app.listen(8080);
