var fetch = require('node-fetch');


function getAccessToken(code){
    const app_id = 6046074;
    //let secretKey = 'Put your key here';
    let secretKey = 'OpA4NGNSqooxW1fG1ezX';
    let url = `https://oauth.vk.com/access_token?client_id=${app_id}&client_secret=${secretKey}&redirect_uri=http://localhost:3000&code=${code}`;
    // console.log('getAccessToken, url: ', url);
    let promise = fetch(url)
    .then(res => {
        console.log('access token fetched with status ', res.status);
        var data = JSON.parse(res.data);
        if (data.access_token){
            return data.access_token;
        } else {
            console.log(data);
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
    let url = `https://api.vk.com/method/groups.get?count=1&access_token=${accessToken}`;
    let group = fetch(url)
    .then(group => group)
    .catch(err => {
        console.error('Error in getFirstGroup', err);
        throw null;
    });

    return group;
}

async function getMessages(accessToken, groupId, count){
    count = count || 5;
    let url = `https://api.vk.com/method/wall.get?owner_id=${groupId}&count=${count}&access_token=${accessToken}`
    let group = fetch(url)
    .then(messages => messages)
    .catch(err => {
        console.error('Error in getMessages', err);
        throw null;
    });

    return group;
}

function setAuthCode(req, res, session){
    if (req.query.code){
        console.log('GET CODE! :))))) ', req.query.code);
        session.code = req.query.code;
    }

    if (!session.code){
        console.log('NO CODE! :(((((( ');
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
    getFirstGroup: getFirstGroup,
    getMessages: getMessages
}