const express = require('express');
const session = require('express-session')
const vkApiService = require('./vkApiService')

const app = express();

app.use(session({ 
  secret: '8db7e8fe-b14a-4db3-97a2-3fb71685a932', 
  resave: false, 
  saveUninitialized: true
}))

app.use('/js', express.static('public/js'));
app.use('/pages', express.static('public/pages'));

app.get('/', async (req, res) => {
    let sess = req.session
    if( sess.accessToken ){

        let group = await vkApiService.getFirstGroup(sess.accessToken);
        console.log('group', group);

    } else {

        let accessToken = await vkApiService.getAccessToken();
        console.log('accessToken', accessToken);
        
      // res.redirect(url);
      // res.redirect(vkApiService.getAuthUrl());
    }

});

app.listen(3000, () =>  console.log('Server started on port 3000'));