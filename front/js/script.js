// Envoie d'une requete get a l'url
// La methode Then permet de récupérer le resultat du la requête
// Si la réponse est ok alors on renvoi la réponse au format json
// Alors on renvoi la Promise au format json
//
// Methode then pour récupérer les informations de data
// Utilisation de la fonction Kanap avec l'argument data
//
// Methode catch pour renvoyer les erreurs dans les promise.
// Console log de l'arguement err qui permet d'obtenir des informations sur l'emplacement ou la source de l'erreur

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

// Fonction link qui génère un lien en fontion de l'ID produit
// Déclaration d'une constante pour créer un liens cliquable
// Définition du chemin du lien ( location + id produit)
// Renvoi de la valeur obtenue par la constante

function link(id) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  //console.log(link);
  return link;
}

// Création image

// Fonction Image permetant l'insertion d'une image
// Déclaration d'une constante pour créer un bloc image
// Indication de la source de l'image
// Indication du texte alternative de l'image
// Renvoi de la valeur obtenue par la contante

function image(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

// Création titre

// Fonction titleBuild qui génère le titre du produit
// Déclaration d'une constante pour créer un bloc titre
// Indication du contenue texte du titre, ici name obtenue dans les données des javascript
// Ajout de la class productName au bloc titre
// Renvoi de la valeur obtenue par la constante h3

function titleBuild(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

// Création paragraphe

// Fonction texteBuild qui génère la description du produit
// Déclaration d'une constante pour créer un bloc paragraphge
// Indication du contenue texte de la description
// Ajout de la class productDescription au bloc p
// Renvoi de la valeur obtenue par la constante p

function texteBuild(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}

// Liens Front Back

// Fonction backToFront qui lie le liens à l'article
// Déclaration d'une constante items pour selectionner les objet de class items
// Ajout de link en tant qu'enfant de "items"
// Ajout de article en tant qu'enfant de link

function backToFront(link, article) {
  const items = document.querySelector("#items");
  items.appendChild(link);
  link.appendChild(article);
}

// Boucle

// Fonction kanap qui compile les créations pour chaque article
// Pour chaque sofas on iterera les précédentes créations
// Déclaration de la constante sofas
// Constante pour récupérer le lien créé
// Constante pour créer l'article
// Constante pour récupérer l'image
// Constante pour récupérer le titre
// Constante pour récupérer la description
// Ajout de l'image en tant qu'enfant de l'article
// Ajout du titre en tant qu'enfant de l'article
// Ajout du paragraphe en tant qu'enfant de l'article
// On récupere la fonction qui fait le liens entre l'objet et l'article

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
