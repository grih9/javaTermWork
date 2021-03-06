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

function getBalance() {
    fetch("http://localhost:8080/balance/all")
        .then((response) => {
            if (response.status >= 400) {
                console.log("Error occurred");
                alert("You have no access. Log in please.")
                localStorage.clear();
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
        htmlBalance += "</tr>";

        if (balanceList.length === 0) {
            htmlBalance += "<tr>";
            htmlBalance+= "<td></br></td>";
            htmlBalance+= "<td></br></td>";
            htmlBalance+= "<td></br></td>";
            htmlBalance+= "<td></br></td>";
            htmlBalance+= "<td></br></td>";
            htmlBalance += "</tr>";
        }

        for (var i = 0; i < balanceList.length; i++) {
            htmlBalance += "<tr align='center'>";
            htmlBalance += "<td>" + balanceList[i]["id"] + "</td>";
            htmlBalance += "<td>" + balanceList[i].debit + "</td>";
            htmlBalance += "<td>" + balanceList[i].credit + "</td>";
            htmlBalance += "<td>" + balanceList[i].createDate + "</td>";
            htmlBalance += "<td>" + balanceList[i]["amount"] + "</td>";
            htmlBalance += "</tr>";
        }

        htmlBalance += "</table>";

        document.getElementById("wrapper").innerHTML += htmlBalance;
    }).catch(() => {
        console.log("Error occurred");
        alert("Your access expired or you haven't entered. Log in please.")
        unAuthorize();
    });
}
