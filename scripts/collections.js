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
            collectionNode.setAttribute("class", "collection");
            collectionNode.setAttribute("id", `${collection.id}`);
            collectionNode.onclick = move;
            const collectionHTMLContent = `
                        <img src="${localStorage.getItem(collection.cover_photo)}" alt="collection-cover-photo">
                        <div class="collection-description"></div>
                        <h5>${collection.name}</h5>
                        <p>${collection.description}</p>
            `;

            collectionNode.innerHTML += collectionHTMLContent;
            collectionsDisplay.appendChild(collectionNode);
            // collectionsDisplay.childNodes.forEach(c => c.addEventListener("click", (event) => {
            //     move(event);
            // }));
        });
    } else {
        const message = document.createElement('div');
        message.innerHTML = "There are currently no created collections";
        collectionsDisplay.appendChild(message);
    }
}

move = (event) => {
    const id = event.path[1].id;
    window.location = 'display-pictures.html?collectionId=' + id;
};