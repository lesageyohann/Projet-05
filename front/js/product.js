const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id");
console.log(product);

fetch(`http://localhost:3000/api/products/${product}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    buildImageProduct(data);
    buildTitleProduct(data);
    buidPriceProduct(data);
    buildDescriptionProduct(data);
    buildColorProduct(data);
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

let errorColor = document.createElement("div");
document.getElementById("colors").after(errorColor);
let errorQuantity = document.createElement("div");
document.getElementById("quantity").after(errorQuantity);

//Fonction de creation d image produit
function buildImageProduct(product) {
  let imgProduit = document.getElementsByClassName("item__img");
  console.log(imgProduit[0]);

  imgProduit[0].innerHTML += `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
}

// Fonction Titre Produit

function buildTitleProduct(product) {
  let titreProduit = document.getElementById("title");
  console.log(titreProduit);

  titreProduit.innerHTML += `${product.name}`;
}

// Fonction Prix Porduit

function buidPriceProduct(product) {
  let price = document.getElementById("price");
  console.log(price);

  price.innerHTML = `${product.price}`;
}

//Fonction Descirption Produit

function buildDescriptionProduct(product) {
  let descriptionProduit = document.getElementById("description");
  console.log(descriptionProduit);

  descriptionProduit.innerHTML += `${product.description}`;
}

//Fonction Couleur Produit

function buildColorProduct(product) {
  for (let color of product.colors) {
    let couleurProduit = document.getElementById("colors");
    console.log(couleurProduit);
    couleurProduit.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

//Evenement à l'action sur le bouton

let button = document.getElementById("addToCart");

button.addEventListener("click", addCart);

//Fonction Ajouter Cart

function addCart() {
  errorColor.innerText = "";
  errorQuantity.innerText = "";
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

  if (color == "") {
    errorColor.innerText = "Choisir couleur";
  }
  if (parseInt(quantity) <= 0 || parseInt(quantity) > 100) {
    errorQuantity.innerText = "Ajouter quantité";
  }
  if (color != "" && parseInt(quantity) > 0 && parseInt(quantity) < 100) {
    if (productInLocalStorage == null) {
      productInLocalStorage = [];
      productInLocalStorage.push(product),
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    } else {
      let index = productInLocalStorage.findIndex(
        (p) => p.id === id && p.color === color
      );
      console.log(index);
      if (index >= 0) {
        productInLocalStorage[index].quantity =
          parseInt(productInLocalStorage[index].quantity) + parseInt(quantity);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log("okQuantite");
      } else {
        productInLocalStorage.push(product);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log("okProduit");
      }
    }
  }
}
