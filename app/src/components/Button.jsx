import React from 'react';

export default function Button({ text, className, onClick }) {
    return (
        <button className={`bg-[#1A2E40] ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}