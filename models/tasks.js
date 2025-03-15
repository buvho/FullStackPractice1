const mongoose = require(`mongoose`)

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,`mande um valor`]
    },
    done:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model(`Task`,taskSchema)