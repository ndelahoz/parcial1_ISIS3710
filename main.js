const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let data;
let numitems=0;
fetch(url)
    .then(response => response.json())
    .then(res => {
        data=res;
    });

function mostrarInfo(n){

    let info= data[n];

    let titulo = document.getElementById("title");
    titulo.innerHTML = info["name"];
    

    let divContainer = document.getElementById("contenido");
    divContainer.innerHTML = "";

    let productos = info["products"];
    let tam= productos.length;


    for(let i=0; i<tam; i++){

        let producto= productos[i];

        let contenido = document.createElement("div");
        contenido.className= "col-3"

        let img =document.createElement("img");
        img.className="miniImagen";
        img.src=producto["image"];
        contenido.appendChild(img);

        let name =document.createElement("h4");
        name.innerHTML=producto["name"];
        contenido.appendChild(name);

        let description =document.createElement("p");
        description.innerHTML=producto["description"];
        contenido.appendChild(description);

        let price =document.createElement("h4");
        price.innerHTML=producto["price"];
        contenido.appendChild(price);

        let but =document.createElement("button");
        but.innerHTML="Add to car";
        but.onclick=itemsCarrito;
        contenido.appendChild(but);

        divContainer.appendChild(contenido);
    }
}

function itemsCarrito(){
    numitems++;
    let items = document.getElementById("items");
    items.innerHTML = numitems+" items";
}
