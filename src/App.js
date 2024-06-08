import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import NewReq from './components/NewReq';
import AutoReq from './components/AutoReq';
import FixedReq from './components/FixedReq';
import Main from './components/Main';
import Distribution from './components/Distribution';

export default function App() {
  return (
    <BrowserRouter>
    <div  style={{ width: '100%', height: '100%'}}>
    <Routes>  
      <Route index element={<Main/>}/>
      <Route path='/newreq' element={<NewReq/>}/>
      <Route path='/autoreq' element={<AutoReq/>}/>
      <Route path='/distribution' element={<Distribution/>}/>
      <Route path='/fixed' element={<FixedReq/>}/>
      <Route path='*' element={<Navigate to='' />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}