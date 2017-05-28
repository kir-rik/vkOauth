var webService = (function(){
    return webService = {
        auth: auth,
        test: test
    }

    function auth(){
        fetch('http://localhost:3000', _ => console.log(_));
    }

    function test(){
        console.log('azzazaza');
        fetch('http://localhost:3000', _ => console.log(_));
    }


})();