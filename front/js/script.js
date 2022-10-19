fetch("http://localhost:3000/api/products") //requete http
  .then(function (res) {
    //recuperer le resultat
    if (res.ok) {
      // si reponse ok
      return res.json(); // alors recuperer au format json
    }
  })
  .then(function (data) {
    // recuperer les data
    data.forEach((element) => articleProduit(element)); //boucle pour afficher les elements
    console.log(data); // logs des data dans la console
  });

function articleProduit(product) {
  // fonction de creation d article produit
  let articleProduit = document.getElementById("items"); // creation d'une variable a partir de l id des elements dans le document
  console.log(product); // logs des produit dans la console

  articleProduit.innerHTML += `<a href="./product.html?id=${product._id}">
   <article>
     <img src="${product.imageUrl}" alt="${product.altTxt}">
     <h3 class="productName">${product.name}</h3>
     <p class="productDescription">${product.description}</p>
   </article>
 </a>`;
  // ajout d'un contenu HTMl en fonction des info recuper dans le doc
}

function imgProduit(product) {
  // fonction de creation d image produit
  let imgProduit = document.getElementById("item__img"); // creation d'une variable a partir de l id des elements dans le document
  console.log(product); // logs des produit dans la console

  imgProduit.innerHTML += `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
}
