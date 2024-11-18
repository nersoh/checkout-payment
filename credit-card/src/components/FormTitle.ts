import {t} from "../helpers";

export class FormTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot!.innerHTML = `
            <style>
                .form-title {
                  margin: 0 0 var(--spacers-24);
                  font-family: var(--typography-kicker-font-family), serif;
                  font-size: var(--typography-kicker-font-size);
                  text-transform: var(--typography-kicker-text-transform);
                  line-height: var(--typography-kicker-line-height);
                }
            </style>
            <p class="form-title">${t('card_details', 'Card details')}</p>
        `;
    }
}
