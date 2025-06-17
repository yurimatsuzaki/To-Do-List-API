const API_GET = 'http://localhost:8000/todolist/tasks';
const API_PATH = 'http://localhost:8000/todolist/updatetask';
const buttonAdd = document.getElementById('buttonAdd');
const taskContainer = document.getElementById('tasks');

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

    

    buttonAdd.style.display='none'
    buttonSave.style.display='block'
})

// function checkTask(){

// }
