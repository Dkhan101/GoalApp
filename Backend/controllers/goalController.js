const expressAsyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')


const getGoals =expressAsyncHandler(async (req,res)=>{
    const goals = await Goal.find()
    res.json(goals)
}
)
const setGoals = expressAsyncHandler(async(req,res)=>{
    const goals = await Goal.create({
        text:req.body.text
    })
    res.json(goals)

})

const updateGoals =expressAsyncHandler(async (req,res)=>{
    const goals = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.json(goals)
}
)
const deleteGoals =expressAsyncHandler(async (req,res)=>{
   const goal = await Goal.findById(req.params.id)

   await goal.deleteOne()
    res.json({id :req.params.id})
}
)
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}