import { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TaskModel } from "../interface/taskInterface";
import { ColumnType } from "../utils/models";
import { pickRandomColor, swap } from "../utils/pickRandomColor";
import { useTaskCollection } from "./useTaskCollection";

const MAX_TASK_PER_COLUMN = 100;

export function useColumnTask(column: ColumnType) {
    const [tasks, setTasks] = useTaskCollection();

    const columnTasks = tasks[column]
;
    const addEmptyTask = useCallback(() => {
        console.log(`Agregar nueva task vacia a la columna ${column}`);

        setTasks( (allTask) => {
            const columnTasks = allTask[column];
            if(columnTasks.length > MAX_TASK_PER_COLUMN){
                console.log('Demasiadas Tareas!');
                return allTask;
            }

            const newColumnTask: TaskModel = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickRandomColor('.300'),
                column
            };

            return {
                ...allTask,
                [column]: [newColumnTask, ...columnTasks]
            }
        })
    }, [column, setTasks]);

    const updateTask = useCallback(
        (id: TaskModel['id'], updatedTask: Omit<Partial<TaskModel>, 'id'> ) => {
            console.log(`Actualizar tarea ${id} con ${JSON.stringify(updateTask)}`);
            setTasks((allTask) => {
                const columnTasks = allTask[column];

                return {
                    ...allTask,
                    [column]: columnTasks.map((task) =>
                        task.id === id ? {...task, ...updatedTask} : task
                    )
                };
            });
        },
        [column, setTasks]
    );

    const deleteTask = useCallback(
        (id: TaskModel['id']) => {
            console.log(`Eliminar tarea ${id}`);
            setTasks((allTask) => {
                const columnTasks = allTask[column];
                return {
                    ...allTask,
                    [column]: columnTasks.filter((task) => task.id !== id)
                };
            });
        },
        [column, setTasks]
    );

    const dropTaskFrom = useCallback( (from: ColumnType, id: TaskModel['id']) => {
        setTasks((allTasks) => {
            const fromColumnTasks = allTasks[from];
            const toColumnTasks = allTasks[column];
            const movingTask = fromColumnTasks.find((task) => task.id === id);

            console.log(`Moviendo tarea ${movingTask} de ${from} a ${column}`);

            if(!movingTask){
                return allTasks;
            }

            return {
                ...allTasks,
                [from]: fromColumnTasks.filter((task) => task.id !== id),
                [column]: [{ ...movingTask, column }, ...toColumnTasks]
            };

        })
    }, [column, setTasks]);

    const swapTask = useCallback( (i: number, j: number) => {
        console.log(`Cambiar tarea ${i} por ${j} en ${column} columna`);

        setTasks( (allTask) => {
            const columnTasks = allTask[column];
            return { ...allTask, [column]: swap(columnTasks, i, j)}
        });
    }, [column, setTasks]);

    return {
        tasks: tasks[column],
        addEmptyTask,
        updateTask,
        deleteTask,
        dropTaskFrom,
        swapTask
    }
}