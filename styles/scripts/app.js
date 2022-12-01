const nonImportantIcon = "fa-regular fa-heart";
const importantIcon = "fa-solid fa-heart";
var isImportant = false;
var isVisible = true;

function toggleImportant(){
   
    if(isImportant) {
        //to non important
        $("#topIcon").removeClass(importantIcon);
        $("#topIcon").addClass(nonImportantIcon);
        isImportant = false;
    }
  else {
    // to important
    $("#topIcon").removeClass(nonImportantIcon);
    $("#topIcon").addClass(importantIcon);
    isImportant = true;
  }
    
}

function saveTask(){
console.log("Saving task!");
let title = $("#txtTitle").val();
let description = $("#txtDescription").val();
let dueDate = $("#txtDueDate").val();
let category = $("#txtCategory").val();
let priority = $("#txtPriority").val();
let cost = $("#txtCost").val();

//create a new instance of the task (object)
let task = new Task(isImportant,title,description,dueDate,category,priority,cost);
console.log(task);
//console log the instance (object)
}

function toggleDetails(){
if (isVisible) {
    $("#secForm").hide();
    isVisible = false;
}
else {
    $("#secForm").show();
    isVisible = true;
}
}

//test change
function init() {
    console.log("Task Manager");

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