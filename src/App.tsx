import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useApp } from "./hook/useApp";
import './App.css'


function App() {
  
  const { tasks, onDragEndResult } = useApp();

  return (
    <DragDropContext onDragEnd={onDragEndResult}>
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
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} ref={provided.innerRef} 
                        {...provided.dragHandleProps} className="task-item"
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
