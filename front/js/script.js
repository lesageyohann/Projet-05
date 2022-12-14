fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    data.forEach((element) => buildProduct(element));
    console.log(data);
  });

//Fonction de creation d article produit

function buildProduct(product) {
  let articleProduit = document.getElementById("items");
  console.log(product);

  articleProduit.innerHTML += `<a href="./product.html?id=${product._id}">
   <article>
     <img src="${product.imageUrl}" alt="${product.altTxt}">
     <h3 class="productName">${product.name}</h3>
     <p class="productDescription">${product.description}</p>
   </article>
 </a>`;
}
