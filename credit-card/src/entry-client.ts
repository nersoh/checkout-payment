import './normalize.css'
import './style.css'
import { CardName } from './components/CardName'
import { CardNumber } from './components/CardNumber'
import { CardExpirationDate } from './components/CardExpirationDate'
import { CardVerificationCode } from './components/CardVerificationCode'
import { FormTitle } from './components/FormTitle'
import App from './shared/app'

customElements.define('form-title', FormTitle);
customElements.define('card-name', CardName);
customElements.define('card-number', CardNumber);
customElements.define('card-expiration-date', CardExpirationDate);
customElements.define('card-verification-code', CardVerificationCode);


App.init();
