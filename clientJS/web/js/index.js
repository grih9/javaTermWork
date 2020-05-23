function clickHandler() {
    try {
        if (localStorage.getItem("Authentication") !== null) {
            window.location.href = "table.html";
        } else {
            localStorage.clear();
            window.location.href = "tableview.html";
        }
    } catch (e) {
        alert(e.stack);
    }
}

function isLog() {
    try {
        if (localStorage.getItem("Authentication") !== null) {
            alert("You have already logged in");
            window.location.href = "table.html";
        } else {
            localStorage.clear();
            window.location.href = "login.html";
        }
    } catch (e) {
        alert(e.stack);
    }
}
