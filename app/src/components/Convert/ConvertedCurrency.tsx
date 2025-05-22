import React from "react";

interface Currency {
    code: string;
}

interface ConvertedCurrencyProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    selectedCurrency: Currency;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>;
    currencies: string[];
}

export default function ConvertedCurrency({
    amount,
    selectedCurrency,
    setSelectedCurrency,
    currencies,
}: ConvertedCurrencyProps) {
    return (
        <div className="w-96 h-80 max-w-sm p-5 bg-[#1A2E40] rounded-xl flex flex-col justify-center shadow-md space-y-8">
            <label className="block text-white">Select currency:</label>
            <select
                className="w-full p-2 border rounded-md bg-[#1A2E40]"
                value={selectedCurrency.code}
                onChange={(e) => {
                    setSelectedCurrency({ code: e.target.value });
                }}
            >
                {currencies.map((code) => (
                    <option key={code} value={code}>
                        {code}
                    </option>
                ))}
            </select>

            <label className="block text-white">Converted Amount:</label>
            <input
                type="text"
                className="w-full p-2 bg-gray-300 rounded-md border text-black"
                value={amount}
                readOnly
            />
        </div>
    );
}
