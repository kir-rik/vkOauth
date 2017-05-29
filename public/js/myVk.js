'use strict'
document.addEventListener("DOMContentLoaded", ready);
function ready(){
    var container = document.getElementById('news-container');
    container.classList.add('wall_text');
    webService.getNews()
    .then(function(news) {
            for (var i = 0; i < news.length; i++) {
                var outerDiv = document.createElement("div");
                outerDiv.classList.add('post');

                var header = document.createElement("div");
                header.innerHTML = news.name;

                var body = document.createElement("div");
                body.innerHTML = (anchorme ? anchorme(news[i].text) : news[i].text) + '<br/>'; //find urls and anchor it

                // outerDiv.appendChild(header);                        
                outerDiv.appendChild(body);
                if (news[i].photos){                                
                    for (var j = 0; j < news[i].photos.length; j++){
                        var img = document.createElement("img");
                        img.src = news[i].photos[j].src;
                        outerDiv.appendChild(img);
                    }
                }

                container.appendChild(outerDiv);
            }
        });
}