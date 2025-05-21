import React from "react";

interface FormFieldProps {
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ type, label, value, onChange }) => {
    return (
        <div>
            <label className="block text-xl mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default FormField;