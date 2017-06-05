'use strict';

function ready() {
    const container = document.getElementById('news-container');
    container.classList.add('wall_text');
    window.webService.getNews()
    .then((news) => {
        if (!news) {
            window.location.href = '/';
        }
        for (let i = 0; i < news.length; i++) {
            const outerDiv = document.createElement('div');
            outerDiv.classList.add('post');

            const header = document.createElement('div');
            header.innerHTML = news.name;

            const body = document.createElement('div');
            body.innerHTML = `${news[i].text}<br/>`; // find urls and anchor it

            // outerDiv.appendChild(header);
            outerDiv.appendChild(body);
            if (news[i].photos) {
                for (let j = 0; j < news[i].photos.length; j++) {
                    const img = document.createElement('img');
                    img.src = news[i].photos[j].src;
                    outerDiv.appendChild(img);
                }
            }

            container.appendChild(outerDiv);
        }
    });
}

document.addEventListener('DOMContentLoaded', ready);
