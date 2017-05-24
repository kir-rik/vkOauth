var express = require('express');
var session = require('express-session')

var app = express();

app.use(session({ 
  secret: '8db7e8fe-b14a-4db3-97a2-3fb71685a932', 
  resave: false, 
  saveUninitialized: true
}))

// app.use(express.static('public'));
app.use('/js', express.static('public/js'));
app.use('/pages', express.static('public/pages'));

app.get('/', async (req, res) => {
    var sess = req.session
    if (sess.views) {
      sess.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + sess.views + '</p>')
      // res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {  
      console.log('new session!');
      sess.views = 1
      res.end('welcome to the session demo. refresh!')
    }
});

// app.get('/auth', async (req, res) => 
//   auth()
// );

app.listen(3000, () =>  console.log('Example app listening on port 3000!'));


// var client_id = 6046074;
// var url = `https://oauth.vk.com/authorize?client_id=${client_id}&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token`

// function auth(){
//   fetch(url).then( _ => console.log(_) );
// }