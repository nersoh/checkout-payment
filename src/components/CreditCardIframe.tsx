import {useEffect, useState} from "react";

function CreditCardIframe() {
    const [height, setHeight] = useState<number | undefined>();

    useEffect(() => {
        const handlePostMessage = (event: MessageEvent) => {
            const iframeHeight = event.data?.height;
            if (iframeHeight !== height) {
                console.log('SET HEIGHT', iframeHeight);
                setHeight(iframeHeight);
            }
        }
        window.addEventListener('message', handlePostMessage);

        return () => window.removeEventListener('message', handlePostMessage);
    }, []);

    return (
        <div className="credit-card__iframe-container">
            <iframe className={`credit-card__iframe${height ? '--loaded': ''}`} height={height} src="http://localhost:5174"></iframe>
            {!height && <div className="credit-card__skeleton"/>}
        </div>
    )
}

export default CreditCardIframe;