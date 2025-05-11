
const currencies = [
    {code: "USD", rate: 4.0},
    {code: "EUR", rate: 4.5},
    {code: "GBP", rate: 5.2},
    {code: "PLN", rate: 1.0},

]
export default function ConvertedCurrency({amount, selectedCurrency, setSelectedCurrency}) {


    return (
        <div className="w-96 h-80 max-w-sm p-5 bg-[#1A2E40] rounded-xl flex flex-col justify-center shadow-md space-y-8">
            <label className="block text-white">Select currency:</label>
            <select className="w-full p-2 border rounded-md bg-[#1A2E40]"
                    value={selectedCurrency.code}
                    onChange={(e) =>{
                        const currency = currencies.find((c) => c.code === e.target.value);
                        setSelectedCurrency(currency);
                    }}
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code}
                    </option>
                ))}

            </select>

            <label className="block text-white">Converted Amount:</label>
            <input
                type="text"
                className="w-full p-2 bg-gray-300 rounded-md border text-black"
                placeholder={`${amount}`}
                readOnly
            />
        </div>
    )
}