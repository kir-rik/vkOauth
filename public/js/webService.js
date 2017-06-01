'use strict';

window.webService = (function () {
    function getNews() {
        return axios.post('http://localhost:3000/getNews')
        .then(res => res ? res.data : null);
    }

    const api = {
        getNews,
    };
    return api;
}());
