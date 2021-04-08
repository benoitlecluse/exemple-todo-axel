
const baseUrl = "https://jsonplaceholder.typicode.com/todos/";

function makeHttpRequest(url, verb, body = null) {
  return new Promise(function(accept, reject) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
      accept(JSON.parse(this.responseText))
    });
    oReq.addEventListener("abort", function(error){
      reject(error)
    });
    oReq.open(verb, url);
    oReq.send(body);
  });
}

function get(url) {
  return makeHttpRequest(url, 'GET')
}

function post(url, body) {
  return makeHttpRequest(url, 'POST', body)
}

function getTodo(id) {
  // verifier que id est bien un nombre
  let url = baseUrl+id
  return get(url)
}

function createTodo(todo){
  // Code pour vérifier que todo est bien formate
  return post(baseUrl, todo)
}

function getTodos() {
  return get(baseUrl)
}

async function main() {
  // let response = await getTodos()
  let todoElement = document.getElementById('todos')
  let todos = await getTodos()
  console.log(todos)
  let number = 30;

  for (let i in todos){

    let todo = todos[i];
    console.log(todo.id)


    let element = `
      <li>
        <input type="checkbox" ${(todo.completed)?"checked":""} id="todo-${todo.id}">
        <span>${todo.title}</span>
      </li>
    `
    number --;
    todoElement.innerHTML = todoElement.innerHTML + element
    if (number == 0) {
      break;
    }
  }

  // console.log(getTodo(32))
  // console.log(getTodo(53))
  // console.log(getTodo(43))
  // console.log(getTodo(10))


  // let response3 = await createTodo({
  //   "userId": 1,
  //   "title": "faire les courses",
  //   "completed": true
  // })
}

async function sendTodoForm() {

}

document.getElementById('todo-form').addEventListener('submit', async function(event){
  let content = document.getElementById('new-todo-text').value
  let response3 = await createTodo({
    "userId": 1,
    "title": content,
    "completed": false
  })
  console.log(response3)

  alert('todo created with id '+response3.id)
  event.preventDefault()
  return false;
})


main()
