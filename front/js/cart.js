// On défini une variable qui récupère la valeur stockée dans le localstorage sous la clé product
//
// On initialise un tableau fullCart vide
//
// Si le localstorage ne contient pas d'objet ou si il est vide, on affiche pannier vide
// Sinon on fetch l'api avec l'url
// Une fonction then est appelé pour verifier la réponse et la renvoyer au format json
// Une fonction then est appelé pour itéré sur chaque élément du stocker dans la variable produitInLocalStorage avec forEach
// Pour chaque élément on recherche le produit correspondant au data en utilisant find en comparant les ID du produit stocké et de l'api
// Puis on fait appel a la fonction contentItem pour créer le contenu HTML
// On ajoute un nouvel objet a fullCart contenant ID prix quantité et couleur
// Enfin on appel différente fonction pour la suppression, modification, le total et la commande
//
// Methode catch pour renvoyer les erreurs dans les promise.
// Console log de l'arguement err qui permet d'obtenir des informations sur l'emplacement ou la source de l'erreur

let produitInLocalStorage = JSON.parse(localStorage.getItem("product"));

let fullCart = [];

if (produitInLocalStorage === null || produitInLocalStorage.length === 0) {
  document.getElementById("cart__items").innerText = "Panier vide";
} else
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      produitInLocalStorage.forEach((element) => {
        let product = data.find((p) => p._id === element.id);
        console.log(product);
        contentItem(element, product);
        //console.log(Content);

        fullCart.push({
          id: element.id,
          price: product.price,
          quantity: element.quantity,
          color: element.color,
        });
      });
      //console.log(fullCart);
      deleteItem();
      newQuantity();
      total();
      order();
    })
    .catch(function (err) {
      console.log(err);
    });

/***************************************************************************************************************************/

// Affichage Panier
//
// Création de la fonction contentItem qui permet d'affiché différent élément dans une section HTML
// Création d'un élément article dans une constante
// Ajout d'une class cart__item à l'article par la constante
// Ajout d'un ID obtenue dans le localstorage
// Ajout d'une couleur obtenue dans le localstorage
// Création d'une constante récupérant l'élément HTML identitfié par cart__items
// Ajout de la constante blockArticle en tant qu'enfant de la constante panier permetant l'integration HTML
//
// Création d'une div dans une constante imgDiv
// Ajout d'une class cart__item__img à la dic par la constante
// Ajout de la div en tant qu'enfant de l'article précédement créé
//
// Insertion d'une image par une constante image
// Définition de la source de l'image via l'api
// Définition du texte alternatif via l'api
// Ajout de l'image en tant qu'enfant de la div précédement créé
//
// Création d'une nouvelle div via une nouvelle constante contentDiv
// Ajout de la class cart__item__content à la div via la constante
// Ajout de la div en tant qu'enfant de l'article
//
// Création d'une nouvelle div via une nouvelle constante descriptionDiv
// Ajout de la class cart__item__content__description à la div via la constante
// Ajout de la div en tant qu'enfant de la dic précédente
//
// Création d'un titre via une constante h2
// Définition du titre via l'api
// Ajout du titre en tant qu'enfant de la div précédente
//
// Création d'un paragraphe pour la couleur via une constante pColor
// Ajout du contenu du paragraphe via le localstorage
// Ajout du paragraphe en tant qu'enfant de la div précédente
//
// Création d'un paragraphe pour le prix via une constante pPrice
// Ajout du contenu du paragraphe via le localstorage
// Ajout du paragraphe en tant qu'enfant de la div précédente
//
// Création d'une nouvelle div via une nouvelle constante settingDiv
// Ajout de la class cart__item__content__settings à la div via la constante
// Ajout de la div en tant qu'enfant de la div contentDiv
//
// Création d'une nouvelle div via une nouvelle constante quantityDiv
// Ajout de la cart__item__content__settings__quantity à la div via la constante
// Ajout de la div en tant qu'enfant de la div settingDiv
//
// Création d'un paragraphe pour la quantité via une constante pQuantity
// AJout du texte "Qté" au paragraphe
// Ajout du paragraphe en tant qu'enfant de la div quantityDiv
//
// Création d'un input pour la quantité via une constante inputQuantity
// Ajout de l'attribut type: number à l'input
// Ajout de la class itemQuantity à l'input
// Ajout de l'attribut name: itemquantity
// Ajout de l'attribut mun: 1
// AJout de l'attribut max: 100
// AJout de l'input en tant qu'enfant de la div settingDiv
//
// Création d'une div via la constante deleteDiv
// Ajout de la class cart__item__content__settings__delete à la div
// Ajout de la div en tant qu'enfant de la div contentDiv
//
// Création d'un paragraphe pDelete via une constante
// Ajout de la class deleteItem au paragraphe
// Ajout du texte supprimer au paragraphe
// Ajout du paragraphe en tant qu'enfant de la div deleteDiv

function contentItem(element, product) {
  const blockArticle = document.createElement("article");
  blockArticle.classList.add("cart__item");
  blockArticle.dataset.id = element.id;
  blockArticle.dataset.color = element.color;
  const panier = document.querySelector("#cart__items");
  panier.appendChild(blockArticle);
  //console.log(blockArticle);

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  blockArticle.appendChild(imgDiv);
  //console.log(ImgDiv)

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  imgDiv.appendChild(image);
  //onsole.log(image);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");
  blockArticle.appendChild(contentDiv);
  //console.log(contentDiv);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("cart__item__content__description");
  contentDiv.appendChild(descriptionDiv);
  //console.log(descriptionDiv);

  const h2 = document.createElement("h2");
  h2.textContent = product.name;
  descriptionDiv.appendChild(h2);
  //console.log(h2);

  const pColor = document.createElement("p");
  pColor.textContent = element.color;
  descriptionDiv.appendChild(pColor);
  //console.log(pColor);

  const pPrice = document.createElement("p");
  pPrice.textContent = element.price;
  descriptionDiv.appendChild(pPrice);
  //console.log(pPrice);

  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");
  contentDiv.appendChild(settingsDiv);
  //console.log(settingsDiv);

  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");
  settingsDiv.appendChild(quantityDiv);
  //console.log(quantityDiv);

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté :";
  settingsDiv.appendChild(pQuantity);
  //console.log(pQuantity);

  const inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.value = element.quantity;
  settingsDiv.appendChild(inputQuantity);
  //console.log(inputQuantity);

  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");
  contentDiv.appendChild(deleteDiv);
  //console.log(deleteDiv);

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";
  deleteDiv.appendChild(pDelete);
  //console.log(pDelete);
}

/***************************************************************************************************************************/

//total
//
// Création de la fonction total pour obtenir les informations que le cout et la quantité total du panier
//
// Création de la variable prixPanier initié a 0
// Création de la variable quantitePanier initié a 0
// Utilisation de la boucle for pour calculé à chaque tour le prix du produit multiplier par sa quantité puis ajouté à la variable
// Utilisation de la même boucle pour calculer le total de produit dans le panier
//
// Ajout du résultat obtenue dans prixPanier dans le HTML via la sélection de son ID
// Ajout du résultat obtenue dans quantitePanier dansle HTML via la selection de son ID
// Renvoie de la valeur obtenue dans quantitePanier

function total() {
  let prixPanier = 0;
  let quantitePanier = 0;

  for (let t = 0; t < fullCart.length; t++) {
    prixPanier += parseInt(fullCart[t].price) * parseInt(fullCart[t].quantity);

    quantitePanier += parseInt(fullCart[t].quantity);
  }

  //console.log(prixPanier);
  //console.log(quantitePanier);

  document.querySelector("#totalPrice").innerText = prixPanier;
  document.querySelector("#totalQuantity").innerText = quantitePanier;
  return quantitePanier;
}

/***************************************************************************************************************************/

//Supprimé
//
// Création de la fonction deleteItem permettant de supprimé un article complet de la commande
//
// Création d'une constante récupérant les éléments HTML identitfié par deleteItem
// Utilisation de la boucle for créé un évènement sur chaque bouton
// Déclaration de la varible "article" avec closest pour trouver l'élément le plus proche qui correspond à l'élément spécifié
// Les élément sont filtré du tableau full cart et produitInLocalSotrage en comparant les ID et couleurs
// Mise à jour de la variable produitInLocalStorage
// Suppression de l'élément article parent du bouton cliqué
// Suppression de l'interface utilisateur avec la méthode remove

function deleteItem() {
  let btn = document.querySelectorAll(".deleteItem");
  //console.log(btn);
  //console.log(fullCart);
  for (let i = 0; i < btn.length; i++) {
    //console.log(btn);
    btn[i].addEventListener("click", (e) => {
      console.log(e.target);
      let article = e.target.closest("article");
      fullCart = fullCart.filter(
        (element) =>
          element.id !== article.dataset.id ||
          element.color !== article.dataset.color
      );
      produitInLocalStorage = produitInLocalStorage.filter(
        (element) =>
          element.id !== article.dataset.id ||
          element.color !== article.dataset.color
      );
      localStorage.setItem("product", JSON.stringify(produitInLocalStorage));
      //console.log(fullCart);
      article.remove();
      total();
    });
  }
}

/***************************************************************************************************************************/

// Modification
//
// Création de la fonction newQuantity permetant de modifier la quantité de chaque produit
//
// Définition d'une variable sélectionnant tout les boutons avec l'élément HTML itemQuantity
// Utilisation de la boucle for pour créer un évenement sur chaque bouton
// Déclaration de la varible "article" avec closest pour trouver l'élément le plus proche qui correspond à l'élément spécifié
// Les élément sont recherché dans le tableau fullCart et le localStorage avec la méthode findIndex
// Les tableau sont mise à jour en fonction de la valeur choisi par l'utilisateur
// Appel de la fonction total pour recalculer prix et quantité total du panier

function newQuantity() {
  let btnQuantity = document.querySelectorAll(".itemQuantity");
  //console.log(btnQuantity);
  for (let i = 0; i < btnQuantity.length; i++) {
    //console.log(btnQuantity);
    btnQuantity[i].addEventListener("click", (e) => {
      //console.log(e.target);
      let article = e.target.closest("article");
      let index = fullCart.findIndex(
        (element) =>
          element.id == article.dataset.id &&
          element.color == article.dataset.color
      );
      //console.log(index);
      produitInLocalStorage[index].quantity = e.target.value;
      fullCart[index].quantity = e.target.value;
      //console.log(produitInLocalStorage[index].quantity);
      localStorage.setItem("product", JSON.stringify(produitInLocalStorage));
      total();
    });
  }
}

/***************************************************************************************************************************/

// Formulaire
//
// Déclaration de différent regex adapté à l'utilisation attendu
//
// Déclaration de la fonction checkOrder qui vérifie la validité du formulaire de commande avec différent paramètre
//
// Récupération de l'élément HTML correspondant à l'input dans une variable
// Ajout d'un événement qui vv se déclenché à chaque modification de l'input
// A chaque déclenchement, on récupère la valeur et on vérifie sa validité
// Si la valeur ne correspond pas à la regex alors on affiche un message d'erreur et défini formCheck sur false
// Si la valuer correspond à la regex alors rien est affiché et formCheck est défini sur true

let commonRegex = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
let adressRegex = /^[A-Za-z0-9\s]{5,50}$/;
let mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function checkOrder(input, regex, error, errorInput) {
  //console.log(input);
  let doc = document.getElementById(input);

  doc.addEventListener("input", function (e) {
    let inputToCheck = document.getElementById(errorInput);
    let currentValue = e.target.value;
    //console.log("valeur", currentValue);
    let check = regex.test(currentValue);
    //console.log("valid", check);

    if (!check) {
      inputToCheck.innerHTML = error;
      formCheck[input] = false;
    } else {
      inputToCheck.innerHTML = "";
      formCheck[input] = true;
    }
    //console.log(formCheck);
  });
}

checkOrder(
  "firstName",
  commonRegex,
  "Veuillez entrer votre prénom",
  "firstNameErrorMsg"
);
checkOrder(
  "lastName",
  commonRegex,
  "Veuillez entrer votre nom",
  "lastNameErrorMsg"
);
checkOrder(
  "address",
  adressRegex,
  "Veuillez entrer votre adresse",
  "addressErrorMsg"
);
checkOrder(
  "city",
  commonRegex,
  "Veuillez entrer le nom de votre ville",
  "cityErrorMsg"
);
checkOrder(
  "email",
  mailRegex,
  "Veuillez entrer votre adresse mail",
  "emailErrorMsg"
);

/***************************************************************************************************************************/

// Commande
//
// Définition du tableau formCheck permétant la validité du formulaire
// Chaque entré du tableau est défini sur false par défault pour éviter une commande vide est nécéssite la vérification via la fonction checkOrder
//
// Création de la fonction Order, action du bouton commander
//
// Sélection du bouton d'envoie via  sa class "cart__order__form"
// Ajout d'un évenement submit sur le bouton
// Lors de la soumission du formulaire, preventDefault empèche son envoie automatique
// La fonction vérifie ensuite si chaque ligne du tableau est valide et si le total est superieur à 0
// Si le tableau est valide, alors on créé un tableau product ID qui contient les identifiants de chaque produit
// Puis on valid la commande
// Sinon une alerte est affiché demandant de remplir correctement le panier / formulaire
let formCheck = {
  firstName: false,
  lastName: false,
  email: false,
  address: false,
  city: false,
};

function order() {
  let btnOrder = document.getElementsByClassName("cart__order__form")[0];

  btnOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(btnOrder);
    if (
      formCheck.firstName &&
      formCheck.lastName &&
      formCheck.address &&
      formCheck.city &&
      formCheck.email &&
      total() > 0
    ) {
      let productId = [];
      produitInLocalStorage.forEach((product) => {
        productId.push(product.id);
      });
      console.log(productId);
      valid(productId);
      //console.log("ok");
    } else {
      alert(
        "Veuillez remplir correctement le formulaire / ajouter des objets dans le panier"
      );
      //console.log("Erreur");
    }
  });
}

/***************************************************************************************************************************/

// Validation
//
// Création de la fonction valid qui envoi les informations utilisateur et ID commande à l'url indiqué
//
// On utilise fetch avec la methode post pour envoyer les informations à l'URL cible
// Création d'un tableau  à envoyer contenant les informations nécéssaire
// Vérification de la réponse serveur , si la réponse est valide
// Récupération des données JSON
// Redirection de l'utilisateur vers la page de confirmation avec l'orderID inclut dans l'url de la page
// Suppression du contenu du localStorage
// Sinon la fonction ne fait rien

function valid(productId) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "aplication.json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        city: city.value,
      },
      products: productId,
    }),
  })
    .then(function (retour) {
      if (retour.ok) {
        return retour.json();
      }
    })
    .then(function (data) {
      //console.log(data);
      document.location.href = `confirmation.html?orderId=${data.orderId}`;
      localStorage.clear();
    })
    .catch(function (err) {});
}
