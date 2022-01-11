import './App.css';
import Board from './components/board/Board';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Fragment } from 'react';

function App() {
  return (
      <Fragment>
        <DndProvider backend={HTML5Backend}>
          <Board/>
        </DndProvider>
      </Fragment>
  );
}

export default App;
