let imagesMethods = {
    displayPictures: () => {
        const hardCodedCollectionId = 1;

        fetch('endpoints/images.php?id=' + hardCodedCollectionId)
            .then(response => response.json())
            .then(imagesMethods.createView);
    },
    // redirect: ($images) => {
    //     document.location.replace('http://localhost:80/php-project/display-pictures.html');
    //
    //     return $images;
    // },
    createView: ($images) => {
        const mainDiv = document.getElementsByClassName('collections')[0];

        for (let i = 0; i < $images.length; i++) {
            let section = document.createElement('section');
            let div = document.createElement('div');
            div.classList.add("frame");
            let img = document.createElement('img');
            img.src = `${$images[i].path}`;
            img.alt = "example-db-picture";

            div.appendChild(img)
            section.appendChild(div);

            mainDiv.appendChild(section);
        }
    }
};