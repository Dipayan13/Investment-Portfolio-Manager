
//App.js

 

import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";

import InvestmentView from "./InvestmentView"; // Import the InvestmentView component

import Navigation2 from "./Navigation2";

import DropdownComponent from "./DropdownComponent";

import Register from "./Register";




const App = () => {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register/>} />

        <Route path="/investment-view" element={<InvestmentView />} />

        <Route path="/dropdown" element={<DropdownComponent />} />

      </Routes>

    </Router>

  );

};




export default App;



