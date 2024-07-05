import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch data for Stocks
    axios.get('http://localhost:5000/api/stocks')
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Stocks data:', error);
      });
  }, []);

  // Function to calculate the total investment for stocks
  const calculateTotalInvestment = (data) => {
    return data.reduce((total, item) => total + Number(item.Total_Amt || 0), 0);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h2>Stocks</h2>
        <div className="table-scroll-container">
          <div className="table-header">
            <table>
              <thead>
                <tr>
                  <th>UID</th>
                  <th>Stock Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Eq. Price Date</th>
                  <th>Transaction Date</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-body">
            <table>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.uid}>
                    <td>{stock.uid}</td>
                    <td>{stock.stock_name}</td>
                    <td>{stock.unit_price}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.eq_price_date}</td>
                    <td>{stock.tranc_date}</td>
                    <td>{stock.Total_Amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Display the "TOTAL INVESTMENT" row at the end */}
        <div className="total-investment-row">
          <span className="total-investment-label">TOTAL INVESTMENT:</span>
          <span className="total-investment-amount">{calculateTotalInvestment(stocks).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
