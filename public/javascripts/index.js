const API_GET = 'http://localhost:8000/todolist/tasks';
const API_POST = 'http://localhost:8000/todolist/postTask';
const buttonAdd = document.getElementById('buttonAdd');
const taskContainer = document.getElementById('tasks');
let titleTask;
let textTask;
let stayTask;

async function displayTask() {
    const noneTask = document.getElementById('noneTask');
    taskContainer.innerText='Carregando todas as tarefas...';

    try {
        const response = await fetch(API_GET);

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Erro na API: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const tasks = await response.json();
        taskContainer.innerHTML='';

        if(tasks.length === 0){
            noneTask.style.display='block';
        } else {
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task');

                taskElement.innerHTML=`
                    <div class="bodyTask">
                        <h3 class="titleTask">${task.title}</h3>
                        <p class="textTask">${task.task}</p>
                    </div>
                    <div class="checkBoxTask">
                        <input type="checkbox" name="checkbox" id="checkbox" ${task.stay==='finished' ? 'checked' : ''} oninput="checkTask()">
                    </div>
                `;
                taskContainer.appendChild(taskElement)
            });
        }
    } catch (error){
    console.error("Erro ao exibir tarefas: ", error.message);
    taskContainer.innerHTML = `<p style="color: red;">Erro ao carregar tarefas: ${error.message}. Tente novamente mais tarde.</p>`
}
}
document.addEventListener('DOMContentLoaded', displayTask);

buttonAdd.addEventListener('click', () => {
    const buttonSave = document.getElementById('buttonSave')
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    buttonAdd.style.display='none'
    buttonSave.style.display='block'

        taskElement.innerHTML=`
            <div class="bodyTask">
                <h3 class="titleTask"><input type="text" id="inputTitle" placeholder="Insira um Título..."></h3>
                <p class="textTask"><input type="text" id="inputTask" placeholder="Insira uma tarefa..."></p>
            </div>
            <div class="checkBoxTask">
                <input type="checkbox" name="checkbox" id="checkbox" oninput="checkTask()">
            </div>
        `;
        taskContainer.appendChild(taskElement);

        const inputTitle = document.getElementById('inputTitle');
        const inputTask = document.getElementById('inputTask');
        const inputStay = document.getElementById('checkbox');

        buttonSave.addEventListener('click', async () => {

            if(inputTitle.value.length == 0 || inputTask.value.length == 0){
                alert('Ainda há campos vazios!');
            } else {
                titleTask = inputTitle.value;
                textTask = inputTask.value;
                if(inputStay.checked == true){
                    stayTask = 'finished';
                } else {
                    stayTask = 'in progress';
                }

                const textToJSON = {
                    'title': titleTask,
                    'task': textTask,
                    'stay': stayTask
                }

                try{
                    const response = await fetch(API_POST, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(textToJSON)});

                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(`Erro na API: ${response.status} - ${errorData.message || response.statusText}`);
                    }
                    buttonAdd.style.display='block';
                    buttonSave.style.display='none';

                } catch(error){

                }

            }
        })

})

// function checkTask(){

// }
