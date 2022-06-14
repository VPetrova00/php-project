let imagesMethods = {
    displayPictures: () => {
        const hardCodedCollectionId = 1;

        fetch('./endpoints/images.php?id=' + hardCodedCollectionId)
            .then(response => response.json())
            .then(imagesMethods.createView);
    },
    createView: (image) => {
        const main = document.getElementById('album');
        const imageSection = `
            <section class="album-picture-container-A4">
                <div class="frame">-
                    <img src="${image.path}" alt="example-db-picture">
                </div>
            </section>
            `;

        main.append(imageSection);
        document.location.replace('http://localhost:80/php-project/display-pictures.html');
    }
};