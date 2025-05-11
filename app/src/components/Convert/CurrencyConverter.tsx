import React, { useEffect, useState } from "react";

interface Currency {
    code: string;
    rate: number;
}

interface BackendCurrency {
    code: string;
    rates: { bid: number; ask: number; date: string }[];
}

interface CurrencyConverterProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
}

export default function CurrencyConverter({
                                              amount,
                                              setAmount,
                                              selectedCurrency,
                                              setSelectedCurrency,
                                          }: CurrencyConverterProps) {
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("/currency");
                if (!response.ok) {
                    throw new Error("Failed to fetch currencies");
                }
                const data: BackendCurrency[] = await response.json();
                const fetchedCurrencies = data.map((currency) => ({
                    code: currency.code,
                    rate: currency.rates[0]?.bid || 0,
                }));
                setCurrencies(fetchedCurrencies);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);

    return (
        <div className="w-96 h-80 max-w-sm p-5 bg-[#1A2E40] rounded-xl flex flex-col justify-center shadow-md space-y-8">
            <label className="block text-white">Select currency:</label>
            <select
                className="w-full p-2 border rounded-md bg-[#1A2E40]"
                value={selectedCurrency.code}
                onChange={(e) => {
                    const currency = currencies.find((c) => c.code === e.target.value);
                    if (currency) {
                        setSelectedCurrency(currency);
                    }
                }}
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code}
                    </option>
                ))}
            </select>
            <label className="block text-white">Amount:</label>
            <input
                type="number"
                className="w-full p-2 bg-[#1A2E40] rounded-md border"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </div>
    );
}