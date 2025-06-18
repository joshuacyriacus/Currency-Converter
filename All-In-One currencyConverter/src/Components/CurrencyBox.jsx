import { useEffect, } from "react";

const CurrencyBox = ({rates, amounts, setAmounts, baseCurrency,setBaseCurrency }) => {


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

    return ( 
      <div className=" flex flex-col w-full gap-3
         mx-auto px-4 py-6 rounded-lg  text-center mt-5" >
        {Object.keys(amounts).map((currency) => (
            <div key={currency}>
                <input
                  type="number"
                  value={amounts[currency]}
                  placeholder={currency}
                  onChange={(e) => handleChange(e, currency)}
                  className="inputMen"
                />
            </div>
        ))}
      </div>
    
    );
}
 
export default CurrencyBox;