
function toggleMenu(){
    let el=document.getElementById("overlay");
    console.log("toggle",el.style.display);
    let isOn=(el.style.display!="block")?false:true;
    if(isOn){
        el.style.display="none";
        close_menu();
    } else {
        el.style.display = "block";
        document.querySelector(".menu-card").style.display = "block";
        open_menu();
    }
}
function open_menu(){
    document.querySelector('#menu').innerHTML =" X";
    document.querySelector('#menu').style.color="black";
    document.querySelector('#menu').style.fontSize="30px";
    document.querySelector('.menu-card').innerHTML =
        "            <h2>תפריט</h2><br>\n" +
        "        <p onclick=\"addUserName()\"></p>\n" +
        "        <p onclick=\"toggleColor()\">בחירת עיצוב</p>\n" +
        "        <p onclick=\"moreApp()\">עוד אפליקציות שלנו</p>\n" +
        "        <p onclick=\"showAbout()\">אודות</p>\n" +
        "        <p onclick=\"sendMail()\">משוב</p>\n"
    showUserName();
}
function close_menu(){
    let Name = localStorage.getItem("userName");
    if(Name) {
        document.querySelector('#news_container > div').innerHTML = `שלום ${Name} בחר אתר לצפיה`;
    }
    document.querySelector('#menu').innerHTML =`<div class="menu-item"></div><div class="menu-item"></div><div class="menu-item"></div>`;
}
function addUserName() {
        let userName = prompt("הכניסו את שמכם:");
        if (userName == "" || userName.length > 7) {
            alert("שם ארוך או קצר מידי");
        } else {
            localStorage.setItem("userName", userName);
            showUserName();
        }
}
function showUserName(){
    let Name = localStorage.getItem("userName");
    if(Name){
    //     console.log(Name);
        document.querySelector('.menu-card > p').innerHTML=`שלום ${Name}`;
    }
    else {
        document.querySelector('.menu-card > p').innerHTML=`שלום אורח/ת`;

    }
}
function loadUserName(){
    let Name = localStorage.getItem("userName");
    let siteName = localStorage.getItem("siteName");
    if(Name) {
        if ((siteName === "בחר אתר")||(!siteName))
            document.querySelector('#news_container > div').innerHTML = `שלום ${Name} בחר/י אתר לצפיה`;
    }
}
loadUserName();
function sendMail(){
        // כתובת המייל שבה נרצה לשלוח
        var emailAddress = 'zion0549774827@gmail.com';

        // בניית ה-URL עבור חלון הדוא"ל
        var mailtoUrl = 'mailto:' + emailAddress;

        // פתיחת חלון פופ-אפ עם הודעת המייל
        window.open(mailtoUrl);

}
function moreApp(){
        var url = 'https://ez4tackit.com';

        // פתיחת חלון פופ-אפ עם הודעת המייל
        window.open(url);

}
function showAbout(){
    document.querySelector(".menu-card").innerHTML ="<h2>אודות</h2><br>"+ "<p style='border-bottom: none'>זאת אפליקציה שנוצרה בזמני הפנוי בלימודי תוכנה שנה ב' בכדי לשפר כתיבת קוד נכונה. האפליקציה נותנת מבזקים קצרים מאתרים לבחירה . </p>"+"<p>ניתן גם לראות את מזג האויר להוסיף את שמכם ולשנות תצוגה. ניתן לצפות בעוד אפליקציות שלנו.(מתעדכן).והכי חשוב תנו משוב וכך נשתפר..</p>"
}