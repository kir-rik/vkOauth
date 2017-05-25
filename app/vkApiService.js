var fetch = require('node-fetch');

async function getAccessToken(){
    const app_id = 6046074;
    let url = `https://oauth.vk.com/authorize?client_id=${app_id}&display=popup&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token`;
    let promise = fetch(url)
    .then(res => {
        // console.log(res.headers.raw());
        // console.log(res.headers.get('content-type'));
        console.log('cookie', res.json());
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


async function getMessages(accessToken, groupId){
    let url = `https://api.vk.com/method/wall.get?owner_id=${groupId}&count=5&access_token=${accessToken}`
    let group = fetch(url)
    .then(messages => messages)
    .catch(err => {
        console.error('Error in getMessages', err);
        throw null;
    });

    return group;
}


module.exports = {
    getAccessToken: getAccessToken,
    getFirstGroup: getFirstGroup,
    getMessages: getMessages
}