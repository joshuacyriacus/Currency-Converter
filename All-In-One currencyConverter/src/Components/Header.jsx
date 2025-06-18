import { useState, useEffect } from "react";

  const allCurrencies = ['NGN', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'INR'];
  
 const LOCAL_STORAGE_KEY = "currency-amounts";

const Header = () => {
  const [rates, setRates] = useState({});
  const [amounts, setAmounts] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          NGN: '',
          USD: '',
          EUR: '',
        };
  });
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('NGN')
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
  
    // Save amounts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(amounts));
  }, [amounts]);

    // Fetch exchange rates (base: USD)
    useEffect(() => {
      fetch('https://v6.exchangerate-api.com/v6/d1023329b27ef1b9a09fd1e8/latest/NGN')
        .then(res => res.json())
        .then(data => setRates(data.conversion_rates)); 
    }, []);


    useEffect(() => {
        if (!rates[baseCurrency]) return;

        const baseAmount = parseFloat(amounts[baseCurrency]) ;

        const newAmounts = {};
        Object.keys(amounts).forEach((code) => {
            if (code === baseCurrency) {
               newAmounts[code] = baseAmount;
            } else {
                const rate = rates[code] / rates[baseCurrency];
                newAmounts[code] = (baseAmount * rate).toFixed(2);
            }
        });
        setAmounts(newAmounts);
    }, [baseCurrency, amounts[baseCurrency],  rates]);
  

    const handleChange = (e, currency) => {
    setBaseCurrency(currency);
    setAmounts(prev => ({ ...prev, [currency]: e.target.value }));
  };
  
    // Add currency on button click
    const addCurrency = () => {
      if (!selectedCurrency || amounts[selectedCurrency]) return;
      setAmounts((prev) => ({
        ...prev,
        [selectedCurrency]: '',
      }));
      setSelectedCurrency('')
      setIsOpen(false);
    };
    

    return ( 
    <div className="min-h-screen p-4 bg-gray-100
     flex flex-col items-center space-y-4">
      <div className="flex flex-row justify-around space-x-10 items-center p-5">
        <h1 className="my-header" >All-In-One CurrencyConverter </h1>
       <i class="fa fa-plus-square  text-green-500 text-4xl mt-5"
          onClick={() => setIsOpen(true)} ></i>
      </div>

  
         {isOpen && (
         <div
           onClick={closeModal}
           className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click bubbling
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4 text-center"
          >
            <h2 className="text-xl font-semibold mb-4">Hello 👋, Add a new currency</h2>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="inputMen"
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
              className="px-4 py-2 mt-5 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      )}

       <div  className="w-full max-w-md mx-auto space-y-3 flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-2 sm:px-4 md:px-6">
        {Object.keys(amounts).map((currency) => (
          <div key={currency} className="flex items-center">
            <input
              type="number"
              value={amounts[currency]}
              onChange={(e) => handleChange(e, currency)}
              placeholder={`Enter ${currency}`}
              className="inputMen"
            />
             <button
              className="ml-2 px-2 py-1 bg-gray-300 rounded hover:bg-red-400 transition"
              onClick={() => {
                // Remove the currency from amounts
                setAmounts(prev => {
                  const updated = { ...prev };
                  delete updated[currency];
                  return updated;
                });
              }}
              disabled={['NGN', 'USD', 'EUR'].includes(currency)} // Prevent removing default currencies
            >
              ❎
            </button>
          </div>
        ))}
      </div>

    </div> 

    
    );
  }
   
  export default Header;