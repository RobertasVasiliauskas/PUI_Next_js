'use client'

import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import ConvertedCurrency from "./ConvertedCurrency";

interface Currency {
    code: string;
    rate: number;
}

export default function Convert() {
    const [amountL, setAmountL] = useState<number>(0);
    const [amountR, setAmountR] = useState<number>(0);
    const [selectedCurrencyL, setSelectedCurrencyL] = useState<Currency>({ code: "USD", rate: 4.0 });
    const [selectedCurrencyR, setSelectedCurrencyR] = useState<Currency>({ code: "EUR", rate: 4.5 });

    const handleConvertClick = (): void => {
        const convertedAmount = (amountL * selectedCurrencyL.rate) / selectedCurrencyR.rate;
        setAmountR(isNaN(convertedAmount) ? 0 : parseFloat(convertedAmount.toFixed(2)));
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