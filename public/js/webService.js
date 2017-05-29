"use strict"
var webService = (function(){

    return webService = {
        getNews: getNews
    }

    function getNews(){
        return axios.post('http://localhost:3000/getNews')
        .then( res => {
            return res.data;
        });
    }

})();