import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../helper/reorder";
import { initialTask } from "../service/data";

export const useApp = () => {
    const [tasks, setTasks] = useState(initialTask);

    const onDragEndResult = (result:DropResult) => {
        const {source, destination} = result;
        if(!destination){
          return;
        }
        if(source.index === destination.index && source.droppableId === destination.droppableId){
          return;
        }
    
        setTasks(prevTask => reorder(prevTask, source.index, destination.index));
    }

    return {
        tasks,
        onDragEndResult
    }
}