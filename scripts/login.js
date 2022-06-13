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
    submitForm: () => {
        if (document.getElementById("username").value === '' || document.getElementById("password").value === '') {
            return;
        }

        const body = {
            'username': document.getElementById("username").value,
            'password': document.getElementById("password").value
        };

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
                document.location.replace('http://localhost:80/php-project/index.html');
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