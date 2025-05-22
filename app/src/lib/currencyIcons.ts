import icon from "../../public/Book_open.svg";

const currencyIcons: Record<string, string> = {
    USD: icon,
    EUR: icon,
    PLN: icon,
    GBP: icon,
    JPY: icon,
    CAD: icon,
    AUD: icon,
    CHF: icon,
    SEK: icon,
    NOK: icon,
    CZK: icon,
    HUF: icon,
    INR: icon,
    CNY: icon,
    BRL: icon,
    MXN: icon,
    ZAR: icon,
    NZD: icon,
    SGD: icon,
    KRW: icon,
};

export const getCurrencyIcon = (currency: string): string => {
    return currencyIcons[currency];
};
