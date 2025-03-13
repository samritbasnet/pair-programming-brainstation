import { useState } from 'react';
import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import SavedPage from './pages/SavedPage/SavedPage';


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element = {<HomePage />}/>
        <Route path='/saved' element = {<SavedPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
