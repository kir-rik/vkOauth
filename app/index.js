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
    let sess = req.session;

    if (sess.accessToken){
        console.log('/root, HAVE TOKEN!!! :)))))) ', sess.accessToken)
        res.redirect('/pages/news');
        res.end();
    }

    console.log('/root, NO TOKEN! :((((((( ')

    if (!sess.code){
        vkApiService.setAuthCode(req, res, sess);
    }

    if (!sess.accessToken && sess.code){
        //let accessToken = await 
        vkApiService.getAccessToken(sess.code)
        .then( _ => sess.accessToken = _ );
        // res.redirect('/news');
        // res.end();
    }

});

app.get('/news', async (req, res) => {
    let sess = req.session;
    console.log('/news, NO TOKEN! :((((((( ')
    if (!sess.accessToken){
        res.redirect('/');
        res.end();
    }
    console.log('/news, HAVE TOKEN!!! :)))))) ', sess.accessToken)
    // console.log('HAVE TOKEN!!! :)))))) ', sess.accessToken)
    // let group = await vkApiService.getFirstGroup(sess.accessToken);
    // console.log('group', group);
    // let news = await vkApiService.getMessages(sess.accessToken, group.Id);
    // console.log('group', group);
});


app.listen(3000, () =>  console.log('Server started on port 3000'));