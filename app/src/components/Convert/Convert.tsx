'use client'

import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import ConvertedCurrency from "./ConvertedCurrency";

interface Currency {
    code: string;
}

const AVAILABLE_CURRENCIES = ["USD", "EUR", "GBP"];

async function fetchRate(from: string, to: string) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split("T")[0];

    const urlFrom = `http://localhost:3001/currency/${from}?date=${dateStr}`;
    const urlTo = `http://localhost:3001/currency/${to}?date=${dateStr}`;

    const [responseFrom, responseTo] = await Promise.all([
        fetch(urlFrom),
        fetch(urlTo)
    ]);

    if (!responseFrom.ok || !responseTo.ok) {
        throw new Error("Failed to fetch rate");
    }

    const dataFrom = await responseFrom.json();
    const dataTo = await responseTo.json();

    const rateFrom = dataFrom.rates?.[0]?.bid;
    const rateTo = dataTo.rates?.[0]?.bid;

    if (rateFrom && rateTo) {
        return rateFrom / rateTo;
    }

    throw new Error("Invalid rate data");
}

export default function Convert() {
    const [amountL, setAmountL] = useState<number>(0);
    const [amountR, setAmountR] = useState<number>(0);
    const [selectedCurrencyL, setSelectedCurrencyL] = useState<Currency>({ code: "USD" });
    const [selectedCurrencyR, setSelectedCurrencyR] = useState<Currency>({ code: "EUR" });
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConvertClick = async (): Promise<void> => {
        setIsConverting(true);
        setError(null);
        try {
            if (selectedCurrencyL.code === selectedCurrencyR.code) {
                setAmountR(amountL);
            } else {
                const rate = await fetchRate(selectedCurrencyL.code, selectedCurrencyR.code);
                setAmountR(Number((amountL * rate).toFixed(2)));
            }
        } catch (e) {
            console.error(e);
            setAmountR(0);
            setError("Conversion failed. Please try again.");
        }
        setIsConverting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="flex items-center justify-center space-x-10 mb-6">
                <CurrencyConverter
                    amount={amountL}
                    setAmount={setAmountL}
                    selectedCurrency={selectedCurrencyL}
                    setSelectedCurrency={setSelectedCurrencyL}
                    currencies={AVAILABLE_CURRENCIES}
                />
                <button
                    className="border bg-[#1A2E40] p-5 rounded-[25px] text-white text-lg font-bold
                    transition transform active:scale-90 hover:bg-[#294661]"
                    onClick={handleConvertClick}
                    disabled={isConverting}
                >
                    {isConverting ? "Converting..." : "Convert currency"}
                </button>
                <ConvertedCurrency
                    amount={amountR}
                    setAmount={setAmountR}
                    selectedCurrency={selectedCurrencyR}
                    setSelectedCurrency={setSelectedCurrencyR}
                    currencies={AVAILABLE_CURRENCIES}
                />
            </div>
            {error && <p className="text-red-500 font-medium">{error}</p>}
        </div>
    );
}
