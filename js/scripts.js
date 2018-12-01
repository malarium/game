fetch('/js/pytania.json').then(response => {
    return response.json();
}).then(pytania => {  
    init(pytania);
});

function init(pytania) {

    const hide = () => {
        if(document.querySelector("#modal").style.visibility === "visible") {
            document.querySelector("#modal").style.visibility = "hidden";
        }
        document.querySelector("#media").classList.remove("media_visible");
    }

    const zwyklePytania = (los) => {
        hide();
        document.querySelector("#pytanie").textContent = pytania[los].tekst;
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        document.querySelector("#epoka").textContent = pytania[los].epoka;
    }

    const szybkie = (los) => {
        hide();
        let modal = document.querySelector("#modal");
        modal.style.visibility = "visible";
        document.querySelector("#epoka").textContent = "???";
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        modal.querySelector("h1").textContent = "Pięć szybkich!";
        for(let a=0; a<=4; a++) {
            console.log(pytania[los].pytania[a]);
            document.querySelector(`#szybki${a}`).textContent = pytania[los].pytania[a];
        } 
    }

    const media = (los) => {
        hide();
        document.querySelector("#numer").textContent = pytania[los].numer + 1;
        document.querySelector("#epoka").textContent = pytania[los].epoka;
        document.querySelector("#pytanie").textContent = pytania[los].tekst;
        document.querySelector("#media").classList.add("media_visible");
        document.querySelector("#media").style.background = `url(images/${pytania[los].image})`;
    }
    
    function losujPytanie(min, max) {
        return Math.random() * (max - min) + min;
    }

    function sygnalizujKoniec() {
        alert("Nie ma więcej pytań!");
    }

    document.addEventListener("keyup", function(e) {
        if(e.keyCode === 32) {
            // Ukryj Pięć szybkich, jeśli były wyświetlone
            //modal.style.visibility = "hidden";
            // Sprawdź ilośc dostępnych pytań
            let ilosc = pytania.length-1;
            //Jeśli nie ma pytań przerwij program
            if(ilosc < 0) {
                sygnalizujKoniec();
                return;
            }
            document.querySelector("#pozostale").textContent = ilosc;
            //Losuj pytanie
            let los = losujPytanie(0, ilosc).toFixed(0);
            //Sprawdź typ pytania
            //Zwykłe pytanie
            if(pytania[los].typ === "reg") {
                zwyklePytania(los);   
            } else if (pytania[los].typ === "szybkie") {
                //Pięć szybkich
                szybkie(los);
            } else {
                //Obrazy
                media(los);
            }
            //Usuń zużyte pytanie z tablicy
            pytania.splice(los, 1);
        }
    })
}
