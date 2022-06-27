const redirectToMainPage = (userId) => {
    window.location.replace("index.html?user_id=" + userId);
}

function submitForm(event) {
    event.preventDefault();

    const body = {
        'username': document.getElementById('username').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
        'confirm-password': document.getElementById('confirm-password').value
    };

    const promise = fetch('./endpoints/session.php', {
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
            console.log(result);
            validate(result);
        } else {
            //TODO: display error message in the html page
            console.log("This username is already taken.");
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to register!");
    });

    return promise;
}

function validate(result) {
    //create boolean array for all properties in the register form
    let areAllSuccessful = [false, false, false, false];

    //defining properties of the register form
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');

    let properties = [username, email, password, confirmPassword];

    properties.forEach((property, index) => {
        let validityState = property.validity;

        //access the section after the property - it is used for error messages
        let errorSection = property.nextElementSibling;

        //check if current property is valid
        if (!validityState.valid) {
            //the value at property's index is set to false in the areAllSuccessful array
            areAllSuccessful[index] = false;

            //validation checks
            if (validityState.valueMissing) {
                if (property == email) {
                    errorSection.innerHTML = 'Please enter your email address.';
                } else if (property == confirmPassword) {
                    errorSection.innerHTML = 'Please confirm your password.';
                } else {
                    errorSection.innerText = 'Please enter your ' + property.getAttribute("name") + '.';
                }

            } else if (validityState.patternMismatch) {
                errorSection.innerHTML = 'Incorrect email address.';
            }

            errorSection.style.display="block";
        } else {
            //if the property is valid its index is set to true in areAllSuccessful array
            areAllSuccessful[index] = true;
            errorSection.innerHTML = "";
            errorSection.style.display = "none";
        }
    })
    //check if password and confirm-password are the same
    if (password.value != confirmPassword.value && password.value != '' && confirmPassword.value != '') {
        areAllSuccessful[2] = false;
        areAllSuccessful[3] = false;
        password.nextElementSibling.innerHTML = "The confirm password field is different from this one.";
        password.nextElementSibling.style.display="block";
    }

    //getting users from database
    let users;
    fetch("./endpoints/Register.php", {
        method: "GET"
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("GET request failed!");
        }
    }).then(result => {
        if (result.success) {
            console.log(result);
            users = result;
            // check if the username already exists in the database
            areAllSuccessful = checkForExistingUser(username, users, areAllSuccessful);
            //check if all properties are successful
            checkSuccess(areAllSuccessful, properties);
        } else {
            //TODO: display error message in the html page
            console.log("No users in the database.");
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to get users!");
    });
}

function checkForExistingUser(property, users, areAllSuccessful) {
    if (users[0].some(u => u.username == property.value)) {
        areAllSuccessful[0] = false;
        property.nextElementSibling.innerHTML = "This username already exists.";
        property.nextElementSibling.style.display = "block";
    }

    return areAllSuccessful;
}

function checkSuccess(areAllSuccessful, properties) {
    const body = {
        'username': properties[0].value,
        'email': properties[1].value,
        'password': properties[2].value
    };
    if (areAllSuccessful.every(value => value == true)) {
        fetch('./endpoints/Register.php', {
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
                redirectToMainPage(result.id);
            } else {
                //TODO: display error message in the html page
                console.log("Couldn't send data for user to database");
            }
        }).catch(() => {
            //TODO: display error message in the html page
            console.log("Something failed when trying to register!");
        });
    }
}