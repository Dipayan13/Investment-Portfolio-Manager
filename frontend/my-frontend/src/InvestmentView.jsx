import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import StockTable from './StockTable';
import MutualFundsTable from './MutualFundsTable';
import InvestmentBarGraph from './InvestmentBarGraph';
import MutualFundsBarGraph from './MutualFundsBarGraph';
import './styles.css';
import AddPageModel from './AddPageModel';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';
import DropdownComponent from './DropdownComponent'; // Import the DropdownComponent

const InvestmentView = () => {
  const [selectedOption, setSelectedOption] = useState('stocks'); // Default value: 'stocks'

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <Navigation setSelectedOption={setSelectedOption} showAddButton={true} />
      <Routes>
        {/* New route for DropdownComponent.js */}
        {/* <Route path="/dropdown" element={<DropdownComponent />} /> */}
        {/* <Route path="/navigation2" element={<Navigation2 />} /> */}
        <Route
          path="/"
          element={
            <>
              <Outlet />
              {selectedOption === 'stocks' ? (
                <>
                  <div className="container">
                    <div className="column">
                      <InvestmentBarGraph />
                    </div>
                    <div className="column">
                      <StockTable />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container">
                    <div className="column">
                      <MutualFundsBarGraph />
                    </div>
                    <div className="column">
                      <MutualFundsTable />
                    </div>
                  </div>
                </>
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default InvestmentView;
