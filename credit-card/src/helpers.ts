export const t = (key: string, defaultValue: string) : string => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }

    const translationsAsText = document.getElementById('__TRANSLATIONS__')?.textContent
    window.__TRANSLATIONS__ = translationsAsText ? JSON.parse(translationsAsText) : undefined;

    return window.__TRANSLATIONS__?.[key] ?? defaultValue;
}

export const creditCardIconId: { [key: string]: string } = {
    'american-express': 'americanExpress',
    aura: 'aura',
    cb: 'cb',
    cirrus: 'cirrus',
    'diners-club': 'dinersClub',
    discover: 'discover',
    elo: 'elo',
    hipercard: 'hipercard',
    jcb: 'jcb',
    maestro: 'maestro',
    mastercard: 'mastercard',
    unionpay: 'unionPay',
    visa: 'visa',
    'visa-electron': 'visaElectron',
};


export const observeElementMutation = (element: Element, options?: { subtree?: boolean; childList?: boolean; attributes?: boolean}) => {
    const observer = new MutationObserver((mutationList, _observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes') {
                window.parent.postMessage({ height: document.body.scrollHeight }, "http://localhost:5173");
            }

        }
    })

    observer.observe(element, options);

    return observer;
}