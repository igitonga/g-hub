import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import GameInfo from './pages/GameInfo';
import Navbar from './components/Navbar';

 function App() {
   return (
     <div className="App">
        <Routes>
          <Route path = "/" element = {<Navbar/>}>
            <Route  path="/" element={<Home/>}/>
            <Route path='/game/:id' element={<GameInfo />} />
          </Route>
        </Routes>
     </div>
   );
 }

 export default App;