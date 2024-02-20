//פונקציה להצגת המבזקים בדף
function fetchNews(url, siteIcon, siteName,userName) {
        fetch(`/news?url=${url}&siteName=${siteName}&userName=${userName}`)
            .then(response => response.json())
            // הצגת המבזקים בדף
            .then(data => {
                console.log(data);
                const newsContainer = document.getElementById('news_container');
                newsContainer.innerHTML = ''; // ניקוי הדף לפני הוספת המבזקים

                data.items.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news_item');

                    const title = document.createElement('a');
                    title.href = item.link;
                    title.innerHTML = item.title;

                    const pubDate = document.createElement('p');
                    pubDate.innerHTML = ` פורסם ב: ${new Date(item.pubDate).toLocaleString()}`;

                    const description = document.createElement('p');
                    description.textContent = item.description;

                    newsItem.appendChild(title);
                    newsItem.appendChild(pubDate);
                    newsItem.appendChild(description);

                    newsContainer.appendChild(newsItem);
                });

                // שמירת שם האתר הנבחר בlocal storage
                localStorage.setItem('SiteName', siteName);
                // הצגת אייקון האתר הנבחר בדף
                const icPage = document.querySelector('#page_ic');
                icPage.style.backgroundImage = `url('${siteIcon}')`;

            })
            .catch(error => console.error('Error fetching news:', error));
    // }
}
//פונקציה לשליפת האתר הנבחר מהמשתמש
function selectSite(selectTag,userName) {
        const selectedOption = selectTag.options[selectTag.selectedIndex];
        const selectedUrl = selectedOption.value;
        const selectedIcon = selectedOption.getAttribute('data-icon');
        const selectedName = selectedOption.innerHTML;
        const newsContainer = document.querySelector('#news_container');
            newsContainer.style.backgroundImage = `url("")`;
    if(userName){
        fetchNews(selectedUrl, selectedIcon, selectedName,userName);
    }else{
        fetchNews(selectedUrl, selectedIcon, selectedName,"מישהו ");
    }
}
// פונקציה לבחירת אתר מה Local Storage
function selectSiteFromStorage() {
    let userName = localStorage.getItem('userName');
    const storedSiteName = localStorage.getItem('SiteName');
    const selectedSite = document.querySelector('#siteSelect');
    if (storedSiteName) {
        // מצא את ה-option של ה-site ששמור ב-local storage
        const optionToSelect = Array.from(selectedSite.options).find(option => option.innerHTML === storedSiteName);
        if (optionToSelect) {
            // בצע בחירה אוטומטית בתגית select
            optionToSelect.selected = true;
            // קרא לפונקציה שמציגה את המבזקים
            selectSite(selectedSite,userName);
        }
    }
}
// setTimeout(selectSiteFromStorage,4000);
selectSiteFromStorage();