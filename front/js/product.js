// Création une constante qui permet de gerer les requete url
//
// Création d'une constante qui permet de récupérer la valeur du contenu url
// Création d'une constante qui récupére l'id de la commande
//
// Envoie d'une requete get dans l api pour récuperer le tableau product
// La methode Then permet de récupérer le resultat de la requête
// Si la réponse est ok alors on renvoi la réponse au format json
// Alors on renvoi la Promise au format json
//
// Methode then pour récupérer les informations de data
// Appel de la fonction buildImageProduct
// Appel de la fonction buildTitleProduct
// Appel de la fonction buildPriceProduct
// Appel de la fonction buildDescriptionProduct
// Appel de la fonction buildColorProduct
//
// Methode catch pour renvoyer les erreurs dans les promise.
// Console log de l'arguement err qui permet d'obtenir des informations sur l'emplacement ou la source de l'erreur
//
// Variable création d'une div pour l'erreur couleur
// Ajout de la div error color apres l'element id colors
// Variable création d'une div pour l'erreur quantité
// Ajout de la div après l'élément portant l'id quantity

const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id");
//console.log(product);

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
    //console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

let errorColor = document.createElement("div");
document.getElementById("colors").after(errorColor);
let errorQuantity = document.createElement("div");
document.getElementById("quantity").after(errorQuantity);

/***************************************************************************************************************************/

// Fonction de creation d image produit
//
// Création de la fonction buildImageProduct avec un paramètre product
// Création de la variable imgProduit avec la méthode permétant de choisir un élément en fonction de sa classe ( item__img)
// Ajout de l'image à l'index 0 avec innerHTML et l'emplacement de l'image
function buildImageProduct(product) {
  let imgProduit = document.getElementsByClassName("item__img");
  //console.log(imgProduit[0]);

  imgProduit[0].innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
}

// Fonction Titre Produit
//
// Création de la fonction buildTitleProduct avec un paramètre product
// Création de la variable titreProduit avec la méthode permétant de choisir un élément en fonction de son id ( title)
// Ajout du titre du produit à l'élément HTML dans le DOM

function buildTitleProduct(product) {
  let titreProduit = document.getElementById("title");
  //console.log(titreProduit);

  titreProduit.innerHTML = product.name;
}

// Fonction Prix Porduit
//
// Création de la fonction buildPriceProduct avec un paramètre product
// Création de la variable price avec la méthode permétant de choisir un élément en fonction de son id (price)
// Ajout du prix du produit à l'élément HTML dans le DOM

function buidPriceProduct(product) {
  let price = document.getElementById("price");
  //console.log(price);

  price.innerHTML = product.price;
}

// Fonction Descirption Produit
//
// Création de la fonction buildDexcriptionProduct avec un paramètre product
// Création de la variable dexriptionProduit avec la méthode permétant de choisir un élément en fonction de son id (description)
// Ajout de la description du produit à l'élément HTML dans le DOM

function buildDescriptionProduct(product) {
  let descriptionProduit = document.getElementById("description");
  //console.log(descriptionProduit);

  descriptionProduit.innerHTML = product.description;
}

// Fonction Couleur Produit
//
// Création de la fonction buildTColorProduct avec un paramètre product
// Création d'une boucle for of pour itérer sur chaque couleur dans le tableau color de l'objet product
// Pour chaque couleur on créer un élément option avec create.element
// On défini la valeur de l'option en utilisant la valeur de la couleur
// On intègre la couleur dans le DOM
// On défini option en tant qu'enfant de couleurProduit

function buildColorProduct(product) {
  for (let color of product.colors) {
    let couleurProduit = document.getElementById("colors");
    let option = document.createElement("option");

    option.value = color;
    option.innerHTML = color;
    //console.log(option);
    couleurProduit.appendChild(option);
    //console.log(couleurProduit);
  }
}

/***************************************************************************************************************************/

// Evenement à l'action sur le bouton
//
// Création d'une variable button récupérent l'élément HTML avec l'id "addToCart"
// Ajout de la fonction addEventListener pour écouter un événement click sur le button et déclancher la fonction addCart
//
// Création de la fonction addCart
// On déclare erroColor et errorQunatity vide dans le DOM pour efface les erreurs précédement affiché
// On utilise urlParams.get pour extraire la valeur de l'id à partir de l'url dans une variable
// On récupère la valeur de colors et quantity
// Ensuite un tableau product est créé pour stocker les informations ( id couleur et quantité ) qui ont été définies
// On vérifie si la couleur et la quantité ont bien été choisi
// Si la séléction est incorecte alors on affiche un message d'erreur
// Si la sélection est correcte un message indique que le produit est ajouté au panier
// La fonction vérifie si des produits sont présent dans le localstorage avec localstorage.getItem
// Si aucun produit n'est présent un tableau vide est créé et l'objet product est ajouté avec la méthode localstorage.setItem
// SI des produits sont présent, la fonction recherche l'objet "product" avec findIndex
// Si un objet correspondant est trouvé alors on actualise la quantité
// Sinon L'objet "product" est ajouté au tableau dans le localstorage

let button = document.getElementById("addToCart");

button.addEventListener("click", addCart);

// Fonction Ajouter Cart

function addCart() {
  errorColor.innerText = "";
  errorQuantity.innerText = "";
  let id = urlParams.get("id");
  //console.log(id);

  let color = document.getElementById("colors").value;
  //console.log(color);

  let quantity = document.getElementById("quantity").value;
  //console.log(quantity);

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
    alert("Produit ajouté");
    if (productInLocalStorage == null) {
      productInLocalStorage = [];
      productInLocalStorage.push(product),
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    } else {
      let index = productInLocalStorage.findIndex(
        (p) => p.id === id && p.color === color
      );
      //console.log(index);
      if (index >= 0) {
        productInLocalStorage[index].quantity =
          parseInt(productInLocalStorage[index].quantity) + parseInt(quantity);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        //console.log("okQuantite");
      } else {
        productInLocalStorage.push(product);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        //console.log("okProduit");
      }
    }
  }
}
