import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter.jsx";
import ConvertedCurrency from "./ConvertedCurrency.jsx";

export default function Convert() {
    const [amountL, setAmountL] = useState(0);
    const [amountR, setAmountR] = useState(0);
    const [selectedCurrencyL, setSelectedCurrencyL] = useState({ code: "USD", rate: 4.0 });
    const [selectedCurrencyR, setSelectedCurrencyR] = useState({ code: "EUR", rate: 4.5 });
    const handleConvertClick = () => {
        const convertedAmount = (parseFloat(amountL) * selectedCurrencyL.rate) / selectedCurrencyR.rate;
        setAmountR(isNaN(convertedAmount) ? 0 : convertedAmount.toFixed(2));
    };

    return (
        <div className="flex items-center justify-center space-x-10 py-10 mt-35">
            <CurrencyConverter
                amount={amountL}
                setAmount={setAmountL}
                selectedCurrency={selectedCurrencyL}
                setSelectedCurrency={setSelectedCurrencyL}
            />
            <button
                className="border bg-[#1A2E40] p-5 rounded-[25px] text-white text-lg font-bold
                transition transform active:scale-90 hover:bg-[#294661]"
                onClick={handleConvertClick}
            >
                Convert currency
            </button>
            <ConvertedCurrency
                amount={amountR}
                setAmount={setAmountR}
                selectedCurrency={selectedCurrencyR}
                setSelectedCurrency={setSelectedCurrencyR}
            />
        </div>
    );
}