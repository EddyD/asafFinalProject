function createWelcomeMessege() {
    var username = localStorage.getItem("loggedInAs");
    var messege;
    
    if (!username) {
        messege = '<span>Welcome Genaral!</span>' +
        '<a href="/login.html?loginType=login"> Login </a>' +
        ' or <a href="login.html?loginType=register"> Register</a>';
    } else {
        messege = '<span>Welcome ' + username + '!</span>' +
        '<a href="index.html" onclick="signOut()"> Sign Out </a>';
    }
    document.getElementById("login-welcome").innerHTML = messege;
}
function signOut() {
    localStorage.removeItem("loggedInAs");
}
function orderBtn() {
    if (localStorage.getItem("loggedInAs")){
        location = "planes-catalog.html";    
    }
    else {
        location = "login.html";    
    }
}
createWelcomeMessege();
