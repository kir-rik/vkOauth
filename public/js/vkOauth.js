document.addEventListener("DOMContentLoaded", function(event) {    
    (function(){
        
        // localStorage.setItem('isAuth', false);
         var authButton = document.getElementById('auth-button-id');


        // var userNameElem = document.getElementById('user-name-id');
        // var twitsContainer = document.getElementById('twits-container-id');

        // isAuth().then( result =>{
        //     if ( result.isAuth ){

        //         unauthView.style.display = 'none';
        //         authView.style.display = 'block';

        //         webService.getTwits()
        //         .then( data =>
        //             {
        //                 userNameElem.innerText = data.userName;
        //                 twitsContainer.innerHtml = data.twits;
        //             }
        //         ).catch( error => {});
        //     } else {
        //         unauthView.style.display = 'block';
        //         authView.style.display = 'none';
        //     }
        // });

        // function isAuth(){
        //     var isAuth = localStorage.getItem("isAuth");
        //     return new Promise( ( resolve, reject ) => resolve( { isAuth: isAuth == 'true' } ) )
        // };

        window.vkOauth = {
            auth: webService.auth
        };
    })();

});