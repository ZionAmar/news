function changeColor() {
    let header = document.querySelector("#header");
    let weather = document.querySelector("#weather-banner");
    let news = document.querySelector("#news_container");
    let temp = document.querySelector("#weather-info");
    let menu = document.querySelector("#overlay");
    let zion = document.querySelector("#zion");
    let TxtZion = document.querySelector("#zion > a");

    if (localStorage.getItem("color") === "pink") {
        menu.style.backgroundColor = "rgb(175, 76, 149)";
        header.style.backgroundColor = "rgb(175, 76, 149)";
        zion.style.backgroundColor = "rgb(175, 76, 149)";
        weather.style.backgroundColor = "rgb(175, 76, 149)";
        news.style.backgroundColor = "rgb(255, 195, 237)";
        temp.style.color = "rgb(254, 230, 253)";
        TxtZion.style.color = "rgb(254, 230, 253)";
        localStorage.setItem("color", "pink");
    } else if (localStorage.getItem("color") === "blue") {
        menu.style.backgroundColor = "rgb(76, 99, 175)";
        header.style.backgroundColor = "rgb(76, 99, 175)";
        zion.style.backgroundColor = "rgb(76, 99, 175)";
        weather.style.backgroundColor = "rgb(76, 99, 175)";
        news.style.backgroundColor = "rgb(195, 219, 255)";
        temp.style.color = "rgb(230, 237, 254)";
        TxtZion.style.color = "rgb(230, 237, 254)";
        localStorage.setItem("color", "blue");
    } else {
        // אם הצבע הוא לבן או שלא נקבע צבע
        menu.style.backgroundColor = ""; // ערך ברירת המחדל
        header.style.backgroundColor = ""; // ערך ברירת המחדל
        zion.style.backgroundColor = ""; // ערך ברירת המחדל
        weather.style.backgroundColor = ""; // ערך ברירת המחדל
        news.style.backgroundColor = ""; // ערך ברירת המחדל
        temp.style.color = ""; // ערך ברירת המחדל
        TxtZion.style.color = ""; // ערך ברירת המחדל
        localStorage.setItem("color", "white"); // או כל ערך אחר שאתה מעדיף
    }
}

function toggleColor() {
if (localStorage.getItem("color") === "pink") {
    localStorage.setItem("color", "blue");
    changeColor();
    } else if (localStorage.getItem("color") === "blue") {
    localStorage.setItem("color", "white");
    changeColor();
    }else{
    localStorage.setItem("color", "pink");
    changeColor();
}
}
changeColor();
