const express = require('express');
const session = require('express-session');
const vkApiService = require('./vkApiService');

const app = express();

app.use(session({
    secret: '8db7e8fe-b14a-4db3-97a2-3fb71685a932',
    resave: false,
    saveUninitialized: true,
}));

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/js/axios', express.static('node_modules/axios/dist'));

app.use('/', express.static('public/pages'));

app.get('/', async (req, res) => {
    const sess = req.session;

    if (sess.accessToken) {
        const news = await vkApiService.getNews(sess.accessToken);
        sess.news = news;
        res.redirect('/news.html');
        res.end();
    }

    if (!sess.code) {
        sess.code = vkApiService.getAuthCode(req, res, sess);
    }

    if (!sess.accessToken && sess.code) {
        const accessToken = await vkApiService.getAccessToken(sess.code);
        if (accessToken) {
            sess.accessToken = accessToken;
            const news = await vkApiService.getNews(sess.accessToken);
            sess.news = news;
            res.redirect('/news.html');
            res.end();
        } else {
            // maybe code expired
            sess.code = null;
        }
    }
});

app.get('/news.html', async (req, res) => {
    if (!req.session.accessToken || !req.session.news) {
        // res.send(null);
        res.redirect('/');
    }
});

app.post('/getNews', async (req, res) => {
    const sess = req.session;
    if (sess.accessToken) {
        const news = await vkApiService.getNews(sess.accessToken);
        sess.news = news;
        res.send(sess.news);
    } else {
        res.send(null);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
