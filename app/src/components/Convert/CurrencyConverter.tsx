interface Currency {
    code: string;
}

interface CurrencyConverterProps {
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    currencies: string[];
}

export default function CurrencyConverter({
                                              amount,
                                              setAmount,
                                              selectedCurrency,
                                              setSelectedCurrency,
                                              currencies,
                                          }: CurrencyConverterProps) {
    return (
        <div className="w-96 h-80 max-w-sm p-5 bg-[#1A2E40] rounded-xl flex flex-col justify-center shadow-md space-y-8">
            <label className="block text-white">Select currency:</label>
            <select
                className="w-full p-2 border rounded-md bg-[#1A2E40] text-white"
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
            <label className="block text-white">Amount:</label>
            <input
                type="number"
                className="w-full p-2 bg-[#1A2E40] rounded-md border text-white"
                placeholder="0"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </div>
    );
}
