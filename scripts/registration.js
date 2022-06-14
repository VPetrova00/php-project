const checkRegistrationStatus = () => {
    return fetch('./endpoints/session.php').then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something failed when checking login status!");
        }
    });
}

const redirectToMainPage = () => {
    window.location.replace("index.html");
}


function submitForm(event) {
    event.preventDefault();
    //
    // const form = event.target;

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
            redirectToMainPage();
            return response.json();
        } else {
            throw new Error("POST request failed!");
        }
    }).then(result => {
        if (result.success) {
            console.log(result);
            document.location.reload();
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
