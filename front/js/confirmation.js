// Création une constante qui permet de gerer les requete url
//
// Création d'une constante qui permet de récupérer la valeur du contenu url
// Création d'une constante qui récupére l'id de la commande dans l'url
//
// Afficher l'id de la commande dans la page

const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");
//console.log(orderId);

document.getElementById("orderId").innerHTML = orderId;
