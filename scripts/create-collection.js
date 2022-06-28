var userId;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('addedSuccess').style.display = "none";
    document.getElementById('cover-photo').nextElementSibling.style.display = "none";

    const url = window.location.href;
    const pathArray = url.split('=');
    userId = pathArray[1];

});

const submitCollection = (event) => {
    event.preventDefault();

    let uploadedCollectionName = document.querySelector("#collection-name");
    let uploadedCollectionDescription = document.querySelector("#description");
    let uploadedCollectionCoverPhoto = document.querySelector("#cover-photo");

    if (uploadedCollectionCoverPhoto.files.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedCollectionCoverPhoto.files[0]);

        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            let image = new Image();


            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            localStorage.setItem(uploadedCollectionCoverPhoto.files[0].name, reader.result.toString());
            const url = localStorage.getItem(uploadedCollectionCoverPhoto.files[0].name);

            let date = new Date();
            date = [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-');


            const body = {
                'name': uploadedCollectionName.value,
                'creationDate': date,
                'description': uploadedCollectionDescription.value,
                'coverPhoto': uploadedCollectionCoverPhoto.files[0].name,
                'userId': userId
            };

            fetch('endpoints/collections.php', {
                method: "POST",
                body: JSON.stringify(body)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("GET request failed!");
                }
            }).then(result => {
                if (result.success) {
                    displaySuccess();
                }else {
                    //TODO: display error message in the html page
                    console.log("Cannot add the collection in the DB.");
                }
            }).catch(() => {
                //TODO: display error message in the html page
                console.log("Something failed when trying to add collection!");
            });
        }
    } else {
        uploadedCollectionCoverPhoto.nextElementSibling.style.display = "block";
    }
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const displaySuccess = () => {
    document.getElementById('addedSuccess').style.display = "block";
    document.getElementById('cover-photo').nextElementSibling.style.display = "none";
}