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

function getOperations() {
    fetch("http://localhost:8080/operations/all")
        .then( (response) => {
            if(response.status >= 400){
                console.log("Error occurred");
                return Promise.reject();
            }
            return response.json();
        }).then(function (operationsList) {

        var htmlOperations = "";

        htmlOperations += "<table id='operations' border = '1' align='center'>";
        htmlOperations += "<tr align='center'>";
        htmlOperations += "<th width=80px>id</th>";
        htmlOperations += "<th width=120px><a href=\"table-articlesview.html\">article_id</a></th>";
        htmlOperations += "<th width=95px>debit</th>";
        htmlOperations += "<th width=95px>credit</th>";
        htmlOperations += "<th width=110px>create_date</th>";
        htmlOperations += "<th width=105px><a href=\"table-balanceview.html\">balance_id</a></th>";
        htmlOperations += "</tr>";

        if (operationsList.length === 0) {
            htmlOperations += "<tr>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "<td></br></td>";
            htmlOperations += "</tr>";
        }

        for (var i = 0; i < operationsList.length; i++) {
            htmlOperations += "<tr align='center'>";
            htmlOperations += "<td>" + operationsList[i].id + "</td>";
            htmlOperations += "<td>" + operationsList[i].article.id + " (" + operationsList[i].article.name + ")" + "</td>";
            htmlOperations += "<td>" + operationsList[i].debit + "</td>";
            htmlOperations += "<td>" + operationsList[i].credit + "</td>";
            htmlOperations += "<td>" + operationsList[i].createDate + "</td>";
            htmlOperations += "<td>" + operationsList[i].balance.id + "</td>";
            htmlOperations += "</tr>";
        }

        htmlOperations += "</table>"

        document.getElementById("wrapper").innerHTML += htmlOperations;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}
