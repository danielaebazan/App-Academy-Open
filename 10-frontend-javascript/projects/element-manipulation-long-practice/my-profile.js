
document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code that manipulates the DOM goes here
    // This code will execute after all DOM elements are loaded

    const myName = "Daniela Bazán"
    const nameElement = document.createElement("h1");
    nameElement.textContent = myName;
    nameElement.id = "profile-name";
    nameElement.classList.add("name");
    document.body.appendChild(nameElement);

    const detailsList = document.createElement("ul");
    detailsList.classList.add("my-details");

    const details = [
        "Age: 24",
        "Hobbies: Watercolor, Reading, Yoga",
        "Phone number: +503 7170 0356",
        "Email: daniela.e.bazan@hotmail.com",
        "Favorite Food: Mexican and Italian",
    ];

    function createListItem (content, className) {
        const listItem = document.createElement("li");
        listItem.textContent = content;
        listItem.classList.add(className); 
        return listItem;
    }

    details.forEach(detail => {
        const listItem = createListItem(detail, "detail"); 
        detailsList.appendChild(listItem);
    });

    document.body.appendChild(detailsList);

//clock element

const clockElement = document.createElement("div");
clockElement.classList.add("clock");
document.body.appendChild(clockElement);

function updateClock() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    clockElement.textContent = `${timeString}`;
}

updateClock();

setInterval(updateClock, 1000);

//clock elemnt list item

    const clockListItem = createListItem("", "detail");
    detailsList.appendChild(clockListItem);


    const clockElementList = document.createElement("div");
    clockElementList.classList.add("clock");
    clockListItem.appendChild(clockElementList);

    function updateClockAndLocation() {
        updateClock();

        const locationInfo = "San Salvador, El Salvador"; 
        clockListItem.textContent = `I live in ${locationInfo}, and it's currently ${clockElement.textContent} here.`;
    }

    updateClockAndLocation();

    setInterval(updateClockAndLocation, 1000);

  
 // Remove the clock element that was added outside the list
        const clockElementOutsideList = document.querySelector(".clock");
        if (clockElementOutsideList) {
            clockElementOutsideList.parentNode.removeChild(clockElementOutsideList);
        }

// profile picture

    const profileImage = document.createElement("img");
    profileImage.src = "./profile.png";

    nameElement.parentNode.insertBefore(profileImage, nameElement.nextSibling);


   
});






