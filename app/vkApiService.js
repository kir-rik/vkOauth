// var fetch = require('node-fetch');
var axios = require('axios');
const app_id = 6046074;
const secretKey = 'iqzs9KFLo7vQXe4phzsM';

function getAccessToken(code){

    let promise = axios.get('https://oauth.vk.com/access_token', {
        params: {
            client_id: app_id,
            client_secret: secretKey,
            redirect_uri: 'http://localhost:3000',
            code: code
        }
    })
    .then(res => {
        if (res.data.access_token){
            return res.data.access_token;
        } else {
            console.error(res.data);
            return null;
        }
    })
    .catch(err => {
        console.error('Error in getAccessToken', err);
        return null;
    });

    return promise;
}

async function getFirstGroup(accessToken){
    let promise = axios.get('https://api.vk.com/method/groups.get', {
        params: {
            access_token: accessToken,
            count: 1,
            extended: 1
        }
    })
    .then(res => {
        if (res.data.response){
            return res.data.response[1];
        } else {
            return null;
        }
    })
    .catch(err => {
        console.error('Error in getFirstGroup', err);
        return null;
    });

    return promise;
}

async function getMessages(accessToken, groupId, count){
    count = count || 5
    let promise = axios.get('https://api.vk.com/method/wall.get', {
        params: {
            access_token: accessToken,
            owner_id: `-${groupId}`,
            count: count
        }
    })
    .then(res => {
        if (res.data.response){
            let _count = res.data.response[0] < count ?  res.data.response[0] : count; //in case there is not enough posts
            let result = [];
            for ( let i = 1; i <= _count; i++) {
                var attachments = res.data.response[i].attachments;
                let photos = [];
                for ( let j = 0; j < attachments.length; j++){
                    for(var key in attachments[j]) {
                        if (/^photo/.test(key)){
                            photos.push({
                                src: attachments[j][key].src_big || attachments[j][key].src
                            })
                        }
                    }
                }

                result.push({
                    text: res.data.response[i].text,
                    photos: photos
                });
            }
            return result;
        } else {
            console.error(res.data);
            return null;
        }
    })
    .catch(err => {
        console.error('Error in getMessages', err);
        return null;
    });

    return promise;
}

async function getNews(accessToken){
    let group = await getFirstGroup(accessToken);
    let news = await getMessages(accessToken, group.gid);
    news.name = group.name;
    news.photo = group.photo;
    return news;
}

function setAuthCode(req, res, session){
    if (req.query.code){
        session.code = req.query.code;
    }

    if (!session.code){
        let url = getLoginUrl();
        res.redirect(url);
        res.end();
    }
}

function getLoginUrl(){
    const app_id = 6046074;
    let url = `https://oauth.vk.com/authorize?client_id=${app_id}&display=page&redirect_uri=http://localhost:3000&scope=groups&response_type=code`;
    return url;
}

module.exports = {
    getAccessToken: getAccessToken,
    setAuthCode: setAuthCode,
    getNews: getNews
}