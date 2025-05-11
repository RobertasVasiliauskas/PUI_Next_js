'use client'

import { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";
import ConvertedCurrency from "./ConvertedCurrency";

interface Currency {
    code: string;
    rate: number;
}

interface CurrencyConverterProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    selectedCurrency: Currency;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>;
    currencies: Currency[];
}

export default function Convert() {
    const [amountL, setAmountL] = useState<number>(0);
    const [amountR, setAmountR] = useState<number>(0);
    const [selectedCurrencyL, setSelectedCurrencyL] = useState<Currency | null>(null);
    const [selectedCurrencyR, setSelectedCurrencyR] = useState<Currency | null>(null);
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("/currency");
                if (!response.ok) throw new Error("Failed to fetch currencies");
                const data: { code: string; rates: { bid: number }[] }[] = await response.json();
                const fetchedCurrencies = data.map((currency) => ({
                    code: currency.code,
                    rate: currency.rates[0]?.bid || 0,
                }));

                setCurrencies(fetchedCurrencies);

                const usdCurrency = fetchedCurrencies.find((c: Currency) => c.code === "USD");
                const eurCurrency = fetchedCurrencies.find((c: Currency) => c.code === "EUR");
                if (usdCurrency) setSelectedCurrencyL(usdCurrency);
                if (eurCurrency) setSelectedCurrencyR(eurCurrency);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);

    const handleConvertClick = (): void => {
        if (selectedCurrencyL && selectedCurrencyR) {
            const convertedAmount = (amountL * selectedCurrencyL.rate) / selectedCurrencyR.rate;
            setAmountR(isNaN(convertedAmount) ? 0 : parseFloat(convertedAmount.toFixed(2)));
        }
    };

    return (
        <div className="flex items-center justify-center space-x-10 py-10 mt-35">
            {selectedCurrencyL && selectedCurrencyR && (
                <>
                    <CurrencyConverter
                        amount={amountL}
                        setAmount={setAmountL}
                        selectedCurrency={selectedCurrencyL as Currency}
                        setSelectedCurrency={setSelectedCurrencyL as React.Dispatch<React.SetStateAction<Currency>>}
                        currencies={currencies}
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
                        selectedCurrency={selectedCurrencyR as Currency}
                        setSelectedCurrency={setSelectedCurrencyR as React.Dispatch<React.SetStateAction<Currency>>}
                        currencies={currencies}
                    />
                </>
            )}
        </div>
    );
}