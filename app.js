const cl = console.log;

let stdArr = [
  { todoItem: 'CSS', todoId: '1' },
  { todoItem: 'JS and Es6', todoId: '2' },
  { todoItem: 'Angular', todoId: '3' }
];

const todoForm = document.getElementById("todoForm");
const todoItem = document.getElementById("todoItem");
const submitBtn = document.getElementById("submitBtn");

let EDIT_ID = null;


// ID generator
function uuidv4() {
  return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// ================= LIST =================
function createlist(arr) {

  let result = `<ul class="list-group">`;

  arr.forEach(ele => {
    result += `
      <li id="${ele.todoId}"
          class="list-group-item d-flex justify-content-between">

        <strong>${ele.todoItem}</strong>

        <div>
          <i onclick="onEdit(this)"
             role="button"
             class="fa-solid fa-pen-to-square fa-2x text-success"></i>

          <i onclick="onRemove(this)"
             role="button"
             class="fa-solid fa-trash-can fa-2x text-danger"></i>
        </div>

      </li>
    `;
  });

  result += `</ul>`;

  document.getElementById("todoContainer").innerHTML = result;
}

createlist(stdArr);


// ================= ADD =================
function addTodo(eve) {

  eve.preventDefault();

  if (todoItem.value.trim() === "") {
    alert("Please enter todo");
    return;
  }

  let obj = {
    todoItem: todoItem.value,
    todoId: uuidv4()
  };

  stdArr.unshift(obj);

  todoForm.reset();
  createlist(stdArr);

  Swal.fire({
    icon: "success",
    title: "Todo added successfully",
    timer: 1200,
    showConfirmButton: false
  });
}


// ================= DELETE =================
function onRemove(ele) {

  let id = ele.closest('li').id;

  let confirmDelete = confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  let index = stdArr.findIndex(t => t.todoId === id);
  stdArr.splice(index, 1);

  createlist(stdArr);
}


// ================= EDIT =================
function onEdit(ele) {

  EDIT_ID = ele.closest('li').id;

  let obj = stdArr.find(t => t.todoId === EDIT_ID);
  todoItem.value = obj.todoItem;

  // change button text
  submitBtn.innerText = "Update Todo";
}


// ================= UPDATE =================
function updateTodo() {

  let updatedObj = {
    todoItem: todoItem.value,
    todoId: EDIT_ID
  };

  let index = stdArr.findIndex(t => t.todoId === EDIT_ID);
  stdArr[index] = updatedObj;

  todoForm.reset();
  submitBtn.innerText = "Add Todo";
  EDIT_ID = null;

  createlist(stdArr);

  Swal.fire({
    icon: "success",
    title: "Todo Updated",
    timer: 1200,
    showConfirmButton: false
  });
}


// ================= EVENT =================
todoForm.addEventListener('submit', function(e){

  if(submitBtn.innerText === "Add Todo"){
    addTodo(e);
  }else{
    e.preventDefault();
    updateTodo();
  }

});
