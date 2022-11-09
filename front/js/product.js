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
    buildColorProduct(data);
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
    // Une erreur est survenue
  });

// fonction de creation d image produit
// creation d'une variable a partir de l id des elements dans le document
// logs des produit dans la console
// ajout du contenu dans le fichier html
function buildImageProduct(product) {
  let imgProduit = document.getElementsByClassName("item__img");
  console.log(imgProduit[0]);

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
  for (let color of product.colors) {
    let couleurProduit = document.getElementById("colors");
    console.log(couleurProduit);
    couleurProduit.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

// evenement à l'action sur le bouton
// récuperation de l id, couleur et quantité
// creation d'un tableau
// transforme les objets en valeurs

let button = document.getElementById("addToCart");
button.addEventListener("click", addCart);

function addCart() {
  let id = urlParams.get("id");
  console.log(id);

  let color = document.getElementById("colors").value;
  console.log(color);

  let quantity = document.getElementById("quantity").value;
  console.log(quantity);

  let product = {
    id: id,
    color: color,
    quantity: quantity,
  };

  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

  // si locacalstorage = null alors on ajoute l objet produit
  // sinon modifier produit
  if (productInLocalStorage == null) {
    productInLocalStorage = [];
    productInLocalStorage.push(product),
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  } else if (productInLocalStorage != null) {
    //let check = productInLocalStorage.findIndex();
    let object = productInLocalStorage.findIndex(
      (element) => element.id === id && element.color === color
    );
    console.log(object);
    productInLocalStorage.push(product), //rajouter condition si objet deja present  find / findindex
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  }
}
