fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    kanap(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// Création liens

function link(id) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  console.log(link);
  return link;
}

// Création article
function newArticle(article, array) {
  array.forEach((item) => {
    article.appendChild(item);
  });
}

// Création image
function image(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Création titre
function title(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return title;
}

// Création paragraphe
function texte(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return texte;
}

// Liens Front Back
function backToFront(link, article) {
  const items = document.querySelector("#items");
  items.appendChild(link);
  link.appendChild(article);
}

// Boucle
function kanap(canapé) {
  canapé.forEach((sofas) => {
    const { _id, imageUrl, altTxt, name, description } = sofas;
    const link = link(_id);
    const article = document.createElement("article");
    const image = image(imageUrl, altTxt);
    const h3 = title(name);
    const p = texte(description);
    backToFront(article, image, h3, p);
    backToFront(link, article);
  });
}
