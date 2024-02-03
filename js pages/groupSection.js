const searchGroupBtn = document.querySelector(".searchGroupBtn");
const searchGroup = document.querySelector("#searchGroup");
var loadingDiv = document.querySelector(".loading-div");
const GroupCount = document.querySelector("#GroupCount");
const GroupTime = document.querySelector("#GroupTime");
const GroupModuleName = document.querySelector("#GroupModuleName");
const GroupStartDate = document.querySelector("#GroupStartDate");
const tableBody = document.querySelector(".tbody1");


async function getInfoOfGroups(groupId) {
  const baseUrl = `https://script.google.com/macros/s/AKfycbzq0888ifBcsd1JIc6so3lRIOIOvTJv9aayX4T-xNqHRSrCChxL6DeVWajnmPKzQoLuFQ/exec`;
  const url = groupId
    ? `${baseUrl}?groupId=${groupId}`
    : showAlert("Please insert groupId");
  console.log("groupsection?groupId=" + groupId);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    showAlert("Error fetching data. Please try again later.");
    throw error;
  }
}

// function showAlert(message) {
//   // Create and display a Bootstrap alert
//   const alertContainer = document.createElement("div");
//   alertContainer.classList.add("alert", "alert-danger", "mt-3");
//   alertContainer.setAttribute("role", "alert");
//   alertContainer.innerHTML = `<strong>Error:</strong> ${message}`;

//   document.body.appendChild(alertContainer);

//   // Automatically close the alert after a few seconds (adjust the timeout as needed)
//   setTimeout(() => {
//     alertContainer.remove();
//   }, 5000);
// }

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
  loadingDiv.style.display = "block";
  overlay.style.display = "block";
}

function hide() {
  overlay.style.display = "none";
  loadingDiv.style.display = "none";
}

// let newRowCounter = 0;
let freshCount = 0; // initialize the counter


async function diplayGroups(groupId) {
  change();
  const groups = await getInfoOfGroups(groupId);
  tableBody.innerHTML = "";
  

  for (let i = 0; i < groups.length; i++) {
    if (groupId == groups[i]["Code Group"]) {
      var group = {
        StudentNo: groups[i]["Student No"],
        Name: groups[i].Name,
        Count: groups[i]["Count of GR Students"],
        Email: groups[i].Email,
        phone: groups[i]["Phone "],
        Grade: groups[i].Grade,
        StudyType: groups[i]["Student Type"],
        startDate: groups[i]["GR Start Date"],
        GroupTime: groups[i]["Group Time"],
        ModuleName: groups[i]["GR Module Name"],
      };

      const formatteddate = new Date(group.startDate).toLocaleDateString(
        "en-GB"
      );
      // Use trim() to handle empty or whitespace-only StudyType

      // pushObj.push(students[i].Amount)
      // deadlineStatus.push(students[i].Status)
      // console.log(pushObj);
      const newRow = document.createElement("tr");
      // console.log(student.DueDate);
      newRow.innerHTML = `
            <td class="text-center">${group.StudentNo}</td>
            <td>${group.Name}</td>
            <td>${group.phone}</td>
            <td>${group.StudyType}</td>
            <td>${group.Grade}</td>
        `;

        let newRowCounter = 0; // declare the counter variable outside the loop

        let StudentCount = 0; // initialize the counter

        for (let i = 0; i < groups.length; i++) {
          if (groupId == groups[i]["Code Group"]) {
            // ... existing code ...

            newRowCounter++;
            // const newRow = document.createElement("tr");
            // ... existing code ...

            // tableBody.appendChild(newRow);
            ; // increment the counter each time a new row is added
          }

          
        }

        if (groups[i]["Student Type"] == "Fresh") {
          console.log("Fresh Count:", freshCount);
          freshCount++; // exit the loop if the counter reaches 20
        } else {
          StudentCount++;
        }

        // console.log("Number of new rows created:", newRowCounter); // display the count in the console

      tableBody.appendChild(newRow);
      GroupCount.innerHTML =`${newRowCounter} / (${freshCount} Fresh)`;
      GroupTime.innerHTML = group.GroupTime;
      GroupModuleName.innerHTML = group.ModuleName;
      GroupStartDate.innerHTML = formatteddate;
    }
  }

  // Send the request to the server
  hide(); // hide the loading overlay once the requests are shown
}

searchGroupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!searchGroup.value) {
    // Create and display a Bootstrap alert
    const content  = document.querySelector(".content");
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert", "alert-danger", "mt-3");
    alertContainer.style.width = '25%';
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '0';
    alertContainer.style.left = '38%';
    alertContainer.style.margin = '20px';
    alertContainer.style.transition = "all 0.5s ease-in-out";
    alertContainer.setAttribute("role", "alert");
    alertContainer.innerHTML = `<strong>Error:</strong> Please enter a group ID.`;

    content.appendChild(alertContainer);

    // Automatically close the alert after a few seconds (adjust the timeout as needed)
    setTimeout(() => {
      alertContainer.remove();
    }, 2000);
  } else {
    const allCard = document.querySelector('.allCard')
    const groupId = searchGroup.value;
    diplayGroups(groupId);
    allCard.style.display = "flex";
    // allCard.classList.remove("alert", "alert-danger", "mt-3");
    
  }
});
