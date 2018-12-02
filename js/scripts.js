fetch('js/pytania.json').then(response => {
    return response.json();
}).then(pytania => {  
    init(pytania);
});

function init(pytania) {

    const main = document.querySelector("main");

    const hide = (los) => {
        document.querySelector("#media").classList.remove("media_visible");
        document.querySelector("#media").innerHTML = "";
        document.querySelector("#media").style.background = "";
        pytania[los].typ === "img" || pytania[los].typ === "yt" ? main.style.paddingTop = "0" : main.style.paddingTop = "20vh";
    }

    const zwyklePytania = (los) => {
        hide(los);
        document.querySelector("#pytanie").textContent = pytania[los].tekst;
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        document.querySelector("#epoka").textContent = pytania[los].epoka;
    }

    const media = (los) => {
        hide(los);
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        document.querySelector("#epoka").textContent = pytania[los].epoka;
        document.querySelector("#pytanie").textContent = pytania[los].tekst;
        document.querySelector("#media").classList.add("media_visible");
        document.querySelector("#media").style.background = `url(images/${pytania[los].image})`;
    }

    const yt = (los) => {
        hide(los);
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        document.querySelector("#epoka").textContent = pytania[los].epoka;
        document.querySelector("#pytanie").textContent = pytania[los].tekst;
        document.querySelector("#media").classList.add("media_visible");
        let ifrm = document.createElement('iframe');
        ifrm.setAttribute("width", pytania[los].width);
        ifrm.setAttribute("height", pytania[los].height);
        ifrm.setAttribute("src", pytania[los].src);
        ifrm.setAttribute("modestbranding", "0");
        document.querySelector("#media").appendChild(ifrm);
    }
    
    function losujPytanie(min, max) {
        return Math.random() * (max - min) + min;
    }

    function sygnalizujKoniec() {
        alert("Nie ma więcej pytań!");
    }

    document.addEventListener("keyup", function(e) {
        if(e.keyCode === 32) {
            let ilosc = pytania.length-1;
            if(ilosc < 0) {
                sygnalizujKoniec();
                return;
            }
            let los = losujPytanie(0, ilosc).toFixed(0);
            if(pytania[los].typ === "reg") {
                zwyklePytania(los);   
            } else if(pytania[los].typ === "yt") {
                yt(los);
            } else {
                media(los);
            }
            pytania.splice(los, 1);
        }
    })
}
