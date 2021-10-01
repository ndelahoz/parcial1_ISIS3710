const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let data;
let numitems = 0;
let itemsCarrito = {};

fetch(url)
  .then((response) => response.json())
  .then((res) => {
    data = res;
  });

function mostrarInfo(n) {
  let info = data[n];

  let titulo = document.getElementById("title");
  titulo.innerHTML = info["name"];

  let divContainer = document.getElementById("contenido");
  divContainer.innerHTML = "";

  let productos = info["products"];
  let tam = productos.length;

  for (let i = 0; i < tam; i++) {
    let producto = productos[i];
    let divProd=document.createElement("div");
    divProd.className="col-3 div-prod"

    let contenido = document.createElement("div");
    contenido.className = "products";

    let divImg=document.createElement("div");

    let img = document.createElement("img");
    img.className = "miniImagen";
    img.src = producto["image"];
    divImg.appendChild(img);

    contenido.appendChild(divImg);

    let divName=document.createElement("div");
    

    let name = document.createElement("h4");
    name.innerHTML = producto["name"];
    name.className="titleProd";
    divName.appendChild(name);
    contenido.appendChild(divName);

    let divDes=document.createElement("div");
  

    let description = document.createElement("p");
    description.innerHTML = producto["description"];
    description.className="titleDes";
    divDes.appendChild(description);
    contenido.appendChild(divDes);

    let divPrice=document.createElement("div");
    divDes.className="titlePrice";

    let price = document.createElement("h4");
    price.innerHTML = "$"+producto["price"];
    divPrice.appendChild(price)
    contenido.appendChild(divPrice);

    let divBut=document.createElement("div");


    let but = document.createElement("button");
    but.innerHTML = "Add to car";
    but.onclick = sumarCarrito;
    but.className="titleBut";
    divBut.appendChild(but)
    contenido.appendChild(divBut);
    
    divContainer.appendChild(divProd);
    divProd.appendChild(contenido);
  }
}

function sumarCarrito(e) {
  numitems++;
  let items = document.getElementById("items");
  items.innerHTML = numitems + " items";

  let description = e.target.parentElement.childNodes[1].innerHTML;

  if (description in itemsCarrito) {
    itemsCarrito[description]["Qty"]++;
  } else {
    let price = e.target.parentElement.childNodes[3].innerHTML;

    item = {
      Qty: 1,
      Description: description,
      Price: price,
    };
    itemsCarrito[description] = item;
  }
}
function listaCarrito() {
  let total = 0;

  let table = document.createElement("table");
  table.className = "table table-striped";

  let tr = table.insertRow(-1);
  let col = ["Item", "Qty.", "Description", "Unit Price", "Amount", "Modify"];

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  let i = 0;
  for (key in itemsCarrito) {
    tr = table.insertRow(-1);

    let tabCell1 = tr.insertCell(-1);
    tabCell1.innerHTML = i + 1;
    i++;

    let tabCell2 = tr.insertCell(-1);
    tabCell2.innerHTML = itemsCarrito[key]["Qty"];

    let tabCell3 = tr.insertCell(-1);
    tabCell3.innerHTML = itemsCarrito[key]["Description"];

    let tabCell4 = tr.insertCell(-1);
    tabCell4.innerHTML = itemsCarrito[key]["Price"];

    let tabCell5 = tr.insertCell(-1);
    tabCell5.innerHTML = itemsCarrito[key]["Price"] * itemsCarrito[key]["Qty"];
    total = total + itemsCarrito[key]["Price"] * itemsCarrito[key]["Qty"];

    let tabCell6 = tr.insertCell(-1);

    let but1 = document.createElement("button");
    but1.innerHTML = "+";
    but1.onclick = modifyQty;

    let but2 = document.createElement("button");
    but2.innerHTML = "-";
    but2.onclick = modifyQty;

    tabCell6.appendChild(but1);
    tabCell6.appendChild(but2);
  }

  let titulo = document.getElementById("title");
  titulo.innerHTML = "Order Detail";

  let divContainer = document.getElementById("contenido");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);

  let divOrder = document.createElement("div");
  divOrder.className = "row";
  divContainer.appendChild(divOrder);

  let divTotal = document.createElement("div");
  divTotal.className = "col-9";
  divTotal.innerHTML = "Total: $" + total;
  divOrder.appendChild(divTotal);

  let divConfirm = document.createElement("div");
  divConfirm.className = "col-3";

  let cancelBut = document.createElement("button");
  cancelBut.innerHTML = "Cancel";
  cancelBut.className = "btn btn-secundary";
  cancelBut.onclick = cancelButton;

  let confirmBut = document.createElement("button");
  confirmBut.innerHTML = "Confirm order";
  confirmBut.className="btn btn-primary";
  confirmBut.onclick = confirmButton;

  divConfirm.appendChild(cancelBut);
  divConfirm.appendChild(confirmBut);

  divOrder.appendChild(divConfirm);

  let divFinal = document.createElement("div");
  divFinal.innerHTML =
    "Contact us: +57 3102105253 - info@restaurant.com - @restaurant";
  divContainer.appendChild(divFinal);
}

function modifyQty(e) {
  let description = e.target.parentElement.parentElement.cells[2].innerHTML;
  if (e.target.innerHTML === "+") {
    itemsCarrito[description]["Qty"]++;
  } else {
    itemsCarrito[description]["Qty"]--;
  }

  listaCarrito();
}

function cancelButton() {
  let myModal = document.getElementById("myModal");
  myModal.style.display = "block";
}

function closeModal() {
  let myModal = document.getElementById("myModal");
  myModal.style.display = "none";
}

function cancelOrder() {
  closeModal();
  itemsCarrito = {};
  listaCarrito();
}

function confirmButton() {
  ordenConfirmada = [];
  let i = 0;
  for (key in itemsCarrito) {
    ordenConfirmada[i] = itemsCarrito[key];
    i++;
  }
  console.log(ordenConfirmada);
}
