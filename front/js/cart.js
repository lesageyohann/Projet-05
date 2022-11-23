let produitInLocalStorage = JSON.parse(localStorage.getItem("product"));

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
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      });
    })
    .catch(function (err) {
      console.log(err);
      // Une erreur est survenue
    });
