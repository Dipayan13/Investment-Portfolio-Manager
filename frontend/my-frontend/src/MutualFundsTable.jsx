import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MutualFundsTable = () => {
  const [mutualFunds, setMutualFunds] = useState([]);

  useEffect(() => {
    // Fetch data for MutualFunds
    axios.get('http://localhost:5000/api/mutualfunds')
      .then((response) => {
        setMutualFunds(response.data);
      })
      .catch((error) => {
        console.error('Error fetching MutualFunds data:', error);
      });
  }, []);

  // Function to calculate the total investment for mutual funds
  const calculateTotalInvestment = (data) => {
    return data.reduce((total, item) => total + Number(item.Total_Amt || 0), 0);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2>Mutual Funds</h2>
        <div className="table-scroll-container">
          <div className="table-header">
            <table>
              <thead>
                <tr>
                  <th>UID</th>
                  <th>AMC</th>
                  <th>MF Scheme</th>
                  <th>Tranc Date</th>
                  <th>Nav Date</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Amount</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table>
              <tbody>
                {mutualFunds.map((mf) => (
                  <tr key={mf.UID}>
                    <td>{mf.UID}</td>
                    <td>{mf.AMC}</td>
                    <td>{mf.MF_Scheme}</td>
                    <td>{mf.Tranc_Date}</td>
                    <td>{mf.Nav_Date}</td>
                    <td>{mf.Amount}</td>
                    <td>{mf.Unit}</td>
                    <td>{mf.Total_Amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Display the "TOTAL INVESTMENT" row at the end */}
        <div className="total-investment-row">
          <span className="total-investment-label">TOTAL INVESTMENT:</span>
          <span className="total-investment-amount">{calculateTotalInvestment(mutualFunds).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MutualFundsTable;
