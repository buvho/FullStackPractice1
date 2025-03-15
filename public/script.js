const tasksDOM  = document.querySelector("#tasks-container")

async function showTasks(){
    try{
        const {data:{tasks}} = await axios.get(`/api/v1/tasks`)
        const allTasks = tasks.map((task) =>{
            const {done,_id:taskID,name} = task
            return `
        <div class="box row-container">
            <input type="checkbox" ${done ? "checked" : ""} size="50px">
            <span>${name}</span>
            <button class="button"><img src="./images/pencil.svg" height="25px"></button>
            <button class="button"><img src="./images/trash.svg" height="25px"></button>
        </div>`
        }).join(``) 
        tasksDOM.InnerHTML = allTasks
    }catch(error)
    {
        console.log(error)
    }
}