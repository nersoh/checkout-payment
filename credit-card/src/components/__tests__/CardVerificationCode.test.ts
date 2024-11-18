import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, test } from 'vitest';
import { CardVerificationCode } from '../CardVerificationCode';
import { screen } from 'shadow-dom-testing-library';
import {userEvent } from "@testing-library/user-event";

customElements.define('card-verification-code', CardVerificationCode);

describe('CardVerificationCode', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('renders with no value', async () => {
        document.body.innerHTML = `<card-verification-code></card-verification-code>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Security code'});
        expect(inputText).not.toHaveValue();
        expect(inputText).toBeDisabled();
    });

    test('renders empty code error on blur once the field is enabled', async () => {
        document.body.innerHTML = `<card-verification-code></card-verification-code>`;

        document.dispatchEvent(new CustomEvent('cardChanged', { detail: { code: { size: 3 } } }));

        const inputText = screen.getByShadowRole('textbox', { name: 'Security code'});

        expect(inputText).not.toHaveValue();

        await userEvent.click(inputText);
        await userEvent.tab();

        expect(screen.getByShadowTestId('cvv-errorMessage')).toHaveTextContent('Required');
    });

    test('renders invalid code error on blur', async () => {
        document.body.innerHTML = `<card-verification-code></card-verification-code>`;

        document.dispatchEvent(new CustomEvent('cardChanged', { detail: { code: { size: 3 } } }));

        const inputText = screen.getByShadowRole('textbox', { name: 'Security code'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '01');
        await userEvent.tab();

        expect(screen.getByShadowTestId('cvv-errorMessage')).toHaveTextContent('Invalid security code');
    });

    test('renders valid code', async () => {
        document.body.innerHTML = `<card-verification-code></card-verification-code>`;

        document.dispatchEvent(new CustomEvent('cardChanged', { detail: { code: { size: 3 } } }));

        const inputText = screen.getByShadowRole('textbox', { name: 'Security code'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '007');
        await userEvent.tab();

        expect(screen.getByShadowTestId('cvv-errorMessage')).toBeEmptyDOMElement();
    });
});
