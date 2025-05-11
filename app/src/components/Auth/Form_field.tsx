type FormFieldProps = {
    label: string;
    type: string;
    onChange: (value: string) => void;
};

export default function FormField({ label, type, onChange }: FormFieldProps) {
    return (
        <div>
            <label className="text-3xl">
                {label}
            </label>
            <input
                name={label.toLowerCase()}
                type={type}
                className="block mt-2 border border-black rounded-[5px] w-full h-[5rem] text-4xl"
                placeholder={`Enter your ${label.toLowerCase()}`}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
