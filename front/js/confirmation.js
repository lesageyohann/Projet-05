const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");
//console.log(orderId);

document.getElementById("orderId").innerHTML = orderId;
