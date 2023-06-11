if (!sessionStorage.getItem("id")) {
    document.location.replace("index.html");
}

let imagesMethods = {
    displayHeadingAndPictures: (collections) => {
        const params = new URLSearchParams(window.location.search);
        const collectionId = params.get('collectionId');

        const collectionHeading = document.getElementById("collection-heading");
        const currentCollection = collections.find(collection => collection.id == collectionId);
        collectionHeading.innerHTML = "Photos of " + currentCollection.name + " album";

        fetch('endpoints/display-images.php?id=' + collectionId)
            .then(response => response.json())
            .then(imagesMethods.createView);
    },
    createView: ($images) => {
                const main = document.getElementById('album');

                for (let i = 0; i < $images.length; i++) {
                    let section = document.createElement('section');
                    section.setAttribute("class", "album-picture-container-A4");
                    let div = document.createElement('div');
                    div.setAttribute("class", "frame");
                    let img = document.createElement('img');
                    img.src = localStorage.getItem($images[i].name);
                    img.alt = "picture";

                    div.appendChild(img)
                    section.appendChild(div);

                    main.appendChild(section);
                }

                if ($images.length === 0) {
                    document.getElementById("print-btn").style.display = "none";
                    document.getElementById("sort-btn").style.display = "none";
                    const message = document.createElement('div');
                    message.innerHTML = "There are currently no images in this collection";
                    main.appendChild(message);
                }

    },
    sort:() => {
        const params = new URLSearchParams(window.location.search);
        const collectionId = params.get('collectionId');
        const main = document.getElementById('album');

        if (main.hasChildNodes()) {
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }

        fetch('endpoints/sort.php?id=' + collectionId)
            .then(response => response.json())
            .then(imagesMethods.createView);
    }
};