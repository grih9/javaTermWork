function submitLogin() {
    var username = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    if((username.replace(/\s+/g, ' ').trim() == '') || (pass.replace(/\s+/g, ' ').trim() == '')){
        alert("Enter data please");
    } else {
        fetch("http://localhost:8080/auth/signIn", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: pass
            })
        })
            .then( (response) => {
                if(response.status >= 400){
                    console.log("Check entered data please");
                    return Promise.reject();
                }
                return response.json();
            }).then( (obj) => localStorage.setItem("Authentication", obj["token"]))
            .then( () => window.location.href = "./success.html" )
            .catch( () => alert("User with this login and password is not found"));
    }
}
