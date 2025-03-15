const Tasks = require(`../models/tasks`)
const asyncWrapper = require(`../middleware/async`)

const getTask = asyncWrapper(async (req,res,next) =>{
   const {id:taskID} = req.params
   const wantedTask = Tasks.getOne({_id:taskID})
   if (!wantedTask){
    const error = new Error(`not found`)
    error.status = 404
    return next(error)
   }
   res.status(200).json({Tasks})
})

const getAllTasks = asyncWrapper( async (req,res) => {
    const allTasks = await Tasks.find({})
    return res.status(200).json({allTasks})
})

const createTask = asyncWrapper( async(req,res) => {
    const wantedTask = await Tasks.create(req.body)
    return res.status(200).json({wantedTask})
})

const updateTask = asyncWrapper( async(req,res) => {
    const {id:taskID} = req.params
    const wantedTask = await Tasks.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})
    if (!wantedTask){
        res.status(404).json({msg:`Nenhuma tarefa encontrada com o id: ${taskID}`})
        return
    }
    res.status(200).json(wantedTask)
})

const deleteTask = asyncWrapper( async(req,res) => {
    const {id:taskID} = req.params
    req.params = await Tasks.findOneAndDelete({_id:taskID})
    if (!wantedTask){
        res.status(404).json({msg:`Nenhuma tarefa encontrada com o id: ${taskID}`})
        return
    }
    res.status(200).json(wantedTask)
})

module.exports = {
    getAllTasks,createTask,getTask,updateTask,deleteTask
}
