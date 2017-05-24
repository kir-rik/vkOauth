var webService = (function(){
    return webService = {
        auth: auth,
        test: test
        // ,getTwits: getTwits
    }

    function auth(){
        fetch('http://localhost:3000', _ => console.log(_));
    }

    function test(){
        console.log('azzazaza');
        fetch('http://localhost:3000', _ => console.log(_));
    }

    // function getTwits(query){
    //     return new Promise( ( resolve, reject ) =>
    //         {
    //             fetch(twitterApiUrl+'/search/tweets.json?q='+query)
    //             .then(function(data){
    //                 try {
    //                     resolve( JSON.parse(data).statuses );
    //                 } catch(ex){
    //                     console.log('getTweets: fail to parse responce.', ex);
    //                     reject( [] );
    //                 } 
    //             })
    //             .catch(function(err){
    //                 console.log('getTweets: request faild.', err);
    //                 reject( [] );
    //             });  
    //         }
    //     );
    // }


})();