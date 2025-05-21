const currencyIcons: Record<string, string> = {
    USD: "https://www.svgrepo.com/svg/532432/dollar-sign",
    EUR: "https://www.svgrepo.com/show/53498/euro.svg",
    PLN: "https://www.svgrepo.com/show/505224/polish-zloty.svg",
    GBP: "https://www.svgrepo.com/show/505223/british-pound.svg",
    JPY: "https://www.svgrepo.com/show/505226/japanese-yen.svg",
    CAD: "https://www.svgrepo.com/show/505225/canadian-dollar.svg",
    AUD: "https://www.svgrepo.com/show/505222/australian-dollar.svg",
    CHF: "https://www.svgrepo.com/show/505228/swiss-franc.svg",
    SEK: "https://www.svgrepo.com/show/505229/swedish-krona.svg",
    NOK: "https://www.svgrepo.com/show/505230/norwegian-krone.svg",
    CZK: "https://www.svgrepo.com/show/505231/czech-koruna.svg",
    HUF: "https://www.svgrepo.com/show/505232/hungarian-forint.svg",
    INR: "https://www.svgrepo.com/show/505233/indian-rupee.svg",
    CNY: "https://www.svgrepo.com/show/505234/chinese-yuan.svg",
    BRL: "https://www.svgrepo.com/show/505235/brazilian-real.svg",
    MXN: "https://www.svgrepo.com/show/505236/mexican-peso.svg",
    ZAR: "https://www.svgrepo.com/show/505237/south-african-rand.svg",
    NZD: "https://www.svgrepo.com/show/505238/new-zealand-dollar.svg",
    SGD: "https://www.svgrepo.com/show/505239/singapore-dollar.svg",
    KRW: "https://www.svgrepo.com/show/505240/south-korean-won.svg",
};

export const getCurrencyIcon = (currency: string): string => {
    return currencyIcons[currency] || "https://www.svgrepo.com/show/505241/default-currency.svg"; // Fallback icon
};
