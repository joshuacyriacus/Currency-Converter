import React, { useState, useEffect } from 'react';

const allCurrencies = ['USD', 'EUR', 'NGN', 'GBP', 'JPY', 'CAD', 'INR'];

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amounts, setAmounts] = useState({
    USD: '',
    EUR: '',
    NGN: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const baseCurrency = Object.keys(amounts)[0]; // the first currency typed

  // Fetch exchange rates (base: USD)
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => setRates(data.rates));
  }, []);

  // Handle input change
  const handleChange = (e, currency) => {
    const newValue = e.target.value;
    const baseValue = parseFloat(newValue) || 0;

    const newAmounts = { ...amounts, [currency]: newValue };

    Object.keys(amounts).forEach((code) => {
      if (code !== currency) {
        const converted = (baseValue * rates[code]) / rates[currency];
        newAmounts[code] = converted.toFixed(2);
      }
    });

    setAmounts(newAmounts);
  };

  // Add currency on button click
  const addCurrency = () => {
    if (!selectedCurrency || amounts[selectedCurrency]) return;
    setAmounts((prev) => ({
      ...prev,
      [selectedCurrency]: '',
    }));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center space-y-4">
      {/* Dropdown to select currency */}
      <div className="flex space-x-2">
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="">Select a currency</option>
          {allCurrencies
            .filter((code) => !amounts[code]) // exclude already added
            .map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
        </select>
        <button
          onClick={addCurrency}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* Currency input fields */}
      <div className="w-full max-w-md space-y-4">
        {Object.keys(amounts).map((currency) => (
          <div key={currency} className="flex items-center space-x-2">
            <span className="w-12">{currency}</span>
            <input
              type="number"
              value={amounts[currency]}
              onChange={(e) => handleChange(e, currency)}
              placeholder={`Enter ${currency}`}
              className="inputMen"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyConverter;
