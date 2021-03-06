function unAuthorize() {
    localStorage.clear();
    window.location.href = "./index.html";
}


async function getOperations() {
    fetch("http://localhost:8080/operations/all", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    })
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
        htmlOperations += "<th width=120px><a href=\"table-articles.html\">article_id</a></th>";
        htmlOperations += "<th width=95px>debit</th>";
        htmlOperations += "<th width=95px>credit</th>";
        htmlOperations += "<th width=110px>create_date</th>";
        htmlOperations += "<th width=105px><a href=\"table-balance.html\">balance_id</a></th>";
        htmlOperations += "<th></br></th>"
        htmlOperations += "<th></br></th>"
        htmlOperations += "</tr>";

        for (var i = 0; i < operationsList.length; i++) {
            htmlOperations += "<tr align='center'>";
            htmlOperations += "<td>" + operationsList[i].id + "</td>";
            htmlOperations += "<td>" + operationsList[i].article.id + "(" + operationsList[i].article.name + ")" + "</td>";
            htmlOperations += "<td>" + operationsList[i].debit + "</td>";
            htmlOperations += "<td>" + operationsList[i].credit + "</td>";
            htmlOperations += "<td>" + operationsList[i].createDate + "</td>";
            htmlOperations += "<td>" + operationsList[i].balance.id + "</td>";
            htmlOperations += "<td id=\"d" + operationsList[i].id + "\"><i onclick='deleteOperation(" + operationsList[i].id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "<td id=\"e" + operationsList[i].id + "\"><i onclick='editOperation(" + operationsList[i].id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "</tr>";
        }

        htmlOperations += "<tr>";
        htmlOperations += "<td align='center'><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "</tr>";
        htmlOperations += "</table>";

        document.getElementById("wrapper").innerHTML += htmlOperations;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}

async function openAdd() {
    var htmlOperations = "";
    document.getElementById("input").innerHTML = htmlOperations;
    htmlOperations += "<p align='center'>";
    htmlOperations += "<lable class='title'> Credit: ";
    htmlOperations += "<input id=\"credit\" class=\"textfield\" type=\"number\" min='0' placeholder=\"0\">";
    htmlOperations += "</label>";
    htmlOperations += "<lable class='title'>    Debit: ";
    htmlOperations += "<input id=\"debit\" class=\"textfield\" type=\"number\" min='0' placeholder=\"0\">";
    htmlOperations += "</label>";
    htmlOperations += "</p>";
    document.getElementById("input").innerHTML += htmlOperations;

    await fetch("http://localhost:8080/articles/all", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status >= 400) {
            console.log("Error occurred");
            return Promise.reject();
        }
        return response.json();
    }).then(function (articlesList) {
        var htmlOperations = "";
        htmlOperations += "<p align='center'>";
        htmlOperations += "<label class='title'> Create date: ";
        htmlOperations += "<input id=\"date\" type=\"date\" name='createDate' value=\"2018-01-01\" min=\"2018-01-01\" max=\"2021-12-31\" >";
        htmlOperations += "</label>";
        htmlOperations += "<lable class='title'> Article: ";
        htmlOperations += "<select id='article'>"
        htmlOperations += "<option value=' '></option>";
        for (var i = 0; i < articlesList.length; i++) {
            htmlOperations += "<option value=\"" + articlesList[i].name + "\">" + articlesList[i].name + "</option>";
        }
        htmlOperations += "</select>"
        htmlOperations += "</label>";
        htmlOperations += "</p>";

        document.getElementById("input").innerHTML += htmlOperations;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });

    await fetch("http://localhost:8080/balance/all", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status >= 400) {
            console.log("Error occurred");
            return Promise.reject();
        }
        return response.json();
    }).then(function (balanceList) {
        var htmlOperations = "";
        htmlOperations += "<p align='center'>";
        htmlOperations += "<select id='balance'>"
        for (var i = 0; i < balanceList.length; i++) {
            htmlOperations += "<option value=\"" + balanceList[i].id + "\">id:" + balanceList[i].id + " amount:" + balanceList[i]["amount"]+ "</option>";
        }
        htmlOperations += "<option value='new'>Add new balance</option>";
        htmlOperations += "</select>"
        htmlOperations += " <button style width=400px onclick='addHandler()'>Add</button>";
        htmlOperations += "</p>";

        document.getElementById("input").innerHTML += htmlOperations;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}

async function getArticleByName(articleName) {
    await fetch("http://localhost:8080/articles/name/" + articleName, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then((response) => {
        if (response.status === 404) {
            console.log("Article is not found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then((j) => JSON.stringify(j))
        .then((data) => JSON.parse(data))
        .then((obj) => {
            localStorage.setItem("aid", obj["id"]);
        })
        .catch(() => console.log("Error occured"));

}

async function getBalanceInfo(id) {
    await fetch("http://localhost:8080/balance/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then((response) => {
        if (response.status === 404) {
            console.log("Balance is not found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.")
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then((j) => JSON.stringify(j))
        .then((data) => JSON.parse(data))
        .then((obj) => {
            localStorage.setItem("bamount", obj["amount"]);
            localStorage.setItem("bdate", obj.createDate);
            localStorage.setItem("bcredit", obj.credit);
            localStorage.setItem("bdebit", obj.debit);
        })
        .catch(() => console.log("Error occurred"));
}

async function addNewBalance(deb, cred, createDate, amount) {
    var token = "Bearer " + localStorage.getItem("Authentication");
    await fetch("http://localhost:8080/balance/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            debit: deb,
            credit: cred,
            createDate: createDate,
            amount: amount
        })
    }).then((response) => {
        if (response.status === 403) {
            console.log("Error occured");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then((j) => JSON.stringify(j))
        .then((data) => JSON.parse(data))
        .then((obj) => localStorage.setItem("bid", obj["id"]))
        .catch(() => console.log("Error occurred"));
}

async function updateBalance(id, deb, cred, createDate, amount) {
    var token = "Bearer " + localStorage.getItem("Authentication");
    await fetch("http://localhost:8080/balance/id/" + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            id : id,
            debit: deb,
            credit: cred,
            createDate: createDate,
            amount: amount
        })
    }).then((response) => {
        if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).catch(() => console.log("Error occured"));
}

async function addHandler() {
    if (localStorage.getItem("Authentication") == '' || localStorage.getItem("Authentication") == null) {
        alert("You are not authorized");
        localStorage.clear();
        window.location.href = "./login.html";
    } else {
        var articleName = document.getElementById("article").value;
        var debitTMP = document.getElementById("debit").value;
        var creditTMP = document.getElementById("credit").value;
        var deb = 0;
        if (debitTMP.replace(/\s+/g, ' ').trim() !== '') {
            deb = Number(debitTMP);
        }
        var cred = 0;
        if (creditTMP.replace(/\s+/g, ' ').trim() !== '') {
            cred = Number(creditTMP);
        }
        var create = document.getElementById("date").value;
        if ((articleName.replace(/\s+/g, ' ').trim() == '') || (create.replace(/\s+/g, ' ').trim() == '')) {
            alert("Enter data please");
        } else {
            if ((isNaN(deb)) || (isNaN(cred)) || deb < 0 || cred < 0) {
                alert("Inappropriate data. Debit and credit are nonnegative numbers");
            } else if (deb === 0 && cred === 0) {
                alert("Inappropriate data. Debit and credit can't be both null");
            } else {
                var year = create.slice(0, 4);
                var month = create.slice(5, 7);
                var day = create.slice(8, 10);
                var createdate = day + "/" + month + "/" + year;
                if (year < 2018 || year > 2021) {
                    alert("Inappropriate year");
                } else {
                    var token = "Bearer " + localStorage.getItem("Authentication");
                    localStorage.setItem("bid", '');
                    localStorage.setItem("bamount", '');
                    localStorage.setItem("bdate", '');
                    selecterHandler();
                    var amount = deb - cred;
                    if (localStorage.getItem("bid") == '') {
                        if (amount < 0) {
                            alert("Amount can't be less than zero");
                            return;
                        }
                    } else {
                        await getBalanceInfo(localStorage.getItem("bid"));
                        amount += Number(localStorage.getItem("bamount"));
                        if (amount < 0) {
                            alert("Amount can't be less than zero");
                            return;
                        }
                        if (Number(localStorage.getItem("bdate").slice(6, 10)) > year) {
                            alert("Inappropriate year. Create new balance if you want to save this date.");
                            return ;
                        } else if(Number(localStorage.getItem("bdate").slice(6, 10)) == year && Number(localStorage.getItem("bdate").slice(3, 5)) > month) {
                            alert("Inappropriate month. Create new balance if you want to save this date.");
                            return ;
                        } else if(Number(localStorage.getItem("bdate").slice(6, 10)) == year &&
                            Number(localStorage.getItem("bdate").slice(3, 5)) == month && Number(localStorage.getItem("bdate").slice(0, 2)) > day) {
                            alert("Inappropriate day. Create new balance if you want to save this date.");
                            return ;
                        }
                    }
                    await getArticleByName(articleName);

                    if (localStorage.getItem("bid") == '' || localStorage.getItem("bid") == null) {
                        await addNewBalance(deb, cred, createdate, amount);
                    }

                    await fetch("http://localhost:8080/operations/add", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            debit: deb,
                            credit: cred,
                            createDate: createdate,
                            article: {
                                id : localStorage.getItem("aid"),
                                name: articleName
                            },
                            balance: {
                                id : localStorage.getItem("bid"),
                                debit: deb + Number(localStorage.getItem("bdebit")),
                                credit: cred + Number(localStorage.getItem("bcredit")),
                                createDate: createdate,
                                amount: amount
                            }
                        })
                    }).then((response) => {
                        if (response.status === 403){
                            console.log("Error occurred");
                            alert("Your access expired or you haven't entered. Log in please.");
                            unAuthorize();
                        } else if (response.status >= 400) {
                            return Promise.reject();
                        }
                        return response.json();
                    }).catch(() => console.log("Error occurred"));

                    await updateBalance(localStorage.getItem("bid"), deb + Number(localStorage.getItem("bdebit")),
                        cred + Number(localStorage.getItem("bcredit")), localStorage.getItem("bdate"), amount);
                    window.location.href = "./table.html";
                }

            }
        }
    }
}

function selecterHandler() {
    var selected = document.getElementById("balance").value;
    if (selected == 'new') {
        localStorage.setItem("bid", '');
    } else {
        localStorage.setItem("bid", selected);
    }
}

function getOperationByID(id) {
    fetch("http://localhost:8080/operations/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No operations were found");
            return Promise.reject();
        }  else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then(function (operationsList) {
        var htmlOperations = "";
        document.getElementById("input").innerHTML = htmlOperations;
        document.getElementById("wrapper").innerHTML = htmlOperations;

        htmlOperations += "<table id='operations' border = '1' align='center'>";
        htmlOperations += "<tr align='center'>";
        htmlOperations += "<th width=80px>id</th>";
        htmlOperations += "<th width=120px><a href=\"table-articles.html\">article_id</a></th>";
        htmlOperations += "<th width=95px>debit</th>";
        htmlOperations += "<th width=95px>credit</th>";
        htmlOperations += "<th width=110px>create_date</th>";
        htmlOperations += "<th width=105px><a href=\"table-balance.html\">balance_id</a></th>";
        htmlOperations += "<th></br></th>";
        htmlOperations += "<th></br></th>";

        htmlOperations += "</tr>";
        htmlOperations += "<tr align='center'>";
        htmlOperations += "<td>" + operationsList.id + "</td>";
        htmlOperations += "<td>" + operationsList.article.id + "(" + operationsList.article.name + ")" + "</td>";
        htmlOperations += "<td>" + operationsList.debit + "</td>";
        htmlOperations += "<td>" + operationsList.credit + "</td>";
        htmlOperations += "<td>" + operationsList.createDate + "</td>";
        htmlOperations += "<td>" + operationsList.balance.id + "</td>";
        htmlOperations += "<td id=\"d" + operationsList.id + "\"><i onclick='deleteOperation(" + operationsList.id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "<td id=\"e" + operationsList.id + "\"><i onclick='editOperation(" + operationsList.id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "</tr>";


        htmlOperations += "<tr align='center'>";
        htmlOperations += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "</tr>";
        htmlOperations += "</table>";

        document.getElementById("wrapper").innerHTML += htmlOperations;
    }).catch(() => console.log("Error occured"));
}

function getOperationsByArticleId(id) {
    fetch("http://localhost:8080/operations/article/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No operations were found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then(function (operationsList) {
        var htmlOperations = "";
        document.getElementById("input").innerHTML = htmlOperations;
        document.getElementById("wrapper").innerHTML = htmlOperations;

        htmlOperations += "<table id='operations' border = '1' align='center'>";
        htmlOperations += "<tr align='center'>";
        htmlOperations += "<th width=80px>id</th>";
        htmlOperations += "<th width=120px><a href=\"table-articles.html\">article_id</a></th>";
        htmlOperations += "<th width=95px>debit</th>";
        htmlOperations += "<th width=95px>credit</th>";
        htmlOperations += "<th width=110px>create_date</th>";
        htmlOperations += "<th width=105px><a href=\"table-balance.html\">balance_id</a></th>";
        htmlOperations += "<th></th>";
        htmlOperations += "<th></th>";
        htmlOperations += "</tr>";

        for (var i = 0; i < operationsList.length; i++) {
            htmlOperations += "<tr align='center'>";
            htmlOperations += "<td>" + operationsList[i].id + "</td>";
            htmlOperations += "<td>" + operationsList[i].article.id + "(" + operationsList[i].article.name + ")" + "</td>";
            htmlOperations += "<td>" + operationsList[i].debit + "</td>";
            htmlOperations += "<td>" + operationsList[i].credit + "</td>";
            htmlOperations += "<td>" + operationsList[i].createDate + "</td>";
            htmlOperations += "<td>" + operationsList[i].balance.id + "</td>";
            htmlOperations += "<td id=\"d" + operationsList[i].id + "\"><i onclick='deleteOperation(" + operationsList[i].id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "<td id=\"e" + operationsList[i].id + "\"><i onclick='editOperation(" + operationsList[i].id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "</tr>";
        }

        htmlOperations += "<tr align='center'>";
        htmlOperations += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "</tr>";
        htmlOperations += "</table>";

        document.getElementById("wrapper").innerHTML += htmlOperations;
    }).catch(() => console.log("Error occured"));
}

function getOperationsByBalanceId(id) {
    fetch("http://localhost:8080/operations/balance/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status === 404) {
            alert("No operations were found");
            return Promise.reject();
        } else if (response.status === 403){
            console.log("Error occurred");
            alert("Your access expired or you haven't entered. Log in please.");
            unAuthorize();
        } else if (response.status >= 400) {
            return Promise.reject();
        }
        return response.json();
    }).then(function (operationsList) {
        var htmlOperations = "";
        document.getElementById("input").innerHTML = htmlOperations;
        document.getElementById("wrapper").innerHTML = htmlOperations;

        htmlOperations += "<table id='operations' border = '1' align='center'>";
        htmlOperations += "<tr align='center'>";
        htmlOperations += "<th width=80px>id</th>";
        htmlOperations += "<th width=120px><a href=\"table-articles.html\">article_id</a></th>";
        htmlOperations += "<th width=95px>debit</th>";
        htmlOperations += "<th width=95px>credit</th>";
        htmlOperations += "<th width=110px>create_date</th>";
        htmlOperations += "<th width=105px><a href=\"table-balance.html\">balance_id</a></th>";
        htmlOperations += "<th></th>";
        htmlOperations += "<th></th>";
        htmlOperations += "</tr>";

        for (var i = 0; i < operationsList.length; i++) {
            htmlOperations += "<tr align='center'>";
            htmlOperations += "<td>" + operationsList[i].id + "</td>";
            htmlOperations += "<td>" + operationsList[i].article.id + "(" + operationsList[i].article.name + ")" + "</td>";
            htmlOperations += "<td>" + operationsList[i].debit + "</td>";
            htmlOperations += "<td>" + operationsList[i].credit + "</td>";
            htmlOperations += "<td>" + operationsList[i].createDate + "</td>";
            htmlOperations += "<td>" + operationsList[i].balance.id + "</td>";
            htmlOperations += "<td id=\"d" + operationsList[i].id + "\"><i onclick='deleteOperation(" + operationsList[i].id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "<td id=\"e" + operationsList[i].id + "\"><i onclick='editOperation(" + operationsList[i].id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            htmlOperations += "</tr>";
        }

        htmlOperations += "<tr align='center'>";
        htmlOperations += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "<td></br></td>";
        htmlOperations += "</tr>";
        htmlOperations += "</table>";

        document.getElementById("wrapper").innerHTML += htmlOperations;
    }).catch(() => console.log("Error occurred"));
}

function searchHandler() {
    var search = document.getElementById("searchField").value;
    var selected = document.getElementById("selecter").value;
    if (search.replace(/\s+/g, ' ').trim() == '') {
        window.location.href = "./table.html";
    } else if (isNaN(Number(search)) || !Number.isInteger(Number(search)) || search < 1) {
        alert("Id must be a positive integer");
    } else if (selected == "byId") {
        getOperationByID(search);
    } else if (selected == "byArticleId") {
        getOperationsByArticleId(search);
    } else if (selected == "byBalanceId") {
        getOperationsByBalanceId(search);
    }
}

async function deleteOperation(id) {
    await fetch("http://localhost:8080/operations/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if(response.status === 403) {
            alert("Your token was expired. Log in again.");
            console.log("Error occurred");
            unAuthorize();
        }else if(response.status >= 400){
            console.log("Error occurred");
            alert("Error")
            return Promise.reject();
        }
        return response.json();
    }).then( (operation) => {
        localStorage.setItem("odebit", operation.debit);
        localStorage.setItem("ocredit", operation.credit);
        localStorage.setItem("bid", operation.balance.id);
    }).catch(() => console.log("Error occurred"));

    await getBalanceInfo(localStorage.getItem("bid"));

    await fetch("http://localhost:8080/operations/id/" + id, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if(response.status === 403) {
            alert("Your token was expired. Log in again.");
            console.log("Error occurred");
            unAuthorize();
        }else if(response.status >= 400){
            console.log("Error occurred");
            alert("Error")
            return Promise.reject();
        }
        return response;
    }).catch(() => console.log("Error occurred"));

    var amount = Number(localStorage.getItem("bamount")) - Number(localStorage.getItem("odebit")) + Number(localStorage.getItem("ocredit"));
    var credit = Number(localStorage.getItem("bcredit")) - Number(localStorage.getItem("ocredit"));
    var debit = Number(localStorage.getItem("bdebit")) - Number(localStorage.getItem("odebit"));
    await updateBalance(Number(localStorage.getItem("bid")), debit, credit, localStorage.getItem("bdate"), amount);
    window.location.href = "./table.html";
}

async function openEdit() {
    var htmlOperations = "";
    document.getElementById("input").innerHTML = htmlOperations;
    htmlOperations += "<p align='center'>";
    htmlOperations += "<lable class='title'>  Debit: ";
    htmlOperations += "<input id=\"debit\" class=\"textfield\" type=\"number\" min='0' placeholder=\"" + localStorage.getItem("odebit") + "\">"
    htmlOperations += "</label>";
    htmlOperations += "<lable class='title'> Credit: ";
    htmlOperations += "<input id=\"credit\" class=\"textfield\" type=\"number\" min='0' placeholder=\"" + localStorage.getItem("ocredit") + "\">";
    htmlOperations += "</label>";
    htmlOperations += "</p>";
    document.getElementById("input").innerHTML += htmlOperations;

    await fetch("http://localhost:8080/articles/all", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if (response.status >= 400) {
            console.log("Error occurred");
            return Promise.reject();
        }
        return response.json();
    }).then(function (articlesList) {
        var htmlOperations = "";
        var create = localStorage.getItem("odate");
        var day = create.slice(0, 2);
        var month = create.slice(3, 5);
        var year = create.slice(6, 10);
        var createdate = year + "-" + month + "-" + day;
        var minCreateTMP = localStorage.getItem("bdate");
        var dayMIN = minCreateTMP.slice(0, 2);
        var monthMIN = minCreateTMP.slice(3, 5);
        var yearMIN = minCreateTMP.slice(6, 10);
        var minCreate = yearMIN + "-" + monthMIN + "-" + dayMIN;
        htmlOperations += "<p align='center'>";
        htmlOperations += "<label class='title'> Create date: ";
        htmlOperations += "<input id=\"date\" type=\"date\" name='createDate' value=\"" + createdate + "\" min=\"" + minCreate + "\" max=\"2021-12-31\" >";
        htmlOperations += "</label>";
        htmlOperations += "<lable class='title'> Article: ";
        htmlOperations += "<select id='article'>"
        htmlOperations += "<option value=' '></option>";
        for (var i = 0; i < articlesList.length; i++) {
            if (articlesList[i].name === localStorage.getItem("oarticle")) {
                htmlOperations += "<option selected=\"selected\" value=\"" + articlesList[i].name + "\">" + articlesList[i].name + "</option>";
            } else {
                htmlOperations += "<option value=\"" + articlesList[i].name + "\">" + articlesList[i].name + "</option>";
            }
        }
        htmlOperations += "</select>"
        htmlOperations += "</label>";
        htmlOperations += "</p>";
        htmlOperations += "<p align='center'>";
        htmlOperations += "<label class='title'> Current amount: " + localStorage.getItem("bamount") + "</label>";;
        htmlOperations += " <button style width=400px onclick='editHandler()'>EDIT</button>";
        htmlOperations += "</p>";

        document.getElementById("input").innerHTML += htmlOperations;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });

}

async function editHandler() {
    if (localStorage.getItem("Authentication") == '' || localStorage.getItem("Authentication") == null) {
        alert("You are not authorized");
        localStorage.clear();
        window.location.href = "./login.html";
    } else {
        var articleName = document.getElementById("article").value;
        var debitTMP = document.getElementById("debit").value;
        var creditTMP = document.getElementById("credit").value;
        var deb = Number(localStorage.getItem("odebit"));
        if (debitTMP.replace(/\s+/g, ' ').trim() !== '') {
            deb = Number(debitTMP);
        }
        var cred = Number(localStorage.getItem("ocredit"));
        if (creditTMP.replace(/\s+/g, ' ').trim() !== '') {
            cred = Number(creditTMP);
        }
        var create = document.getElementById("date").value;
        if (articleName.replace(/\s+/g, ' ').trim() == '') {
            alert("Choose article please");
            return;
        }
        if (create.replace(/\s+/g, ' ').trim() == '') {
            alert("Create date is not entered");
        } else {
            if ((isNaN(deb)) || (isNaN(cred)) || deb < 0 || cred < 0) {
                alert("Inappropriate data. Debit and credit are non negative numbers");
            } else if (deb === 0 && cred === 0) {
                alert("Inappropriate data. Debit and credit can't be both null");
            } else if (Number(localStorage.getItem("bamount")) + deb - cred -
                Number(localStorage.getItem("odebit")) + Number(localStorage.getItem("ocredit")) < 0) {
                alert("Inappropriate data. Amount can't be negative");
            } else {
                var year = create.slice(0, 4);
                var month = create.slice(5, 7);
                var day = create.slice(8, 10);
                var createdate = day + "/" + month + "/" + year;
                if (year < 2018 || year > 2021) {
                    alert("Inappropriate year");
                } else {
                    var token = "Bearer " + localStorage.getItem("Authentication");
                    localStorage.setItem("aid", '');
                    if (Number(localStorage.getItem("bdate").slice(6, 10)) > year) {
                        alert("Inappropriate year. Balance date can't be newer than operation date.");
                        return;
                    } else if (Number(localStorage.getItem("bdate").slice(6, 10)) == year && Number(localStorage.getItem("bdate").slice(3, 5)) > month) {
                        alert("Inappropriate month. Balance date can't be newer than operation date.");
                        return;
                    } else if (Number(localStorage.getItem("bdate").slice(6, 10)) == year &&
                        Number(localStorage.getItem("bdate").slice(3, 5)) == month && Number(localStorage.getItem("bdate").slice(0, 2)) > day) {
                        alert("Inappropriate day. Balance date can't be newer than operation date.");
                        return;
                    }

                    await getArticleByName(articleName);

                    if (localStorage.getItem("bid") == '' || localStorage.getItem("bid") == null) {
                        await addNewBalance(deb, cred, createdate, amount);
                    }
                    var debit = Number(localStorage.getItem("bdebit")) - Number(localStorage.getItem("odebit")) + Number(deb);
                    var credit = Number(localStorage.getItem("bcredit")) - Number(localStorage.getItem("ocredit")) + Number(cred);
                    var amount = Number(localStorage.getItem("bamount")) + Number(deb) - Number(cred) -
                        Number(localStorage.getItem("odebit")) + Number(localStorage.getItem("ocredit"));
                    await fetch("http://localhost:8080/operations/id/" + localStorage.getItem("oid"), {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            id : localStorage.getItem("oid"),
                            debit: deb,
                            credit: cred,
                            createDate: createdate,
                            article: {
                                id: localStorage.getItem("aid"),
                                name: articleName
                            },
                            balance: {
                                id: localStorage.getItem("bid"),
                                debit: debit,
                                credit: credit,
                                createDate: localStorage.getItem("bdate"),
                                amount: amount
                            }
                        })
                    }).then((response) => {
                        if (response.status === 403) {
                            console.log("Error occurred");
                            alert("Your access expired or you haven't entered. Log in please.");
                            unAuthorize();
                        } else if (response.status >= 400) {
                            alert("Unexpected error");
                            return Promise.reject();
                        }
                        return response.json();
                    }).catch(() => console.log("Error occurred"));

                    window.location.href = "./table.html";
                }
            }
        }
    }
}

async function editOperation(id) {
    await fetch("http://localhost:8080/operations/id/" + id, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then((response) => {
        if (response.status === 403) {
            alert("Your token was expired. Log in again.");
            console.log("Error occurred");
            unAuthorize();
        } else if (response.status >= 400) {
            console.log("Error occurred");
            alert("Error")
            return Promise.reject();
        }
        return response.json();
    }).then((operation) => {
        localStorage.setItem("oid", operation.id);
        localStorage.setItem("oarticle", operation.article.name);
        localStorage.setItem("odebit", operation.debit);
        localStorage.setItem("ocredit", operation.credit);
        localStorage.setItem("odate", operation.createDate);
        localStorage.setItem("bid", operation.balance.id);
        localStorage.setItem("bdebit", operation.balance.debit);
        localStorage.setItem("bcredit", operation.balance.credit);
        localStorage.setItem("bamount", operation.balance.amount);
        localStorage.setItem("bamount", operation.balance.amount);
        localStorage.setItem("bdate", operation.balance.createDate);
    }).catch(() => console.log("Error occurred"));
    openEdit();
}
