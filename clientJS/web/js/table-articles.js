function unAuthorize() {
    localStorage.clear();
    window.location.href = "./index.html";
}

async function checkAdmin() {
    await fetch("http://localhost:8080/auth/isAdmin", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if(response.status === 403){
            localStorage.setItem("admin", 0);
        } else if(response.status === 200) {
            localStorage.setItem("admin", 1);
        } else if(response.status >= 400) {
            console.log("Error occurred");
            alert("Unexpected error");
        }
    });
}

async function getArticles() {
    await checkAdmin();

    await fetch("http://localhost:8080/articles/all", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Authentication")
        }
    })
        .then( (response) => {
            if(response.status >= 400){
                console.log("Error occurred");
                return Promise.reject();
            }
            return response.json();
        }).then(function (articlesList) {

        var htmlArticle = "";

        var isAdmin = Number(localStorage.getItem("admin"));
        htmlArticle += "<table id='articles' border = '1' align='center'>";
        htmlArticle += "<tr align='center'>";
        htmlArticle += "<th width='80px'>id</th>";
        htmlArticle += "<th width='190px'>name</th>";
        if (isAdmin === 1) {
            htmlArticle += "<th></br></th>"
            htmlArticle += "<th></br></th>"
        }
        htmlArticle += "</tr>";

        for(var i = 0; i < articlesList.length; i++){
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td>" + articlesList[i]["id"] + "</td>";
            htmlArticle += "<td>" + articlesList[i]["name"] + "</td>";
            if (isAdmin === 1) {
                htmlArticle += "<td id=\"d" + articlesList[i].id + "\"><i onclick='deleteArticle(" + articlesList[i].id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
                htmlArticle += "<td id=\"e" + articlesList[i].id + "\"><i onclick='editArticle(" + articlesList[i].id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            }
            htmlArticle +="</tr>";
        }

        if (isAdmin === 1) {
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "</tr>";
        } else if (articlesList.length === 0) {
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "</tr>";
        }
        htmlArticle += "</table>";

        document.getElementById("wrapper").innerHTML += htmlArticle;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}

function openAdd() {
    var htmlOP = "";
    document.getElementById("input").innerHTML = htmlOP;
    htmlOP += "<p align='center'>";
    htmlOP += "<lable class='title'> Name: ";
    htmlOP += "<input id=\"articleName\" class=\"textfield\" type=\"text\" >";
    htmlOP += "</label>";
    htmlOP += " <button style width='400px' onclick='addHandler()'>Add</button>";
    htmlOP += "</p>";


    document.getElementById("input").innerHTML += htmlOP;
}

async function addHandler() {
    if (localStorage.getItem("Authentication") == '' || localStorage.getItem("Authentication") == null) {
        alert("You are not authorized");
        localStorage.clear();
        window.location.href = "./login.html";
    } else {
        var articleName = document.getElementById("articleName").value;
        if (articleName.replace(/\s+/g, ' ').trim() == '') {
            alert("Enter data please");
        } else {
            var token = "Bearer " + localStorage.getItem("Authentication");
            await fetch("http://localhost:8080/articles/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    name : articleName
                })
            }).then((response) => {
                if (response.status === 403) {
                    console.log("Error occurred");
                    alert("Your access expired or you haven't entered. Log in please.");
                    unAuthorize();
                } else if (response.status === 500) {
                    console.log("Error occurred");
                    alert("Article with this name has already been created. Change name please");
                    return Promise.reject();
                } else if (response.status >= 400) {
                    return Promise.reject();
                }
                return response.json();
            }).then(() => window.location.href = "./table-articles.html")
                .catch(() => console.log("Error occurred"));
        }
    }
}

function getArticleById(id) {
    fetch("http://localhost:8080/articles/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No articles were found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occured");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            alert("Unexpected error");
            return Promise.reject();
        }
        return response.json();
    }).then(function (article) {
        var htmlArticle = "";
        document.getElementById("wrapper").innerHTML = htmlArticle;
        document.getElementById("input").innerHTML = htmlArticle;

        var isAdmin = Number(localStorage.getItem("admin"));
        htmlArticle += "<table id='articles' border = '1' align='center'>";
        htmlArticle += "<tr align='center'>";
        htmlArticle += "<th width='80px'>id</th>";
        htmlArticle += "<th width='190px'>name</th>";
        if (isAdmin === 1) {
            htmlArticle += "<th></br></th>";
            htmlArticle += "<th></br></th>";
        }
        htmlArticle += "</tr>";

        htmlArticle += "<tr align='center'>";
        htmlArticle += "<td>" + article["id"] + "</td>";
        htmlArticle += "<td>" + article["name"] + "</td>";
        if (isAdmin === 1) {
            htmlArticle += "<td id=\"d" + article.id + "\"><i onclick='deleteArticle(" + article.id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlArticle += "<td id=\"e" + article.id + "\"><i onclick='editArticle(" + article.id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
        }
        htmlArticle +="</tr>";

        if (isAdmin === 1) {
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "</tr>";
        }
        htmlArticle += "</table>";

        document.getElementById("wrapper").innerHTML += htmlArticle;
    }).catch(() => console.log("Error occurred"));
}

function getArticleByName(name) {
    fetch("http://localhost:8080/articles/name/" + name, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No articles were found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occured");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then(function (article) {
        var htmlArticle = "";
        document.getElementById("wrapper").innerHTML = htmlArticle;
        document.getElementById("input").innerHTML = htmlArticle;

        var isAdmin = Number(localStorage.getItem("admin"));
        htmlArticle += "<table id='articles' border = '1' align='center'>";
        htmlArticle += "<tr align='center'>";
        htmlArticle += "<th width='80px'>id</th>";
        htmlArticle += "<th width='190px'>name</th>";
        if (isAdmin === 1) {
            htmlArticle += "<th></br></th>"
            htmlArticle += "<th></br></th>"
        }
        htmlArticle += "</tr>";

        htmlArticle += "<tr align='center'>";
        htmlArticle += "<td>" + article["id"] + "</td>";
        htmlArticle += "<td>" + article["name"] + "</td>";
        if (isAdmin === 1) {
            htmlArticle += "<td id=\"d" + article.id + "\"><i onclick='deleteArticle(" + article.id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlArticle += "<td id=\"e" + article.id + "\"><i onclick='editArticle(" + article.id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
        }
        htmlArticle +="</tr>";

        if (isAdmin === 1) {
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "</tr>";
        }
        htmlArticle += "</table>";

        document.getElementById("wrapper").innerHTML += htmlArticle;
    }).catch(() => console.log("Error occurred"));
}

function searchHandler() {
    var search = document.getElementById("searchField").value;
    var selected = document.getElementById("selecter").value;
    if (search.replace(/\s+/g, ' ').trim() == '') {
        window.location.href = "./table-articles.html";
    } else if (selected == "id") {
        if (isNaN(Number(search)) || !Number.isInteger(Number(search)) || Number(search) < 1) {
            alert("Id must be a positive integer");
        } else {
            getArticleById(Number(search));
        }
    } else if (selected == "name") {
        getArticleByName(search);
    }
}

function deleteArticle(id) {
    fetch("http://localhost:8080/articles/id/" + id, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if(response.status === 403) {
            alert("Your token was expired or you haven't entered. Log in again please.");
            console.log("Error occurred");
            return Promise.reject();
        }else if(response.status === 500){
            console.log("Error linked");
            alert("You can't delete this article because it is linked to some operation. Delete operation first.");
            return Promise.reject();
        }else if(response.status >= 400){
            console.log("Error occurred");
            alert("Error")
            return Promise.reject();
        }
        return response;
    }).then( () => {
        window.location.href = "./table-articles.html";
    }).catch(() => console.log("Error occurred"));
}

function editArticle(id) {
    fetch("http://localhost:8080/articles/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No articles were found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            alert("Unexpected error");
            return Promise.reject();
        }
        return response.json();
    }).then(function (article) {
        var htmlOP = "";
        document.getElementById("input").innerHTML = htmlOP;
        htmlOP += "<p align='center'>";
        htmlOP += "<lable class='title'> Name: ";
        htmlOP += "<input id=\"articleName\" class=\"textfield\" type=\"text\" placeholder=\""+ article.name +"\">";
        htmlOP += "</label>";
        htmlOP += " <button style width='400px' onclick='editHandler("+ article.id +", \"" + article.name + "\")'>EDIT</button>";
        htmlOP += "</p>";

        document.getElementById("input").innerHTML += htmlOP;
    });
}

async function editHandler(id, name) {
    var editName = document.getElementById("articleName").value;

    if (editName.replace(/\s+/g, ' ').trim() == '') {
        editName = name;
    }
    await fetch("http://localhost:8080/articles/id/" + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        },
        body: JSON.stringify({
            id: id,
            name: editName
        })
    }).then((response) => {
        if (response.status === 403) {
            console.log("Error occurred");
            alert("Only ADMIN can edit articles. If you are ADMIN than your token is expired. Log in please.");
        } else if (response.status === 500) {
            console.log("Error occured");
            alert("Article with this name has already been created. Change name please");
            return Promise.reject();
        } else if (response.status >= 400) {
            alert("Unexpected error");
            return Promise.reject();
        }
        return response;
    }).then(() => window.location.href = "./table-articles.html")
        .catch(() => console.log("Error occurred"))
}
