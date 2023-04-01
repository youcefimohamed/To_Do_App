let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

//Empty Array To The Tasks
let arrayOfTasks = []

// Check if Theres Tasks In Local Storage
if(window.localStorage.getItem("tasks")){
   arrayOfTasks =JSON.parse(window.localStorage.getItem("tasks")) 
}

//Trigger Get Data From Local Storage Function
getDataFromLocalStorage()

submit.onclick = function(){
   if(input.value !== ""){
      addTaskToArray(input.value)  //add task to Array
      input.value = ""
      
   }

}


function addTaskToArray(TaskText){

   const task = {
      id : Date.now(),
      title : TaskText,
      completed : false,
   }

   //Push Tasks to Array
   arrayOfTasks.push(task)

   //Add Tasks To Pages
   addElementsToPageFrom(arrayOfTasks)
   
   //Add tasks to Local Storage 
   addDataToLocalStorageFrom(arrayOfTasks)


}

// Click On Task Element
tasksDiv.addEventListener("click",(e)=>{
   //Delete button
   if(e.target.classList.contains("del")){
      
      //remove Task From Local
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"))

      //remove Element From Page
      e.target.parentElement.remove()
   }

   //Task Element
   if(e.target.classList.contains("task")){
      // Toggle Completed For The Task
      toggleTAskWith(e.target.getAttribute("data-id"))
      //Toggle Done Class
      e.target.classList.toggle("done")
   }
})

//Remove ALL

if(tasksDiv.innerHTML !==""){
   let delALL = document.querySelector(".delAll");
   delALL.classList.add("active");

      delALL.onclick = ()=>{
      let a = document.querySelectorAll(".task");  
      a.forEach((task) => {
         task.remove();
         deleteTaskWith(task.getAttribute("data-id"));
         delALL.className = "delAll";

      });      
   }

}


function addElementsToPageFrom(ArrayTasks){

   //Append Class Active If We Create Task
   let delALL = document.querySelector(".delAll")
   delALL.classList.add("active")

   //Empty the TasksDiv
   tasksDiv.innerHTML = ""
   //Looping On Array OF Tasks
   ArrayTasks.forEach((task) => {

   // Create Main Div
      let div = document.createElement("div")
      div.classList.add("task")
      // Check If Task is Done
         if(task.completed){
            div.className = "task done"
         }
      div.setAttribute("data-id",task.id)
      div.appendChild(document.createTextNode(task.title))

  // Create Delete Button
      let span = document.createElement("span")
      span.appendChild(document.createTextNode("Delete"))
      span.className = "del"
      // Append Button To Main Div
      div.appendChild(span)
      // Add Task Div To Tasks Container
      tasksDiv.appendChild(div)

   }
   );




}


function addDataToLocalStorageFrom(ArrayTasks){
   window.localStorage.setItem("tasks",JSON.stringify(ArrayTasks))


}

function getDataFromLocalStorage(){
   let data = window.localStorage.getItem("tasks")
   if(data){
      let tasks = JSON.parse(data)
      addElementsToPageFrom(tasks)
   }
}


function deleteTaskWith(taskid){

   arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);

   addDataToLocalStorageFrom(arrayOfTasks)


}


function toggleTAskWith(toggleId){

   arrayOfTasks.forEach(tasktoggle => {
      if(tasktoggle.id ==toggleId){
         tasktoggle.completed == false ? (tasktoggle.completed = true):(tasktoggle.completed = false)
      }
   });
   addDataToLocalStorageFrom(arrayOfTasks)
}