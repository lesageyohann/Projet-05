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

      // createHTML() pour mettre le bloc du dessus dedans
      console.log(fullCart);
      Delete();
      newQuantity();
      Total();
      checkOrder();
    })
    .catch(function (err) {
      console.log(err);
    });

//Total

function Total() {
  let prixPanier = 0;
  let quantitePanier = 0;

  for (let t = 0; t < fullCart.length; t++) {
    prixPanier += parseInt(fullCart[t].price) * parseInt(fullCart[t].quantity);

    quantitePanier += parseInt(fullCart[t].quantity);
  }

  console.log(prixPanier);
  console.log(quantitePanier);

  document.querySelector("#totalPrice").innerText = prixPanier;
  document.querySelector("#totalQuantity").innerText = quantitePanier;
}

//Supprimé

function Delete() {
  let btn = document.querySelectorAll(".deleteItem");
  console.log(btn);
  console.log(fullCart);
  for (let i = 0; i < btn.length; i++) {
    console.log(btn);
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
      console.log(fullCart);
      article.remove();
      Total();
    });
  }
}

// Modification

function newQuantity() {
  let btnQuantity = document.querySelectorAll(".itemQuantity");
  console.log(btnQuantity);
  for (let i = 0; i < btnQuantity.length; i++) {
    console.log(btnQuantity);
    btnQuantity[i].addEventListener("click", (e) => {
      console.log(e.target);
      let article = e.target.closest("article");
      let index = fullCart.findIndex(
        (element) =>
          element.id == article.dataset.id &&
          element.color == article.dataset.color
      );
      console.log(index);
      produitInLocalStorage[index].quantity = e.target.value;
      fullCart[index].quantity = e.target.value;
      console.log(produitInLocalStorage[index].quantity);
      localStorage.setItem("product", JSON.stringify(produitInLocalStorage));
      Total();
    });
  }
}

// Formulaire

checkOrder(
  "firstName",
  "/^[A-Z][A-Za-zéèê-]+$/",
  "Veuillez entrer votre prénom"
);
checkOrder("lastName", "/^[A-Z][A-Za-zéèê-]+$/", "Veuillez entrer votre nom");
/*checkOrder(
  "address",
  "/^[A-Z][A-Za-zéèê-]+$/",
  "Veuillez entrer votre adresse"
);
checkOrder(
  "city",
  "/^[A-Z][A-Za-zéèê-]+$/",
  "Veuillez entrer le nom de votre ville"
);*/

function checkOrder(input, regex, error) {
  let doc = document.getElementById(input);
  let textName = document.getElementById("firstNameErrorMsg");

  doc.addEventListener("input", function (e) {
    let pattern = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
    let currentValue = e.target.value;
    console.log("valeur", currentValue);
    let check = pattern.test(currentValue);
    console.log("valid", check);

    if (!check) {
      textName.innerHTML = error;
    } else {
      textName.innerHTML = "";
    }
  });
}

// Pas de regex mail adress ville?
