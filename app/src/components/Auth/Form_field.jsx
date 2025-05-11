export default function Form_field({ label, type }) {
    return (
        <div>
            <label className={"text-3xl"}>
                {label}
            </label>
            <input
                name={label.toLowerCase()}
                type={type}
                className={"block mt-2 border-solid border-1 border-black rounded-[5px] w-full h-[5rem] text-4xl"}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
}