import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Heading, Container, SimpleGrid } from '@chakra-ui/react'
import { useApp } from "./hook/useApp";
import './App.css'
import { Column } from "./components/Column";
import { ColumnType } from "./utils/models";


function App() {
  
  const { tasks, onDragEndResult } = useApp();

  return (
    <>
      <Heading fontSize={{base: '4xl', sm: '5xl', md: '6xl'}} fontWeight="bold"
        textAlign="center" bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text" mt={4}
      >
        Drag and Drop | Practica React
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <SimpleGrid columns={{base: 1, md: 4}} spacing={{base: 16, md: 4}}>
          <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.IN_PROGRESS} />
          <Column column={ColumnType.BLOCKED} />
          <Column column={ColumnType.COMPLETED} />
        </SimpleGrid>
      </Container>
    </>
  );
}

export default App;
