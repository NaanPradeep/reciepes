import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ReciepeList } from './modules/reciepeList/ReciepeList';
import { ReciepeDetail } from './modules/reciepeDetail/ReciepeDetail';

const {PUBLIC_URL} = process.env

const App = () => {
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
          <Route path='reciepes' element={<ReciepeList />} />
          <Route path='reciepe-detail' element={<ReciepeDetail />} />
          <Route index element={<ReciepeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
