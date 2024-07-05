import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Option1Page.css';

const Option2Page = () => {
  const initialFormData = {
    AMC: '',
    MF_Scheme: '',
    Tranc_Date: '',
    Nav_Date: '',
    Amount: '',
    Unit: '',
    TotalAmount: '', // New field for total amount (auto-filled)
  };

  const [formData, setFormData] = useState(initialFormData);
  const [secondDropDownOptions, setSecondDropDownOptions] = useState([]);
  const [ID1, setId1] = useState('');
  const [ID2, setId2] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const { AMC, MF_Scheme, Tranc_Date, Nav_Date, Amount, Unit, TotalAmount } = formData;
    if (!AMC || !MF_Scheme || !Tranc_Date || !Nav_Date || !Amount || !Unit || !TotalAmount) {
      toast.error('Please fill in all the input fields');
      window.alert('Please fill in all the input fields');
    } else {
      var UID = 13;
      axios
        .post('http://localhost:5000/api/post2', {
          UID,
          AMC,
          MF_Scheme,
          Tranc_Date,
          Nav_Date,
          Amount,
          Unit,
          TotalAmount,
        })
        .then((response) => {
          if (response && response.data) {
            console.log('Data successfully submitted:', response.data);
            setFormData(initialFormData); // Clear form after successful submission
            toast.success('Data successfully submitted');
          } else {
            console.log('Response data is missing or undefined');
            toast.error('An error occurred while submitting the form');
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log('Error response:', err.response.data);
            toast.error(err.response.data);
          } else {
            console.log('Error occurred:', err);
            toast.error('An error occurred while submitting the form');
          }
        });
    }
    console.log('Form data for HDFC:', formData);
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form reset (clear all input fields)
  const handleClear = () => {
    setFormData(initialFormData);
  };

  // Custom IDs for each combination of options
  const customIDs = {
    'HDFC-Growth Option': { ID1: '149366', ID2: 'INF179KC1BV9' },
    'HDFC-Growth Option - Direct Plan': { ID1: '149368', ID2: 'INF179KC1BS5' },
    'HDFC-IDCW Option': { ID1: '149365', ID2: 'INF179KC1BW7' },
    'HDFC-IDCW Option - Direct Plan': { ID1: '149367', ID2: 'INF179KC1BT3' },
    'SBI-Direct Plan - Income Distribution': { ID1: '149887', ID2: 'INF200KA19E0' },
    'SBI-Direct Plan- Growth option': { ID1: '149882', ID2: 'INF200KA18E2' },
    'SBI-Regular Plan- Growth Option': { ID1: '149886', ID2: 'INF200KA15E8' },
    'SBI-Regular Plan- Income Distribution': { ID1: '149883', ID2: 'INF200KA16E6' },
    'ICICI-Bluechip Fund-Direct Plan-Growth': { ID1: '120586', ID2: 'INF109K016L0' },
    'ICICI-Bluechip Fund-Direct Plan-IDCW': { ID1: '120585', ID2: 'INF109K014L5' },
    'ICICI-Bluechip Fund-Growth': { ID1: '108466', ID2: 'INF109K01BL4' },
    'ICICI-Bluechip Fund-IDCW': { ID1: '108465', ID2: 'INF109K01EP9' },
    // Add more combinations and their IDs as needed
  };

  // Update second drop-down options based on the selection in the first drop-down
  useEffect(() => {
    // Define the second drop-down options based on the selected value in the first drop-down
    const options = {
      HDFC: ['Growth Option', 'Growth Option - Direct Plan', 'IDCW Option', 'IDCW Option - Direct Plan'], 
      SBI: ['Direct Plan - Income Distribution', 'Direct Plan- Growth option', 'Regular Plan- Growth Option', 'Regular Plan- Income Distribution'],
      ICICI: ['Bluechip Fund-Direct Plan-Growth', 'Bluechip Fund-Direct Plan-IDCW', 'Bluechip Fund-Growth', 'Bluechip Fund-IDCW'],
      // Add more options as needed
    };

    // Get the selected value in the first drop-down
    const selectedValue = formData.AMC;

    // Update the second drop-down options based on the selected value in the first drop-down
    setSecondDropDownOptions(options[selectedValue] || []);
  }, [formData.AMC]);

  // Function to handle autofilling TotalAmount based on Amount and Unit
  useEffect(() => {
    // If both Amount and Unit are filled, calculate the TotalAmount
    if (formData.Amount !== '' && formData.Unit !== '') {
      const totalAmount = formData.Amount * formData.Unit;
      setFormData((prevData) => ({ ...prevData, TotalAmount: totalAmount.toString() }));
    }
  }, [formData.Amount, formData.Unit]);

  return (
    <div className='BackGround'>
      <div className='wrapper'>
        <h2>MUTUAL FUNDS</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='AMC'>AMC</label>
            <select
              id='AMC'
              name='AMC'
              value={formData.AMC}
              onChange={handleInputChange}
            >
              <option value=''>SELECT</option>
              <option value='HDFC'>HDFC</option> 
              <option value='SBI'>SBI</option>
              <option value='ICICI'>ICICI</option>
            </select>
          </div>
          <div>
            <label htmlFor='MF_Scheme'>SCHEME</label>
            <select
              id='MF_Scheme'
              name='MF_Scheme'
              value={formData.MF_Scheme}
              onChange={handleInputChange}
            >
              <option value=''>SELECT</option>
              {secondDropDownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='ID1'>Nav Code</label>
            <input
              type='text'
              id='ID1'
              name='ID1'
              value={ID1}
              readOnly
            />
          </div>
          <div>
            <label htmlFor='ID2'>ISIN No</label>
            <input
              type='text'
              id='ID2'
              name='ID2'
              value={ID2}
              readOnly
            />
          </div>
          <div>
            <label htmlFor='Amount'>AMOUNT</label>
            <input
              type='number'
              id='Amount'
              name='Amount'
              value={formData.Amount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='Unit'>UNIT</label>
            <input
              type='text'
              id='Unit'
              name='Unit'
              value={formData.Unit}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='TotalAmount'>TOTAL AMOUNT</label>
            <input
              type='text'
              id='TotalAmount'
              name='TotalAmount'
              value={formData.TotalAmount}
              readOnly
            />
          </div>
          <div>
            <label htmlFor='Tranc_Date'>DATE</label>
            <input
              type='date'
              id='Tranc_Date'
              name='Tranc_Date'
              value={formData.Tranc_Date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='Nav_Date'>NAV DATE</label>
            <input
              type='date'
              id='Nav_Date'
              name='Nav_Date'
              value={formData.Nav_Date}
              onChange={handleInputChange}
            />
          </div>
          <div className='btn-container'>
            <button className='btn btn-save' type='submit'>
              SAVE
            </button>
            <button className='btn btn-save' type='button' onClick={handleClear}>
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Option2Page;
