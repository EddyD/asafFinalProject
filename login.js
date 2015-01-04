(function (){
    setDatabase(getDatabase());
})(); 

function getDatabase() {
    var database = localStorage.getItem("database");
    if (!database) {
        return { "users": [{username:"admin",phone:"123456789",mobile:"1234567899",email:"ben@.com",license:"1234567",date:"16-10-1992"}], 
                 "planes": [
                  new Plane("s1", "GENRAL DYNIMCS"," f-16",                                "1990", "single seat", "7 milion"),
                     
                      new Plane("s2", "GENRAL DYNIMCS"," f-16",                                "1990", "single seat", "7 milion"),
                     
                      new Plane("s3", "GENRAL DYNIMCS"," f-16",                                 "1990", "single seat", "7 milion"),
                     
                      new Plane("s4", "GENRAL DYNIMCS"," f-16",                                "1990", "single seat", "7 milion"),
                     
                      new Plane("s5", "GENRAL DYNIMCS"," f-16",                                "1990", "single seat", "7 milion")
                 ]};
    }
    return JSON.parse(database);
}
function setDatabase(database) {
    localStorage.setItem("database", JSON.stringify(database));
}
function getLength(number) {
    return number.toString().length;
}

function isPhoneValid(phone) {
    // phone is not a number
    if (isNaN(phone)) {
        return false;

    }
    // phone is not exactly 9 digits
    if (getLength(phone) !== 9) {
        return false;
    }
    //phone is valid
    return true;
}

function validatePhoneFeild() {
    var phone = document.getElementById("phone");
    if (isPhoneValid(phone.value)) {
        phone.classList.remove("input-error");
        return true;
    } else {
        phone.classList.add("input-error");
        return false;
    }

}

function isMobileValid(mobile) {
    //mobile is not a number
    if (isNaN(mobile)) {
        return false;
    }

    // mobile is not exactly 10 digits
    if (getLength(mobile) !== 10) {
        return false;
    }
    //mobile is valid
    return true;
}



function validateMobileFeild() {
    var mobile = document.getElementById("mobile");
    if (isMobileValid(mobile.value)) {
        mobile.classList.remove("input-error");
        return true;
    } else {
        mobile.classList.add("input-error");
        return false;
    }

}

function register() {
    if ((validatePhoneFeild() | validateMobileFeild()) &
        validateUsernameFeild() & validateEmailFeild() &
        validateLicenseFeild() & vaidateDateFeild()) {
        storeNewUser();
        localStorage.setItem("loggedInAs", document.getElementById("username").value);
        location = "index.html";
    }
}
function login() {
    var username = document.getElementById("existing-username");
    if (doesUserDetailExist("username", username.value)){
        localStorage.setItem("loggedInAs", username.value);
        location = "index.html";
    } else {
        username.classList.add("input-error");
    }
}

function doesUserDetailExist (detailKey, detailValue){
    var database = getDatabase();
    
    // go through all users
    for (var user = 0; user < database.users.length; user++){
        // if details exists return true
        if (database.users[user][detailKey] === detailValue) {
            return true;
        }
    }
    // detailValue didn't exist in any user 
    return false;
}

function isUsernameValid(username) {
    return username !== "";
}

function validateUsernameFeild() {
    var username = document.getElementById("username");
    if (doesUserDetailExist("username", username.value)){
        username.classList.add("input-error");
        return false;  
    }
    if (isUsernameValid(username.value)) {
        username.classList.remove("input-error");
        return true;
    } else {
        username.classList.add("input-error");
        return false;

    }

}

function isEmailValid(email) {
    var shtroodle = email.indexOf('@');
    return ((shtroodle !== -1) &&
        (shtroodle !== 0) &&
        (shtroodle !== email.length - 1));

}

function validateEmailFeild() {
    var email = document.getElementById("email");
    if (isEmailValid(email.value)) {
        email.classList.remove("input-error");
        return true;
    } else {
        email.classList.add("input-error");
        return false;

    }
}

function isLicenseValid(license) {


    if (getLength(license) !== 7) {
        return false;
    }
    return true;
}



function validateLicenseFeild() {
    var license = document.getElementById("license");
    if (isLicenseValid(license.value)) {
        license.classList.remove("input-error");
        return true;
    } else {
        license.classList.add("input-error");
        return false;

    }
}

function isDateValid(birthday) {
    //    return (years past since birthday > 21 years)
    return (new Date() - new Date(birthday) >
        (365.25 * 24 * 60 * 60 * 1000) * 21);

}

function vaidateDateFeild() {
    var date = document.getElementById("date");
    if (isDateValid(date.value)) {
        date.classList.remove("input-error");
        return true;
    } else {
        date.classList.add("input-error");
        return false;

    }
}

function storeNewUser (){
  // get all users from local storge
 // שומר את כל המשתמשים תחת הKEY USERS ובVALUE יכנסו כל המשתמשים ע
// אובייקט שמכיל אובייקטים
    
    var database = getDatabase(); 
// user obejct
    database.users.push({ 
        username: document.getElementById("username").value,
        phone: document.getElementById("phone").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        license: document.getElementById("license").value,
        date: document.getElementById("date").value
    });
    setDatabase(database);
}

function Plane(serialNumber, companyName, model, year, seat, price) {
    this.serialNumber = serialNumber;
    this.companyName = companyName;
    this.model = model;
    this.year = year;
    this.seat = seat;
    this.price = price;
}
