//Code for the animation project

"use strict"
window.onload = function () {
    let isLogin = false;
    let navigatorKey = "BwkHCDaltXvuMGpJSCng2fxGy3uLjEfZ";
    let longitude;
    let latitude;
    let token;


    //Create a HTML Page
    let loginPage = `<h1>Please Login</h1><br>
    Username: <input type="text" id="username" value="mwp"><br>
    Password: <input type="text" id="password" value="123"><br>
    <input type="button" id="login" value="Login">`

    let animationPage = `<h1>Welcome all from</h1>
    <h2 id="geolocation"></h2>
    <textarea rows="40" cols="100" id="animation"></textarea><br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`

    login();
    //function to login to the animation
    function login() {
        //Get the DOM Element to create Login Page
        let outlet = document.querySelector("#outlet");
        outlet.innerHTML = loginPage;
        history.pushState("login", "login", "?login")

        //Get the DOM Element for Login Page
        let loginButton = document.querySelector("#login");
        let username = document.querySelector("#username");
        let password = document.querySelector("#password");

        //Create EventListener for Login Page
        loginButton.addEventListener("click", getCred);

    }


    function animEventList() {
        //Get the geolocation
        const location = navigator.geolocation.getCurrentPosition(success, fail);


        function success(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            currentPosition();
        }

        function fail(msg) {
            alert(`${msg.code} ====> ${msg.message} `);
        }




        //Get the DOM Elements once inside the animation page
        let geolocation = document.querySelector("#geolocation");
        let animation = document.querySelector("#animation");
        let refresh = document.querySelector("#refresh");
        let logout = document.querySelector("#logout");

        //Create an EvenListener once inside the animation page
        //refresh.addEventListener("click", getNewAnimation);
        logout.addEventListener("click", logoutOfAnimation);

    }


    //Functions for the EventListenter

    //To login
    function insideLogin() {
        history.pushState("animation", "animation", "?animation")
        outlet.innerHTML = animationPage;
        isLogin = true;

        animEventList()
    }



    //To logout
    function logoutOfAnimation() {
        if (isLogin) {
            outlet.innerHTML = loginPage;
            isLogin = false;
            login();

        }
    }

    async function getCred() {
        const result = await fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        })

        const myJson = await result.json()
        token = myJson.token;
        const status = myJson.status;

        if (status === true) {
            insideLogin();
        }
    }

    async function currentPosition() {
        const result = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${navigatorKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const myPosition = await result.json();
        console.log(myPosition);
        geolocation.innerHTML = `${myPosition.results[0].locations[0].adminArea5}, ${myPosition.results[0].locations[0].adminArea3} ${myPosition.results[0].locations[0].adminArea1}`;

    }


}