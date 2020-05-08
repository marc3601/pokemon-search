let ranNum, result, cards, div, img, cardHead, h1, span, alertBox, middleContainer;
const container = document.querySelector(".articles");
load();


function load() {
  ranNum = Math.floor(Math.random() * 100);
  var req = new XMLHttpRequest();
  req.open('GET', 'https://api.pokemontcg.io/v1/cards/?pageSize=4&page=' + ranNum + '', true);
  req.send(null);
  alertBox = container.appendChild(div = document.createElement("div"));
  alertBox.classList.add('.alertBox');
  const pop = alertBox.appendChild(div = document.createElement("div"));
  pop.innerHTML = "<div></div><div></div><div></div>";
  pop.classList.add("loader");

  function processReq(e) {
    if (req.readyState == 4 && req.status == 200) {
      result = req.responseText;
      cards = JSON.parse(req.responseText);
      if (cards) {
        createDivs();
      };
    };
  };
  req.addEventListener('load', processReq, false);
  return cards;
};



function createDivs() {
  let clName = 0;

  alertBox.remove()
  middleContainer = container.appendChild(div = document.createElement("div"));
  middleContainer.classList.add('middle');
  for (let i = 0; i < 4; i++) {
    clName++;

    middleContainer.appendChild(div = document.createElement("div"));
    div.setAttribute('class', "article");

    div.appendChild(cardHead = document.createElement("div"));
    cardHead.classList.add("card-header");

    cardHead.appendChild(h1 = document.createElement("h1"));
    h1.textContent = cards.cards[i].name;
    cardHead.appendChild(span = document.createElement('div'));
    span.textContent = "Nr. " + cards.cards[i].number;


    div.appendChild(img = document.createElement("img"));
    img.setAttribute('src', cards.cards[i].imageUrl);


  };
};

function isHidden(el) {
  return (el.offsetParent === null)
}

function search() {
  let id = [];
  let input, filter, h1, articles, article, textValue, checkThis, middle, warn;
  input = document.querySelector("input");
  filter = input.value.toUpperCase();
  h1 = document.querySelectorAll("h1");
  articles = document.querySelectorAll(".article");
  middle = document.querySelectorAll(".middle");
  for (i = 0; i < h1.length; i++) {
    article = articles[i];
    checkThis = h1[i];
    textValue = checkThis.textContent;
    warn = document.querySelector(".warning");

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      article.style.display = "";

    } else {
      article.style.display = "none";
      id.push("1")
    };
  };
  if (id.length == articles.length) {
    warn.classList.add('empty');
  } else {
    warn.classList.remove('empty');
  };


};

document.addEventListener("keyup", search);
document.querySelector(".more").addEventListener('click', load);