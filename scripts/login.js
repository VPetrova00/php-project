const loginMethods = {
    checkLoginStatus: () => {
        return fetch('./endpoints/session.php').then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something failed when checking login status!");
            }
        });
    },
    submitForm: (event) => {
        event.preventDefault();
        let successfulUser = {
            isSuccess: true,
            userId: 0,
        };
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        //hide error messages if they are shown from before
        username.nextElementSibling.style.display = 'none';
        password.nextElementSibling.style.display = 'none';

        //check if properties are empty
        if ( username.value === '' ) {
            username.nextElementSibling.innerHTML = "Please enter a username.";
            username.nextElementSibling.style.display = "block";
            successfulUser.isSuccess = false;
        }
        if (password.value === '') {
            password.nextElementSibling.innerHTML = "Please enter a password.";
            password.nextElementSibling.style.display = "block";
            successfulUser.isSuccess = false;
        }

        //check if this user exists
        fetch('./endpoints/Register.php', {
            method: "GET"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("GET request failed!");
            }
        }).then(result => {
            if (result.success) {
                //check if a user with these usernames and password exist
                successfulUser = validateUser(result, username, password);
                //check if validation is true
                checkSuccess(successfulUser, username, password);
            } else {
                //TODO: display error message in the html page
                console.log("No users in the database.");
            }
        }).catch(() => {
            //TODO: display error message in the html page
            console.log("Something failed when trying to get users!");
        });
    }
}

const logout = () => {
    fetch('./endpoints/session.php', {
        method: 'DELETE'
    }).then(() => {
        document.location.replace('http://localhost:80/php-project/login.html');
    });
};

loginMethods.checkLoginStatus()
    .then(loginStatus => {
        if (loginStatus.logged) {
            document.getElementById('not-logged-buttons').setAttribute('style', "display: none");
            document.getElementById('logged-buttons').setAttribute('style', "display: block");
            document.getElementById('hello-user').innerText = loginStatus.session.username;
        } else {
            document.getElementById('not-logged-buttons').setAttribute('style', "display: block");
            document.getElementById('logged-buttons').setAttribute('style', "display: none");
        }
    });

const validateUser = (users, username, password) => {
    if (users[0].some(u => u.username == username.value)) {
        const index = users[0].findIndex(u => u.username == username.value);
        if (users[0][index].password == password.value) {
            return {
                isSuccess: true,
                userId: users[0][index].id
            };
        } else {
            password.nextElementSibling.innerHTML = "Incorrect password!";
            password.nextElementSibling.style.display = "block";
            return {
                isSuccess: false,
                userId: undefined
            };
        }
    } else {
        username.nextElementSibling.innerHTML = "User with this username doesn't exist.";
        username.nextElementSibling.style.display = "block";
        return {
            isSuccess: false,
            userId: undefined
        };
    }
}

const checkSuccess = (successfulUser, username, password, user) => {

    const body = {
        'username': username.value,
        'password': password.value
    };
    //if everything is successful redirect to main page
    if (successfulUser.isSuccess) {
        username.nextElementSibling.style.display = "none";
        password.nextElementSibling.style.display = "none";

        const userId = successfulUser.userId;

        fetch('./endpoints/session.php', {
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
                document.location.replace('http://localhost:80/php-project/index.html?user_id=' + userId);
            } else {
                //TODO: display error message in the html page
                console.log("There isn't an user with that password!");
            }
        }).catch(() => {
            //TODO: display error message in the html page
            console.log("Something failed when trying to login!");
        });
    }
}