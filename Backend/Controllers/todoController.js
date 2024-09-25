const { error, success } = require("../utils/response");
const Todo = require("../Models/Todo");


const addTodo = async (req,res) => {
    try{
        const {title,description,date} = req.body;
        const owner = req._id;
        
        if(!title || !description){
            return res.send(error(400,"Title And Desc Required"));
        }

        const todo = await Todo.create({
            title,
            description,
            date,
            owner
        })

        return res.send(success(200,todo));



    } catch(e){
        return res.send(error(500,e.message));
    }
}

const getTodos = async(req,res) => {
    try{
        const {date} = req.body;
        const owner = req._id;
       

        const todos = await Todo.find({owner,date});

        return res.send(success(200,todos));

    } catch(e){
        return res.send(error(500,e.message));
    }


}

const deleteTodo = async(req,res) => {
    try{
        const {todoId} = req.body;
        if(!todoId){
            return res.send(error(400,"Todo Not Found"));
        }

        const todo = await Todo.findOne({_id:todoId});
        if(todo.owner.toString() !== req._id){
            return res.send(error("Owner Can Delete This Todo"));
        }

        await Todo.deleteOne({_id:todoId});


      

        return res.send(success(200,"Deleted SuccessFully"));

    } catch(e){
        return res.send(error(500,e.message));
    }
}

const markCompleted = async (req,res) => {
    try{
        const {todoId} = req.body;
        if(!todoId){
            return res.send(error(400,"Todo Not Found"));
        }

        const todo = await Todo.findById(todoId);

        if(todo.owner.toString() !== req._id){
            return res.send(error(400,"Owner Can only Update"));
        }

        todo.status = "Completed";
        await todo.save();

        return res.send(success(200,"Mark Completed"));

    } catch(e){
       return res.send(error(500,e.message));
    }
}

const updateTodo = async (req,res) => {
    try{
        const {title,description,todoId} = req.body;
        if(!todoId){
            return res.send(error(400,"Todo Not Found"));
        }
        const todo = await Todo.findById(todoId);

        if(todo.owner.toString() !== req._id){
            return res.send(error(400,"Owner can update the todo"));
        }

        if(title)
          todo.title = title;
        if(description){
            todo.description = description;
        }

        await todo.save();

        return res.send(success(200,"Todo Update Successfully"));

    } catch(e){
        return res.send(error(500,e.message));
    }

}


  

module.exports = {
    addTodo,
    getTodos,
    deleteTodo,
    markCompleted,
    updateTodo
}