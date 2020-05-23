function unAuthorize() {
    localStorage.clear();
    window.location.href = "./index.html";
}

function isLog() {
    if (localStorage.getItem("Authentication") !== null) {
        alert("You have already logged in");
        window.location.href = "./table.html";
    } else {
        localStorage.clear();
        window.location.href = "./login.html";
    }
}

function getArticles() {
    fetch("http://localhost:8080/articles/all")
        .then( (response) => {
            if (response.status >= 400) {
                console.log("Error occurred");
                alert("You have no access. Log in please.");
                localStorage.clear();
                return Promise.reject();
            }
            return response.json()
        }).then(function (articlesList) {
        var htmlArticle = "";
        document.getElementById("wrapper").innerHTML = htmlArticle;

        htmlArticle += "<table id='articles' border = '1' align='center'>";
        htmlArticle += "<tr align='center'>";
        htmlArticle += "<th width='80px'>id</th>";
        htmlArticle += "<th width='190px'>name</th>";
        htmlArticle += "</tr>";

        if (articlesList.length === 0) {
            htmlArticle += "<tr>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "<td></br></td>";
            htmlArticle += "</tr>";
        }

        for (var i = 0; i < articlesList.length; i++) {
            htmlArticle += "<tr align='center'>";
            htmlArticle += "<td>" + articlesList[i].id + "</td>";
            htmlArticle += "<td>" + articlesList[i].name + "</td>";
            htmlArticle += "</tr>";
        }

        htmlArticle += "</table>";

        document.getElementById("wrapper").innerHTML += htmlArticle;
    });
}
