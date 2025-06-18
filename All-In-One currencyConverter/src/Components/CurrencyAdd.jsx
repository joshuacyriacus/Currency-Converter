

const CurrencyAdd = ({amounts, isOpen, closeModal, selectedCurrency, setSelectedCurrency, allCurrencies, addCurrency}) => {
    return ( 
        <>
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
      </>
     );
}
 
export default CurrencyAdd;
