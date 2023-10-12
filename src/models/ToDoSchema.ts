import mongoose from "mongoose";

interface IToDo {
  name: string;
  description: string;
  isCompleted: true;
}


let ToDo;
try {
  // Check if the model has already been compiled
  ToDo = mongoose.model("ToDo");
} catch {
  // If the model doesn't exist, define it
  const ToDoSchema = new mongoose.Schema({
    name:{
      type:String,
    },
    description:{
      type:String,
    },
    isCompleted:{
      type:Boolean,
    }
  });

  ToDo = mongoose.model<IToDo>("ToDo", ToDoSchema);
}

export default ToDo;
