const express = require('express');
const session = require('express-session');
const querystring = require('querystring'); 
const vkApiService = require('./vkApiService');


const app = express();

app.use(session({
  secret: '8db7e8fe-b14a-4db3-97a2-3fb71685a932',
  resave: false,
  saveUninitialized: true
}))

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/pages', express.static('public/pages'));

app.get('/', async (req, res) => {
    let sess = req.session;

    if (sess.accessToken){
        let news = await vkApiService.getNews(sess.accessToken);
        sess.news = news;
        res.redirect('/pages/news.html');
        res.end();
    }

    if (!sess.code){
        vkApiService.setAuthCode(req, res, sess);
    }

    if (!sess.accessToken && sess.code){
        let accessToken = await vkApiService.getAccessToken(sess.code);
        if (accessToken){
            sess.accessToken = accessToken;
            let news = await vkApiService.getNews(sess.accessToken);
            sess.news = news;
            res.redirect('/pages/news.html');
            res.end();
        }
        else {
            //maybe code expired
            sess.code = null;
        }
    }

});

app.get('/pages/news.html', async (req, res) => {
    if (!req.session.news){
        res.redirect('/')
    }
});

app.post('/getNews', async (req, res) => {
    let sess = req.session;
    res.send(sess.news);
});

app.listen(3000, () =>  console.log('Server started on port 3000'));