document.addEventListener("DOMContentLoaded", () => {
    const url = window.location.href;
    const pathArray = url.split('=');
    const userId = pathArray[1];

    fetch('./endpoints/collection.php?id=' + userId, {
        method: "GET"
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("GET request failed");
        }
    }).then(result => {
        if (result.success) {
            console.log(result);
            displayCollections(result[0]);
        } else {
            //TODO: display error message in the html page
            console.log("No collections in the database.")
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to get collections!");
    })
})



const displayCollections = (collections) => {
    const collectionsDisplay = document.getElementById('collections');

    if (collections.length > 0) {
        collections.forEach(collection => {
            const collectionNode = document.createElement('div');
            //use redirect method instead og displayPictures()
            const collectionHTMLContent = `
<div class="collection" id="${collection.id}" onclick="imagesMethods.displayPictures()">
    <img class="rounded img-fluid" src="./images/Landscape-Tips-Mike-Mezeul-II.jpg" alt="image-example">
    <div class="collection-description"></div>
    <h5>${collection.name}</h5>
    <p class="small">${collection.description}</p>
</div>`;
            collectionNode.innerHTML += collectionHTMLContent;
            collectionsDisplay.appendChild(collectionNode);
        })
    } else {
        const message = document.createElement('div');
        message.innerHTML = "There are currently no created collections";
        collectionsDisplay.appendChild(message);
    }


}