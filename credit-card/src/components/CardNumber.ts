import { fieldStyles } from "./styles";
import {creditCardIconId, observeElementMutation, t} from "../helpers";
import tickCircleIcon from "./icons/tickCircle";
import exclamationCircleIcon from "./icons/exclamationCircle";
import valid from "card-validator";
import {paymentMethodSvg} from "../paymentLogos";

export class CardNumber extends HTMLElement {
    private fieldElement!: Element;
    private inputElement!: HTMLInputElement;
    private errorElement!: Element;
    private mutationObserver!: MutationObserver;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render () {
        this.shadowRoot!.innerHTML = `
             ${fieldStyles}
            <div class="field">
                <label for="card-number">${t('cardholder_number', 'Card number')}</label>
                <div class="input-wrapper">
                    <input type="text" id="card-number" required>
                    <div class="input-validation-icons">
                        <div class="input-card-type"></div>
                        <div class="input-icon error">
                            ${exclamationCircleIcon}
                        </div>
                        <div class="input-icon success">
                            ${tickCircleIcon}
                        </div>
                    </div>
                </div>
                <div class="error" id="error">${t('field_required', 'Required')}</div>
            </div>
        `;
    }

    connectedCallback() {
        this.fieldElement = this.shadowRoot!.querySelector('.field')!;
        this.inputElement = this.shadowRoot!.querySelector('#card-number')!;
        this.errorElement = this.shadowRoot!.querySelector('#error')!;

        this.inputElement.addEventListener('blur', () => this.validate());
        this.inputElement.addEventListener('input', () => this.checkCardType());
        this.mutationObserver = observeElementMutation(this.fieldElement, { attributes: true });
    }

    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }

    validate(): void {
        if (!this.inputElement.validity.valid) {
            this.fieldElement.classList.remove('isValid');
            this.fieldElement.classList.add('hasError');
            this.errorElement.innerHTML = t('field_required', 'Required');

            return;
        }
        if (!valid.number(this.inputElement.value).isValid) {
            this.fieldElement.classList.remove('isValid');
            this.fieldElement.classList.add('hasError');
            this.errorElement.innerHTML = t('cardholder_number_invalid', 'Invalid card');

            return;
        }
        this.fieldElement.classList.remove('hasError');
        this.fieldElement.classList.add('isValid');
    }

    checkCardType(): void {
        const {card} = valid.number(this.inputElement.value);

        document.dispatchEvent(new CustomEvent('cardChanged', { detail: card }));

        if (!card) {
            this.fieldElement.querySelector('.input-card-type')!.innerHTML = '';
            return;
        }

        const cardType = creditCardIconId[card.type];

        if (cardType) {
            this.fieldElement.querySelector('.input-card-type')!.innerHTML = paymentMethodSvg[cardType];
        }
    }
}
