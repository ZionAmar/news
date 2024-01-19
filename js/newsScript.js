
// Assume you are fetching data using fetch API
function news() {
    fetch('/news')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.items.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');

                const title = document.createElement('a');
                title.href = item.link;
                title.textContent = item.title;

                const pubDate = document.createElement('p');
                pubDate.textContent = `Published on: ${new Date(item.pubDate).toLocaleString()}`;

                const description = document.createElement('p');
                description.textContent = item.description;

                newsItem.appendChild(title);
                newsItem.appendChild(pubDate);
                newsItem.appendChild(description);

                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error(error));
}
news();
setTimeout(news,6000);