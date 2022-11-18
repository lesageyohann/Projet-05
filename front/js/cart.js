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
    data.forEach((element) => buildProduct(element)); //boucle pour afficher les elements
    console.log(data); // logs des data dans la console
  });
