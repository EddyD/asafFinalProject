function choosePlane(e) {
    var chosenPlane = e.target.parentElement.parentElement.children[0].children[0];
    
    var chosenplanetitle =  chosenPlane.innerHTML;
    var chosenPlaneSerial = chosenPlane.getAttribute("id");

    document.getElementById("plane-chosen").innerHTML =                   "You have chosen the killing machine - " + chosenplanetitle + "  <button name=\"" + chosenPlaneSerial + "\" onclick=\"continueButton(event)\" class=\"continue-button\">continue?</button>";
}

function continueButton(e){
    localStorage.setItem("chosenPlane", e.target.getAttribute("name"));
    
    location="attack.html";
}
