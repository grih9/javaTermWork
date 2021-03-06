function unAuthorize() {
    localStorage.clear();
    window.location.href = "./index.html";
}

function getBalance() {
    fetch("http://localhost:8080/balance/all", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("Authentication")
        }
    }).then((response) => {
        if(response.status >= 400) {
            console.log("Error occured");
            return Promise.reject();
        }
        return response.json();
    }).then(function (balanceList) {
        var htmlBalance = "";

        htmlBalance += "<table id='balance' border = '1' align='center'>";
        htmlBalance += "<tr align='center'>";
        htmlBalance += "<th width=80px>id</th>";
        htmlBalance += "<th width=95px>debit</th>";
        htmlBalance += "<th width=95px>credit</th>";
        htmlBalance += "<th width=110px>create_date</th>";
        htmlBalance += "<th width=105px>amount</th>";
        htmlBalance += "<th></br></th>"
        htmlBalance += "<th></br></th>"
        htmlBalance += "</tr>";

        for (var i = 0; i < balanceList.length; i++) {
            htmlBalance += "<tr align='center'>";
            htmlBalance += "<td>" + balanceList[i]["id"] + "</td>";
            htmlBalance += "<td>" + balanceList[i].debit + "</td>";
            htmlBalance += "<td>" + balanceList[i].credit + "</td>";
            htmlBalance += "<td>" + balanceList[i].createDate + "</td>";
            htmlBalance += "<td>" + balanceList[i]["amount"] + "</td>";
            htmlBalance += "<td id=\"d" + balanceList[i].id + "\"><i onclick='deleteBalance(" + balanceList[i].id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlBalance += "<td id=\"e" + balanceList[i].id + "\"><i onclick='editBalance(" + balanceList[i].id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            htmlBalance += "</tr>";
        }

        htmlBalance += "<tr align='center'>";
        htmlBalance += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "<td></br></td>";
        htmlBalance += "</tr>";
        htmlBalance += "</table>";

        document.getElementById("wrapper").innerHTML += htmlBalance;
    }).catch(() => {
        console.log("Error occured");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}

async function deleteBalance(id) {
    await fetch("http://localhost:8080/balance/id/" + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then((response) => {
        if (response.status === 403) {
            alert("Your token was expired. Log in again.");
            console.log("Error occurred");
            return Promise.reject();
        } else if (response.status === 500) {
            console.log("Error linked");
            alert("You can't delete balance with operations. Firstly, delete all operations linked to this balance");
            return Promise.reject();
        } else if (response.status >= 400) {
            console.log("Error occurred");
            alert("Unexpected error while deleting")
            return Promise.reject();
        }
        return response;
    }).then(() => window.location.href = "./table-balance.html")
        .catch(() => console.log("Error occurred"));
}

function openAdd() {
    var htmlOP = "";
    document.getElementById("input").innerHTML = htmlOP;
    htmlOP += "<p align='center'>";
    htmlOP += "<lable class='title'> Initial amount: ";
    htmlOP += "<input id=\"amount\" class=\"textfield\" type=\"number\" min='0' placeholder='0' >";
    htmlOP += "</label>";
    htmlOP += "<label class='title'> Create date: ";
    htmlOP += "<input id=\"date\" type=\"date\" name='createDate' value=\"2018-01-01\" min=\"2018-01-01\" max=\"2021-12-31\" >";
    htmlOP += "</label>";
    htmlOP += "</p>";
    htmlOP += "<p align='center'>";
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
        var amount = document.getElementById("amount").value;
        var create = document.getElementById("date").value;

        if (amount.replace(/\s+/g, ' ').trim() == '') {
            amount = 0;
        }
        if ((create.replace(/\s+/g, ' ').trim() == '') || (isNaN(amount)) || (amount < 0)) {
            alert("Amount must be non-negative number");
        } else {
            var year = create.slice(0, 4);
            var month = create.slice(5, 7);
            var day = create.slice(8, 10);
            var createdate = day + "/" + month + "/" + year;
            if (year < 2018 || year > 2021) {
                alert("Inappropriate year");
            } else {
                var token = "Bearer " + localStorage.getItem("Authentication");
                fetch("http://localhost:8080/balance/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        debit: 0,
                        credit: 0,
                        createDate: createdate,
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
                }).then(() => window.location.href = "./table-balance.html")
                    .catch(() => console.log("Error occurred"));
            }
        }
    }
}

function searchHandler() {
    var search = document.getElementById("searchField").value;
    if (search.replace(/\s+/g, ' ').trim() == '') {
        window.location.href = "./table-balance.html";
    } else if (isNaN(Number(search)) || !Number.isInteger(Number(search)) || search < 1) {
        alert("Id must be a positive integer");
    } else {
        fetch("http://localhost:8080/balance/id/" + search, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("Authentication")
            }
        }).then( (response) => {
            if (response.status === 404) {
                alert("No balance was found");
                return Promise.reject();
            }  else if (response.status === 403){
                console.log("Error occured");
                alert("Your access expired or you haven't entered. Log in please.");
                unAuthorize();
            } else if (response.status >= 400) {
                return Promise.reject();
            }
            return response.json();
        }).then(function (balance) {
            var htmlBalance = "";
            document.getElementById("input").innerHTML = htmlBalance;
            document.getElementById("wrapper").innerHTML = htmlBalance;

            htmlBalance += "<table id='balance' border = '1' align='center'>";
            htmlBalance += "<tr align='center'>";
            htmlBalance += "<th width=80px>id</th>";
            htmlBalance += "<th width=95px>debit</th>";
            htmlBalance += "<th width=95px>credit</th>";
            htmlBalance += "<th width=110px>create_date</th>";
            htmlBalance += "<th width=105px>amount</th>";
            htmlBalance += "<th></br></th>";
            htmlBalance += "<th></br></th>";
            htmlBalance += "</tr>";

            htmlBalance += "<tr align='center'>";
            htmlBalance += "<td>" + balance["id"] + "</td>";
            htmlBalance += "<td>" + balance.debit + "</td>";
            htmlBalance += "<td>" + balance.credit + "</td>";
            htmlBalance += "<td>" + balance.createDate + "</td>";
            htmlBalance += "<td>" + balance["amount"] + "</td>";
            htmlBalance += "<td id=\"d" + balance.id + "\"><i onclick='deleteBalance(" + balance.id + ")' class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></td>";
            htmlBalance += "<td id=\"e" + balance.id + "\"><i onclick='editBalance(" + balance.id + ")' class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></td>";
            htmlBalance += "</tr>";


            htmlBalance += "<tr align='center'>";
            htmlBalance += "<td><i onclick='openAdd()' class=\"fa fa-plus\" aria-hidden=\"true\"></i></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "<td></br></td>";
            htmlBalance += "</tr>";
            htmlBalance += "</table>";

            document.getElementById("wrapper").innerHTML += htmlBalance;
        }).catch(() => console.log("Error occurred"));
    }
}

async function editBalance(id) {
    await fetch("http://localhost:8080/balance/id/" + id, {
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
    }).then((balance) => {
        localStorage.setItem("bid", balance.id);
        localStorage.setItem("bdebit", balance.debit);
        localStorage.setItem("bcredit", balance.credit);
        localStorage.setItem("bamount", balance.amount);
        localStorage.setItem("bdate", balance.createDate);
    }).catch(() => console.log("Error occurred"));
    openEdit(id, localStorage.getItem("bdate"));
}

async function openEdit(id, date) {
    var htmlBalance = "";
    document.getElementById("input").innerHTML = htmlBalance;
    var create = date;
    var maxCreateTMP = "2021-12-31";
    var dayMAX = "31";
    var monthMAX = "12";
    var yearMAX = "2021";
    var day = create.slice(0, 2);
    var month = create.slice(3, 5);
    var year = create.slice(6, 10);
    var createdate = year + "-" + month + "-" + day;

    await fetch("http://localhost:8080/operations/all", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("Authentication")
        }
    }).then( (response) => {
        if(response.status >= 400) {
            console.log("Error occured");
            return Promise.reject();
        }
        return response.json();
    }).then(function (operationsList) {
        for (var i = 0; i < operationsList.length; i++) {
            if (Number(operationsList[i].balance.id) === Number(id)) {
                var tmpDate = operationsList[i].createDate;
                var tmpday = tmpDate.slice(0, 2);
                var tmpmonth = tmpDate.slice(3, 5);
                var tmpyear = tmpDate.slice(6, 10);
                if (Number(yearMAX) > Number(tmpyear)) {
                    maxCreateTMP = tmpyear + "-" + tmpmonth + "-" + tmpday;
                    yearMAX = tmpyear;
                    monthMAX = tmpmonth;
                    dayMAX = tmpday;
                } else if(Number(yearMAX) === Number(tmpyear) && Number(monthMAX) > Number(tmpmonth)) {
                    maxCreateTMP = tmpyear + "-" + tmpmonth + "-" + tmpday;
                    yearMAX = tmpyear;
                    monthMAX = tmpmonth;
                    dayMAX = tmpday;
                } else if(Number(yearMAX) === Number(tmpyear) && Number(monthMAX) === Number(tmpmonth) && Number(dayMAX) > Number(tmpday)) {
                    maxCreateTMP = tmpyear + "-" + tmpmonth + "-" + tmpday;
                    yearMAX = tmpyear;
                    monthMAX = tmpmonth;
                    dayMAX = tmpday;
                }
            }
        }
        localStorage.setItem("maxdate", maxCreateTMP);
    }).catch(() => {
        console.log("Error occured");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });

    htmlBalance += "<p align='center'>";
    htmlBalance += "<label class='title'> Create date: ";
    htmlBalance += "<input id=\"date\" type=\"date\" name='createDate' value=\"" + createdate + "\" min=\"2018-01-01\" max=\"" + maxCreateTMP + "\" >";
    htmlBalance += "</label>";
    htmlBalance += " <button style width=400px onclick='editHandler()'>EDIT</button>";
    htmlBalance += "</p>";

    document.getElementById("input").innerHTML += htmlBalance;
}

function editHandler() {
    if (localStorage.getItem("Authentication") == '' || localStorage.getItem("Authentication") == null) {
        alert("You are not authorized");
        localStorage.clear();
        window.location.href = "./login.html";
    } else {
        var create = document.getElementById("date").value;
        var createDate = localStorage.getItem("bdate");
        if (create.replace(/\s+/g, ' ').trim() != '') {
            var year = create.slice(0, 4);
            var month = create.slice(5, 7);
            var day = create.slice(8, 10);
            createDate = day + "/" + month + "/" + year;
            if (Number(year) > Number(localStorage.getItem("maxdate").slice(0, 4))) {
                alert("Inappropriate year. Operation date can't be older than balance date");
                return;
            } else if (Number(year) === Number(localStorage.getItem("maxdate").slice(0, 4)) && Number(month) > Number(localStorage.getItem("maxdate").slice(5, 7))) {
                alert("Inappropriate month. Operation date can't be older than balance date");
                return;
            } else if (Number(year) === Number(localStorage.getItem("maxdate").slice(0, 4)) && Number(month) === Number(localStorage.getItem("maxdate").slice(5, 7))
                && Number(day) > Number(localStorage.getItem("maxdate").slice(8, 10))) {
                alert("Inappropriate day. Operation date can't be older than balance date");
                return;
            }
        }
        var token = "Bearer " + localStorage.getItem("Authentication");
        fetch("http://localhost:8080/balance/id/" + localStorage.getItem("bid"), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: localStorage.getItem("bid"),
                debit: localStorage.getItem("bdebit"),
                credit: localStorage.getItem("bcredit"),
                createDate: createDate,
                amount: localStorage.getItem("bamount")
            })
        }).then((response) => {
            if (response.status === 403) {
                console.log("Error occurred");
                alert("Your access expired or you haven't entered. Log in please.");
                unAuthorize();
            } else if (response.status >= 400) {
                alert("Unexpected error");
                console.log("Error occurred");
                return Promise.reject();
            }
            return response.json();
        }).then(() => window.location.href = "./table-balance.html")
            .catch(() => console.log("Error occurred"));
    }
}
