fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    data.forEach((element) => articleProduit(element));
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function articleProduit(product) {
  let section = document.getElementById("items");
  console.log(product);

  section.innerHTML += `<a href="./product.html?id=${product._id}">
   <article>
     <img src="${product.imageUrl}" alt="${product.altTxt}">
     <h3 class="productName">${product.name}</h3>
     <p class="productDescription">${product.description}</p>
   </article>
 </a>`;
}
