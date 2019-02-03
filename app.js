// Getting location from the broswer
window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degree = document.querySelector('.degree');
    let degreeSpan = document.querySelector('.degree span');


    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            //Dark sky api doesn't allow to access the api from a local host
            // to work around, you have to use a proxy 
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/46be7b311c7390f8f3da28513525abed/${lat},${long}`;
            
            //Getting the data
            fetch(api)
            .then(response => {
                // returning the data as a JSON
                return response.json();
            })
            .then(data => {
                console.log(data);
                
                // Set DOM elements from darksky api
                const temp = data.currently.temperature;
                tempDescription.innerHTML = data.currently.summary;
                // tempDegree.textContent = data.currently.temperature;
                tempDegree.textContent = temp;
                icon = data.currently.icon;
                locationTimezone.innerHTML = data.timezone;

                // C degree is 
                let cDegree = (temp - 32) * (5/9);

                //Setting the icon
                setIcon(icon, document.querySelector('.icon'));

                // Convert F to C
                degree.addEventListener('click', () => {
                    if(degreeSpan.textContent === 'F') {
                        degreeSpan.textContent = 'C';
                        tempDegree.textContent = Math.floor(cDegree);
                    } else {
                        degreeSpan.textContent = 'F';
                        tempDegree.textContent = temp;
                    }
                });
                
            });
        });
        
    }
    // Using skycons for the icons 
    function setIcon(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        // skycons icons use _ and darksky use - => ex: "partly-cloudy-night"
        // We need to replace - to _
        // Skycons are upper case and we have to convert ours to uppercases too for the icons to work
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
        // To animate the icon we have to use .play() method
        skycons.play();
        // Want to change the icon? no problem!
        return skycons.set(iconID, Skycons[currentIcon]);


    }

})




//https://api.darksky.net/forecast/46be7b311c7390f8f3da28513525abed/37.8267,-122.4233
