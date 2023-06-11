var userId;

if (!sessionStorage.getItem("id")) {
    document.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('errorMessage').style.display = "none";
    document.getElementById('cover-photo').nextElementSibling.style.display = "none";

    userId = sessionStorage.getItem("id");

});

const submitCollection = (event) => {
    event.preventDefault();

    let uploadedCollectionName = document.querySelector("#collection-name");
    let uploadedCollectionDescription = document.querySelector("#description");
    let uploadedCollectionCoverPhoto = document.querySelector("#cover-photo");

        fetch('./endpoints/collection.php?id=' + userId, {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("GET request failed!");
            }
        }).then(result => {
            if (result.success) {
                validate(result, uploadedCollectionName, uploadedCollectionDescription, uploadedCollectionCoverPhoto)
            }else {
                //TODO: display error message in the html page
                console.log("No collections in the database.");
            }
        }).catch(() => {
            //TODO: display error message in the html page
            console.log("Something failed when trying to get collections!");
        });
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const returnToHome = () => {
    document.location.replace('index.html');
}

const validate = (collections, uploadedCollectionName, uploadedCollectionDescription, uploadedCollectionCoverPhoto) => {
    if (collections[0].some(c => c.name == uploadedCollectionName.value)) {
        document.getElementById('errorMessage').style.display = "block";
    } else {
        continueSubmit(uploadedCollectionName, uploadedCollectionDescription, uploadedCollectionCoverPhoto)
    }
}

const continueSubmit = (uploadedCollectionName, uploadedCollectionDescription, uploadedCollectionCoverPhoto) => {
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
                    returnToHome();
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