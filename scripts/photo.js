if (!sessionStorage.getItem("id")) {
    document.location.replace("index.html");
}

const userId = sessionStorage.getItem("id")

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('addedSuccess').style.display = "none";
    document.getElementById('image').nextElementSibling.style.display = "none";

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
            showDropdown(result[0]);
        } else {
            //TODO: display error message in the html page
            console.log("No collections in the database.")
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to get collections!");
    })
})

const showDropdown = (collections) => {
    const dropdown = document.getElementById('dropdown');

    if (collections.length > 0) {
        collections.forEach(collection => {
            const collectionOption = document.createElement('option');
            collectionOption.setAttribute('value', collection.name);
            collectionOption.innerHTML = collection.name;
            dropdown.appendChild(collectionOption);
        })
    } else {
        const message = document.createElement('option');
        message.innerHTML = "There are currently no created collections";
        dropdown.appendChild(message);
    }
}

const submitPhoto = (event) => {
    event.preventDefault();

    let imageUpload = document.querySelector("#image");

    if (imageUpload.files.length != 0) {
        const reader = new FileReader();
        reader.readAsDataURL(imageUpload.files[0]);

        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            let image = new Image();


            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            //Validate the File Height and Width.
            image.onload = function () {
                console.log("loaded image");
            };

            //store the picture in localstorage
                localStorage.setItem(imageUpload.files[0].name, reader.result);
                //url of the picture
                const url = localStorage.getItem(imageUpload.files[0].name);
                console.log("loaded in local storage");


            //format the image date
            let imageDate = new Date(imageUpload.files[0].lastModified);
            imageDate = [
                imageDate.getFullYear(),
                padTo2Digits(imageDate.getMonth() + 1),
                padTo2Digits(imageDate.getDate()),
            ].join('-');

            const body = {
                'name': imageUpload.files[0].name,
                'date': imageDate,
            }

            let collections = document.getElementById('dropdown');
            let selectedCollectionName = collections.options[collections.selectedIndex].value;

            //get collections from database
            getCollections(selectedCollectionName, body, image);

        }
    } else {
        imageUpload.nextElementSibling.style.display = "block";
    }
}

const getCollections = (name, body, image) => {
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
            getSelectedCollectionId(result, name, body, image);
        }else {
            //TODO: display error message in the html page
            console.log("No collections in the database.");
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to get collections!");
    });
}

const getSelectedCollectionId = (collections, name, body, image) => {
    if (collections[0].some(c => c.name == name)) {
        const index = collections[0].findIndex(c => c.name == name);
        body['width'] = image.width;
        body['height'] = image.height;
        body['collectionId'] = collections[0][index].id;
        fetch('./endpoints/photo.php', {
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("POST request failed!");
            }
        }).then(result => {
            if (result.success) {
                returnToHome();
            } else {
                //TODO: display error message in the html page
                console.log("Couldn't send data for picture to database");
            }
        }).catch(() => {
            //TODO: display error message in the html page
            console.log("Something failed when trying to add a picture!");
        });
    } else {
        console.log("There is no such collection with the name " + name);
        return;
    }
}
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}
const returnToHome = () => {
    document.location.replace('index.html');
}