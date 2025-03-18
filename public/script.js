const tasksDOM  = document.querySelector("#tasks-container")
const tasksForms  = document.querySelector(".task-form")
const taskInput = document.querySelector(".task-input")
const btnDelete = document.querySelectorAll("delete")

async function showTasks(){
    try{
        const {data} = await axios.get(`/api/v1/tasks`)
        const {allTasks:tasks} = data
        console.log(tasks)
        const allTasks = tasks.map((task) =>{
            const {done,_id:taskID,name} = task
            return `
        <div class="box row-container">
            <input type="checkbox" class="check" data-id=${taskID} ${done ? "checked" : ""} size="50px">
            <span>${name}</span>
            <button class="button edit" data-id=${taskID}><img src="./images/pencil.svg" height="25px"></button>
            <button class="button delete" data-id=${taskID}><img src="./images/trash.svg" height="25px"></button>
        </div>`
        }).join(``) 
        tasksDOM.innerHTML = allTasks

    }catch(error)
    {
        console.log(error)
    }
}
showTasks()

tasksForms.addEventListener(`submit`,async(e) =>{
    e.preventDefault()
    const name = taskInput.value
    try{
        await axios.post(`/api/v1/tasks`, { name })
        showTasks()
        taskInput.value = ''
    } catch (error) {
        console.log(error)
    }
})

tasksDOM.addEventListener('click', async (e) => {
    const target = e.target;
    // Verifica se o clique foi em um botão de exclusão
    if (target.closest('.delete')) {
        const taskID = target.closest('.delete').getAttribute('data-id');
        try {
            await axios.delete(`/api/v1/tasks/${taskID}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }

    // Verifica se o clique foi em um botão de edição
    if (target.closest('.edit')) {
        const taskID = target.closest('.edit').getAttribute('data-id');
        const newName = prompt("Digite o novo nome da tarefa:");
        if (newName) {
            try {
                await axios.patch(`/api/v1/tasks/${taskID}`, { name: newName });
                showTasks();
            } catch (error) {
                console.log(error);
            }
        }
    }
    if (target.closest('.check')) {
        const done = target.closest('.check').checked
        const taskID = target.closest('.check').getAttribute('data-id');
        try {
            await axios.patch(`/api/v1/tasks/${taskID}`, { done });
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});