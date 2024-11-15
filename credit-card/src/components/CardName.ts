import { fieldStyles} from "./styles";
import {observeElementMutation, t} from "../helpers";
import exclamationCircleIcon from "./icons/exclamationCircle";
import tickCircleIcon from "./icons/tickCircle";

export class CardName extends HTMLElement {
    private fieldElement!: Element;
    private inputElement!: HTMLInputElement;
    private errorElement!: Element;
    private mutationObserver!: MutationObserver;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the inner HTML
        this.shadowRoot!.innerHTML = `
            ${fieldStyles}
            <div class="field">
                <label for="card-name">${t('cardholder_name', 'Cardholder name')}</label>
                <div class="input-wrapper">
                    <input type="text" id="card-name" pattern="^[^;<!>\\d]+$" required>   
                    <div class="input-validation-icons">
                        <div class="input-icon error">
                            ${exclamationCircleIcon}
                        </div>
                        <div class="input-icon success">
                            ${tickCircleIcon}
                        </div>
                    </div> 
                </div>
                <div class="error" id="error"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.fieldElement = this.shadowRoot!.querySelector('.field')!;
        this.inputElement = this.shadowRoot!.querySelector('#card-name')!;
        this.errorElement = this.shadowRoot!.querySelector('#error')!;

        this.inputElement.addEventListener('blur', () => this.validate());
        this.mutationObserver = observeElementMutation(this.fieldElement, { attributes: true });
    }

    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }

    validate(): void {
        if (this.inputElement.validity.valueMissing) {
            this.showError('missing');
            return;
        }

        if(this.inputElement.validity.patternMismatch){
            this.showError('pattern');
            return;
        }

        this.fieldElement.classList.remove('hasError');
        this.fieldElement.classList.add('isValid');
        this.errorElement.innerHTML = '';
        this.fieldElement.removeAttribute('data-error-type');
    }

    showError(type: string): void {
        if (this.fieldElement.getAttribute('data-error-type') === type) {
            return;
        }

        this.fieldElement.classList.remove('isValid');
        this.fieldElement.classList.add('hasError');
        this.fieldElement.setAttribute('data-error-type', type);

        this.errorElement.innerHTML = '';

        const errorMessage: { [key: string]: string } = {
            missing: t('field_required', 'Required'),
            pattern: t('cardholder_name_pattern_invalid', 'Please enter the card holder name in this field')
        }
        const errorElementContent = document.createElement("div");

        errorElementContent.innerHTML = errorMessage[type] ?? '';

        this.errorElement.appendChild(errorElementContent);
    }
}
