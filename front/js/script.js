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

// Création image
function image(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Création titre
function titleBuild(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

// Création paragraphe
function texteBuild(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
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
    const liens = link(_id);
    const articleNode = document.createElement("article");
    const imageNode = image(imageUrl, altTxt);
    const titleNode = titleBuild(name);
    const pNode = texteBuild(description);
    articleNode.appendChild(imageNode);
    articleNode.appendChild(titleNode);
    articleNode.appendChild(pNode);
    backToFront(liens, articleNode);
  });
}
