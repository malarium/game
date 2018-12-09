fetch("js/pytania2.json")
  .then(response => {
    return response.json();
  })
  .then(pytania => {
    init2(pytania);
  });

function init2(pytania) {
  const main = document.querySelector("main");

  const pokazKarty = () => {
    if(pytania.length <= 0) {
      setTimeout(function() {
        window.location = "koniec.html";
      }, 35000);
    }
    main.innerHTML = "";
    pytania.forEach(pytanie => {
      let karta = document.createElement("div");
      let napis = document.createElement("p");
      napis.textContent = pytanie.epoka;
      karta.appendChild(napis);
      main.appendChild(karta);
    });
  };
  pokazKarty();

  const pokazPytania = pytanie => {
    let pytania = [...pytanie.pytania];
    let modal2 = document.querySelector(".modal2");
    let tekst_box = document.querySelector("#pytanie_tekst");
    let pasek = document.querySelector("#color");
    modal2.classList.add("modal2_show");
    pasek.style.animationName = "color";
    tekst_box.textContent = pytania[0];
    let b = 1;
    let interval = setInterval(function() {
      pasek.style.animationName = "";
      pasek.style.animationName = "color";
      tekst_box.textContent = pytania[b];
      b++;
      if(b>5) {  
        clearInterval(interval);
        modal2.classList.remove("modal2_show");
      }
    }, 7000);
    return;
  };

  document.addEventListener("click", function(e) {
    let epoka = e.target.textContent;
    pytania.forEach(pytanie => {
      if (pytanie.epoka === epoka) {
        pokazPytania(pytanie);
        pytania.splice(pytanie.numer, 1);
        let a = 0;
        pytania.forEach(pytanie => {
          pytanie.numer = a;
          a++;
        });
        pokazKarty();
      }
    });
  });
}
