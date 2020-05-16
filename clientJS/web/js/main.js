const fetch = require("node-fetch");
global.Headers = fetch.Headers;
var token;
var url = 'http://localhost:8080/';

async function getArticles() {
    let response = await fetch(url + "articles/all");
    if (response.ok) {
        let json = await response.json();
        var data = JSON.stringify(json);
        var object = JSON.parse(data);
        console.log(object);
        return object;
    } else {
        console.log("error");
    }
}

async function findUserByID(username, password) {
    alert(username + password);
    let user = {
        userName: username,
        password: password
    };
    let response = await fetch(
        url + "auth/signIn",
        {
            method: 'POST',
            headers: new Headers(
                {
                    'Content-Type': 'application/json'
                }),
            body: JSON.stringify(user)
        });
    if (response.ok) {
        let json = await response.json();
        var data = JSON.stringify(json);
        var object = JSON.parse(data);
        console.log(object);
        return object["token"];
    } else {
        console.log("Ошибка HTTP: " + response.status);
        return null;
    }
}

async function findUserByName() {
    let user = {
        userName: 'user',
        password: 'pwd'
    };
    let response = await fetch(
        url + "auth/signIn",
        {
            method: 'POST',
            headers: new Headers(
                {
                    'Content-Type': 'application/json'
                }),
            body: JSON.stringify(user)
        });
    if (response.ok) {
        let json = await response.json();
        var data = JSON.stringify(json);
        var object = JSON.parse(data);
        console.log(object);
        return object["token"];
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

async function authorize(username, password) {
    let user = {
        userName: username,
        password: password
    };
    alert(user[1])
    let response = await fetch(
        "http://localhost:8080/auth/signIn",
        {
            method: 'POST',
            headers: new Headers(
                {
                    'Content-Type': 'application/json'
                }),
            body: JSON.stringify(user)
        });
    if (response.ok) {
        alert(response.status);
        let json = await response.json();
        var data = JSON.stringify(json);
        var object = JSON.parse(data);
        // console.log(object);
        return object["token"];
    } else {
        alert("HTTP Error: " + response.status);
        return -1;
    }
}

async function loginConfirmListener() {
    alert(token);
    token = 5;
    alert(token);
    // const userName = document.getElementById('userName');
    // const password = document.getElementById('password');
    //
    // if (userName.value === '' || password.value === '') {
    //      alert("Enter data, please");
    //      return null;
    // }
    //
    // token = authorize(user.value, password.value);
    //
    // if (token == -1) {
    //     alert("not ok")
    //     return -1;
    // } else {
    //     alert("ok")
    //     window.location.href = "./success.html";
    // }
}

function unAuthorize() {
    token = null;
}
loginConfirmListener()

document.body.style.background = "red";

// fetch(
//         url + "auth/signIn",
//         {
//             method: 'POST',
//             headers: new Headers(
//                 {
//                     'Content-Type': 'application/json'
//                 }),
//             body: JSON.stringify(user)
//         }).then(response => response.json())
//     .then(json => JSON.stringify(json))
//     .then(data => JSON.parse(data))
//     .then(res => console.log(res.token))


// fetch("http://localhost:8080/articles/id/1",
//     {
//         method: 'GET',
//         headers: new Headers(
//             { 'Authorization': 'Bearer ' + token,
//                  'Content-Type': 'application/json'
//             }),
//     })
//     .then(response => response.json())
//     .then(json => console.log(json))


// console.log(response.status);
// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//                    // получаем тело ответа (см. про этот метод ниже)
//     let json = response.json();
//     console.log(json);
// } else {
//     console.log();
// }