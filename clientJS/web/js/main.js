const fetch = require("node-fetch");
global.Headers = fetch.Headers;
let url = "http://localhost:8080/articles/all"

fetch("http://localhost:8080/articles/all")
    .then(response => response.json())
    .then(json => console.log(json))

//let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTU4OTUzODM3MywiZXhwIjoxNTg5NTM4NTUzfQ.sGt-d9XxJ5Wo-U1Gu-5r45nSka8Qe_2IpoPg-G8oJ5A";

let user = {
    userName: 'user',
    password: 'pwd'
};

fetch("http://localhost:8080/auth/signIn",
    {
        method: 'POST',
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }),
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(json => console.log(json))

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
//     console.log("Ошибка HTTP: " + response.status);
// }