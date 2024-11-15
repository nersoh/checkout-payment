import {observeElementMutation, t} from "../helpers";
import exclamationCircleIcon from "./icons/exclamationCircle";
import tickCircleIcon from "./icons/tickCircle";
import { fieldStyles } from "./styles";
import valid from "card-validator";

export class CardVerificationCode extends HTMLElement {
    private errorElement!: Element;
    private fieldElement!: Element;
    private inputElement!: HTMLInputElement;
    private mutationObserver!: MutationObserver;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot!.innerHTML = `
             ${fieldStyles}
            <div class="field disabled">
                <label for="card-verification-code">${t('cardholder_cvc', 'Security code')}</label>
                <div class="input-container">
                    <div class="input-wrapper">
                        <input type="text" id="card-verification-code" disabled required>
                        <div class="input-validation-icons">
                            <div class="input-icon error">
                                ${exclamationCircleIcon}
                            </div>
                            <div class="input-icon success">
                                ${tickCircleIcon}
                            </div>
                        </div>
                    </div>
                    <div class="error" id="error" data-testid="cvv-errorMessage"></div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.fieldElement = this.shadowRoot!.querySelector('.field')!;
        this.inputElement = this.shadowRoot!.querySelector('#card-verification-code')!;
        this.errorElement = this.shadowRoot!.querySelector('#error')!;

        this.inputElement.addEventListener('blur', this.validate.bind(this));
        document.addEventListener('cardChanged', this.onChangeCard.bind(this));
        this.mutationObserver = observeElementMutation(this.fieldElement, { attributes: true });
    }

    disconnectedCallback() {
        this.inputElement.removeEventListener('blur', this.validate.bind(this));
        document.removeEventListener('cardChanged', this.onChangeCard.bind(this));
        this.mutationObserver.disconnect();
    }

    validate(): void {
        if (!this.inputElement.validity.valid) {
            this.fieldElement.classList.add('hasError');
            this.fieldElement.classList.remove('isValid');
            this.errorElement.innerHTML = t('field_required', 'Required');
            return;
        }

        if (!valid.cvv(this.inputElement.value, this.inputElement.maxLength).isValid) {
            this.fieldElement.classList.add('hasError');
            this.fieldElement.classList.remove('isValid');
            this.errorElement.innerHTML = t('cvc_invalid', 'Invalid security code');
            return;
        }

        this.fieldElement.classList.add('isValid');
        this.fieldElement.classList.remove('hasError');
    }

    onChangeCard (event: Event): void {
        const code = (event as CustomEvent).detail?.code;

        if (code) {
            this.enable(code.size);
            return;
        }
        this.disable();
    }

    enable (maxLength: number): void {
        if (!this.inputElement.disabled) {
            return;
        }
        this.inputElement.setAttribute('maxLength', String(maxLength));
        this.inputElement.removeAttribute('disabled');
        this.fieldElement.classList.remove('disabled');
    }

    disable () {
        if (this.inputElement.disabled) {
            return;
        }

        this.inputElement.setAttribute('disabled', '');
        this.fieldElement.classList.add('disabled');
        this.fieldElement.classList.remove('hasError');
        this.fieldElement.classList.remove('isValid');
        this.inputElement.value = '';
    }
}
