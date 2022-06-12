function checkLoginStatus() {
    return fetch('./endpoints/session.php').then(response => {
       if (response.ok) {
           return response.json();
       } else {
           throw new Error("Something failed when checking login status!");
       }
    });
}

function submitForm() {
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
            document.location.reload();
        } else {
            //TODO: display error message in the html page
            console.log("There isn't an user with that password!");
        }
    }).catch(() => {
        //TODO: display error message in the html page
        console.log("Something failed when trying to login!");
    });
}

function logout() {
    fetch('./endpoints/session.php', {
        method: 'DELETE'
    }).then(() => {
        document.location.reload();
    });
}

function getCurrentUsername() {
    checkLoginStatus().then(status => {
        if (status.logged) {
            return status.username;
        } else {
            console.log("There isn't current user!");
            return undefined;
        }
    })
}