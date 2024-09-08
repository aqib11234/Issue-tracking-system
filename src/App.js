import React, { useState, useEffect } from 'react';
import Home from './Components/Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import supabase from "./Components/Supa"
import Navi from './Components/Navi';
import Create from "./Components/Pages/Create"
import IssuePage from './Components/Pages/IssuePage';
import Update from './Components/Pages/Update';

function App() {

  const [issues, setIssues] = useState([]);

  useEffect(()=>{
    const getIssues = async()=>{
      let { data, error } = await supabase
      .from('issues')
      .select()
      setIssues(data)
    }
    getIssues();
  },[])


  return (
    <div className="App">
       <Navi/>
       <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Create" element={<Create/>}/>
          <Route path="/Issue/:issue_id" element={<IssuePage/>}/>
          <Route path="/Update/:issue_id" element={<Update />}/>
        </Routes>
       </Router>
    </div>
  );
}

export default App;
