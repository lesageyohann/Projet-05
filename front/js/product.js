const queryString = window.location.search;
console.log(queryString);
// ?product=shirt&color=blue&newuser&size=m
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id");
console.log(product);

fetch(`http://localhost:3000/api/products/${product}`) //requete http
  .then(function (res) {
    //recuperer le resultat
    if (res.ok) {
      // si reponse ok
      return res.json(); // alors recuperer au format json
    }
  })
  .then(function (data) {
    // recuperer les data
    buildImageProduct(data);
    buildTitleProduct(data);
    buidPriceProduct(data);
    buildDescriptionProduct(data);
    forEach((element) => buildColorProduct(element));
    console.log(data);
  });

function buildImageProduct(product) {
  // fonction de creation d image produit
  let imgProduit = document.getElementsByClassName("item__img"); // creation d'une variable a partir de l id des elements dans le document
  console.log(imgProduit[0]); // logs des produit dans la console

  imgProduit[0].innerHTML += `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
}

function buildTitleProduct(product) {
  let titreProduit = document.getElementById("title");
  console.log(titreProduit);

  titreProduit.innerHTML += `${product.name}`;
}

function buidPriceProduct(product) {
  let price = document.getElementById("price");
  console.log(price);

  price.innerHTML = `${product.price}`;
}

function buildDescriptionProduct(product) {
  let descriptionProduit = document.getElementById("description");
  console.log(descriptionProduit);

  descriptionProduit.innerHTML += `${product.description}`;
}

function buildColorProduct(product) {
  let couleurProduit = document.getElementById("colors");
  console.log(couleurProduit);

  couleurProduit.innerHTML += `<option value="${product.colors}>${product.colors}</option>`;
}