const baseUrl =  "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (price) => {
    const newPrice = new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD"
    }).format(price);
    
    return newPrice;
};

//web api
//conectarnos al server
window
    .fetch(`${baseUrl}/api/avo`)
    //procesar la respuesta y convertirla en JSON    
    .then((respuesta) => respuesta.json())
    //JSON -> DATA -> Renderizar info browser
    .then((responseJSON) => {
        const todosLosItems = [];
        responseJSON.data.forEach((element) => {            
            //crear imagen
            const imagen = document.createElement("img");
            imagen.src = `${baseUrl}${element.image}`;
            imagen.className= "max-h-48 max-w-48 opacity-90 rounded-full";

            //crear titulo
            const title = document.createElement("h2");
            title.textContent = element.name;
            //Ejemplos para crear estilos
            //title.style = fontSize = "3rem";
            //title.className ="tituloPrincipal"
            //o en este caso usar las clases del framework tailwindcss
            title.className = "text-base hover:underline w-auto cursor-pointer";
            
            //crear precio
            const price = document.createElement("div");
            price.textContent = "Precio: " + formatPrice(element.price);
            price.className = "text-xl font-bold m-2 w-auto";

            //crear sabor
            const taste = document.createElement("p");
            taste.textContent = "Sabor: " + element.attributes.description;
            taste.className = "text-xs";
            
            //creando contenedores
            const containerName = document.createElement("div");
            containerName.append(title, price);
            containerName.className = "flex flex-col max-w-xs";

            const containerNameImage = document.createElement("div");
            containerNameImage.append(imagen, containerName);
            containerNameImage.className = "flex justify-center items-center max-w-xs";

            const containerInfo = document.createElement("div");
            containerInfo.append(taste);
            containerInfo.className = "flex flex-col max-w-xs";

            //creando contenedor general
            const container = document.createElement("div");
            container.append(containerNameImage, containerInfo);
            container.className = "w-1/3 m-3";
            
            //asi agregamos todos dentro de un contenedor
            todosLosItems.push(container);
        
        });

        appNode.append(...todosLosItems);
            //este contenedor que entre en el body container
    });
