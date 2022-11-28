import { DropResult } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";
import { DragItem, TaskModel } from "../interface/taskInterface";
import { ColumnType, ItemType } from "../utils/models";

export function useColumnDrop(column: ColumnType, handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void) {
    const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver:boolean }>({
        accept: ItemType.TASK,
        drop: (dragItem) => {
            if(!dragItem || dragItem.from === column){
                return;
            }
            handleDrop(dragItem.from, dragItem.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return {
        isOver,
        dropRef
    }
}