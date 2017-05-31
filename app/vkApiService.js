const axios = require('axios');

const appId = 6046074;
const secretKey = '5fboXlMP6qvjw8BiLIvC'; // <-- PUT ACTUAL KEY HERE

function getAccessToken(code) {
    const promise = axios.get('https://oauth.vk.com/access_token', {
        params: {
            client_id: appId,
            client_secret: secretKey,
            redirect_uri: 'http://localhost:3000',
            code,
        },
    })
    .then((res) => {
        if (res.data.access_token) {
            return res.data.access_token;
        }
        console.error(res.data);
        return null;
    })
    .catch((err) => {
        console.error('Error in getAccessToken', err);
        return null;
    });

    return promise;
}

async function getFirstGroup(accessToken) {
    const promise = axios.get('https://api.vk.com/method/groups.get', {
        params: {
            access_token: accessToken,
            count: 1,
            extended: 1,
        },
    })
    .then((res) => {
        if (res.data.response) {
            return res.data.response[1];
        }
        return null;
    })
    .catch((err) => {
        console.error('Error in getFirstGroup', err);
        return null;
    });

    return promise;
}

async function getMessages(accessToken, groupId, countParam) {
    const count = countParam || 5;
    const promise = axios.get('https://api.vk.com/method/wall.get', {
        params: {
            access_token: accessToken,
            owner_id: `-${groupId}`,
            count,
        },
    })
    .then((res) => {
        if (res.data.response) {
            const max = res.data.response[0] < count ? res.data.response[0] : count;
            const result = [];
            for (let i = 1; i <= max; i++) {
                const attachments = res.data.response[i].attachments;
                const photos = [];
                for (let j = 0; j < attachments.length; j++) {
                    for (const key in attachments[j]) {
                        if (/^photo/.test(key)) {
                            photos.push({
                                src: attachments[j][key].src_big || attachments[j][key].src,
                            });
                        }
                    }
                }

                result.push({
                    text: res.data.response[i].text,
                    photos,
                });
            }
            return result;
        }
        console.error(res.data);
        return null;
    })
    .catch((err) => {
        console.error('Error in getMessages', err);
        return null;
    });

    return promise;
}

async function getNews(accessToken) {
    const group = await getFirstGroup(accessToken);
    const news = await getMessages(accessToken, group.gid);
    // news.name = group.name;
    // news.photo = group.photo;
    return news;
}

function getLoginUrl() {
    const url = `https://oauth.vk.com/authorize?client_id=${appId}&display=page&redirect_uri=http://localhost:3000&scope=groups&response_type=code`;
    return url;
}

function getAuthCode(req, res, session) {
    if (req.query.code) {
        return req.query.code;
    }

    if (!session.code) {
        const url = getLoginUrl();
        res.redirect(url);
        res.end();
    }

    return null;
}

module.exports = {
    getAccessToken,
    getAuthCode,
    getNews,
};
