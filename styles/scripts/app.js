const nonImportantIcon = "fa-regular fa-heart";
const importantIcon = "fa-solid fa-heart";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
  if (isImportant) {
    //to non important
    $("#topIcon").removeClass(importantIcon);
    $("#topIcon").addClass(nonImportantIcon);
    isImportant = false;
  } else {
    // to important
    $("#topIcon").removeClass(nonImportantIcon);
    $("#topIcon").addClass(importantIcon);
    isImportant = true;
  }
}

function saveTask() {
  console.log("Saving task!");
  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#txtdueDate").val();
  let category = $("#selCategory").val();
  let priority = $("#txtPriority").val();
  let cost = $("#txtCost").val();

  //create a new instance of the task (object)
  let task = new Task(
    isImportant,
    title,
    description,
    dueDate,
    category,
    priority,
    cost
  );
  console.log(task);
  displayTask(task);

  //console log the instance (object)

  //create a post request to:
  //https://fsdiapi.azurewebsites.net/api/tasks

  $.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (data) {
      console.log("Server says", data);
    },
    error: function (error) {
      console.log("saving failed", error);
      alert("Error , task not saved");
    },
  });
}
function displayTask(task) {
  let syntax = `<div class="task">
    <div>
    <i class="fa-regular fa-heart"></i>
       <h5>${task.title}</h5>
       <p>${task.description}</p>
       </div>
       <label>${task.dueDate}</label>
       <label>${task.category}</label>
       <label>${task.cost}</label>
    </div>`; // html code

  $("#pendingTasks").append(syntax);
}

function toggleDetails() {
  if (isVisible) {
    $("#secForm").hide();
    isVisible = false;
  } else {
    $("#secForm").show();
    isVisible = true;
  }
}

function testRequest() {
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net ",
    success: function (data) {
      console.log("Server says", data);
    },
    error: function (error) {
      console.log("Request error", error);
    },
  });
}


function fetchTasks() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (data) {
          let all = JSON.parse(data);
          console.log(all);

          for(let i=0; i< all.length; i++) {
            let task = all[i];
            if(task.name === "Manny"){
                displayTask(task);
            }  
          }
        },
        error: function (error) {
          console.log("Request error", error);
        },
      });
    }
   



function init() {
  console.log("Task Manager");

  // load tasks
  fetchTasks();

  $("#topIcon").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#btnToggleDetails").click(toggleDetails);
}

window.onload = init;

/**
 *
 * console log messafe when the user clicks the icon
 * - add an id to the icon
 * - catch the click event on the icon, (on init fn)
 * - when the icon is clicked , call a fn named toggleImportant
 * - in toggleImportant console log any message
 *
 * */
