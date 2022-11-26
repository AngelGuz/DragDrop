import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './App.css'

const initialTask = [
  {
    id:"1",
    text: "React.Js"
  },
  {
    id:"2",
    text: "HTML/CSS"
  },
  {
    id:"3",
    text: "AWS"
  },
  {
    id:"4",
    text: "Javascript"
  },
];

const reorder = (list:any, startIndex:any, endIndex:any) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function App() {
  const [tasks, setTasks] = useState(initialTask);
  return (
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if(!destination){
        return;
      }
      if(source.index === destination.index && source.droppableId === destination.droppableId){
        return;
      }

      setTasks(prevTask => reorder(prevTask, source.index, destination.index));
    }}>
      <div className="App">
        <h1>Estudiar</h1>
        <Droppable droppableId="tasks">
          {(droppableProvided) => (
            <ul 
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {tasks.map( (task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps} 
                        className="task-item"
                      >
                        {task.text}
                      </li>
                    )}
                  </Draggable>
                ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
