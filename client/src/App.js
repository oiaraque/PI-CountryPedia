import './App.css';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import ActivityCreate from './components/ActivityCreate.jsx';
import Detail from './components/Detail.jsx';

//----------------------------------------------------------------------------------------------

function App(){
  return(
    <div className='App'>
      <Routes>
      <Route exact path= "/" element={<LandingPage />}/>
      <Route exact path= "/home/:id" element={<Detail />}/>
      <Route path= "/home" element={<Home />} />
      <Route path= "/activity" element={<ActivityCreate/>}/>
      </Routes>
    </div>    
  )
}

export default App;
