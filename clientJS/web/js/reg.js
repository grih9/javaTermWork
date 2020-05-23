function submitReg() {
    var username = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var passConfirm = document.getElementById("confirmPassword").value;
    var checkBoxValue = document.getElementById("checkBox").checked;
    if((username.replace(/\s+/g, ' ').trim() == '') || (pass.replace(/\s+/g, ' ').trim() == '') || (passConfirm.replace(/\s+/g, ' ').trim() == '')) {
        alert("Enter data please");
    } else if (!checkBoxValue) {
        alert("Please confirm that entered data is correct");
    } else if(pass !== passConfirm) {
        alert("Passwords don't match");
    } else {
        fetch("http://localhost:8080/auth/signUp", {
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
                    console.log("User with this nickname exists");
                    return Promise.reject();
                }
                return response.json();
            }).then( () => alert("New user created successfully. Now please log in"))
            .then( () => localStorage.clear() )
            .then( () => window.location.href = "./login.html" )
            .catch( () => alert("User with this nickname exists"));
    }
}

function clickCheckBox() {
    document.getElementById("checkBox").checked = !document.getElementById("checkBox").checked;
}
