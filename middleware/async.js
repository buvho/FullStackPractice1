const ascycWrapper = (fn) => {
    return async (req,res,next) => {
        try{
            await fn(req,res,next)
        } catch (error){
            next(error)
        }

    }
}

module.exports = ascycWrapper