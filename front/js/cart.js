let produitInLocalStorage = JSON.parse(localStorage.getItem("product"));

let fullCart = [];

if (produitInLocalStorage === null || produitInLocalStorage.length === 0) {
  document.getElementById("cart__items").innerText = "Panier vide";
} else
  fetch("http://localhost:3000/api/products") //requete http
    .then(function (res) {
      //recuperer le resultat
      if (res.ok) {
        // si reponse ok
        return res.json(); // alors recuperer au format json
      }
    })
    .then(function (data) {
      produitInLocalStorage.forEach((element) => {
        let product = data.find((p) => p._id === element.id);
        console.log(product);
        document.getElementById(
          "cart__items"
        ).innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${element.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

        fullCart.push({
          id: element.id,
          price: product.price,
          quantity: element.quantity,
          color: element.color,
        });
      });
      console.log(fullCart);
      Delete();
      newQuantity();
      Total();
      order();
    })
    .catch(function (err) {
      console.log(err);
    });

/***************************************************************************************************************************/

//Total

function Total() {
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

function Delete() {
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
      Total();
    });
  }
}

/***************************************************************************************************************************/

// Modification

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
      Total();
    });
  }
}

/***************************************************************************************************************************/

// Formulaire
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
      Total() > 0
    ) {
      let productId = [];
      produitInLocalStorage.forEach((product) => {
        productId.push(product.id);
      });
      console.log(productId);
      Valid(productId);
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

function Valid(productId) {
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
