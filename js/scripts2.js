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

  document.addEventListener("click", function(e) {
    let epoka = e.target.textContent;
    console.log(epoka);
    pytania.forEach(pytanie => {
      if (pytanie.epoka === epoka) {
        pytanie.pytania.forEach(q => {
          //Wyświetl pytania
          console.log(q);
        });
        pytania.splice(pytanie.numer, 1);
        let a=0;
        pytania.forEach(pytanie => {
            pytanie.numer = a;
            a++;
        });
        pokazKarty();
      }
    });
  });
}
