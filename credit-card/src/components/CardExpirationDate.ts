import {fieldStyles} from "./styles.ts";
import {observeElementMutation, t} from "../helpers";
import valid from 'card-validator';
import exclamationCircleIcon from "./icons/exclamationCircle";
import tickCircleIcon from "./icons/tickCircle";

export class CardExpirationDate extends HTMLElement {
    private errorElement!: HTMLElement;
    private inputElement!: HTMLInputElement;
    private fieldElement!: Element;
    private mutationObserver!: MutationObserver;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the inner HTML
        this.shadowRoot!.innerHTML = `
            ${fieldStyles}
            <style>
                .field {
                    width: 50%;
                    @media (min-width: 36rem) {
                        width: 100%;
                    }
                }
            </style>
            <div class="field">
                <label for="card-expiration-date">${t('cardholder_expiration_date', 'Expiration date')}</label>
              
                <div class="input-wrapper">
                    <input type="text" id="card-expiration-date" placeholder="${t('wbt_mm/yy', 'MM/YY')}" required>
                    <div class="input-validation-icons">
                        <div class="input-icon error">
                            ${exclamationCircleIcon}
                        </div>
                        <div class="input-icon success">
                            ${tickCircleIcon}
                        </div>
                    </div>
                </div>
                <div class="error" id="error" data-testid="expirationdate-errorMessage"></div>
            </div>
        `;
    }

    connectedCallback() {
        // Set the initial count from attribute if provided
        this.fieldElement = this.shadowRoot!.querySelector('.field')!;
        this.inputElement = this.shadowRoot!.querySelector('#card-expiration-date')!;
        this.errorElement = this.shadowRoot!.querySelector('#error')!;

        this.inputElement.addEventListener('blur', () => this.validate());
        this.mutationObserver = observeElementMutation(this.fieldElement, { attributes: true });
    }

    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }

    validate(): void {
        if (!this.inputElement.validity.valid) {
            this.fieldElement.classList.add('hasError');
            this.fieldElement.classList.remove('isValid');
            this.errorElement.innerHTML = t('field_required', 'Required');
            return;
        }

        if (!valid.expirationDate(this.inputElement.value).isValid) {
            this.fieldElement.classList.add('hasError');
            this.fieldElement.classList.remove('isValid');
            this.errorElement.innerHTML = t('check_your_expiration', 'Check your expiration date');
            return;
        }

        this.errorElement.innerHTML = '';
        this.fieldElement.classList.remove('hasError');
        this.fieldElement.classList.add('isValid');
    }
}
