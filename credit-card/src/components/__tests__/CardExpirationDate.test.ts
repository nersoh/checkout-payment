import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, test } from 'vitest';
import { CardExpirationDate } from '../CardExpirationDate';
import { screen } from 'shadow-dom-testing-library';
import {userEvent } from "@testing-library/user-event";

customElements.define('card-expiration-date', CardExpirationDate);

describe('CardExpirationDate', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('renders with no value', async () => {
        document.body.innerHTML = `<card-expiration-date></card-expiration-date>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Expiration date'});
        expect(inputText).not.toHaveValue();
    });

    test('renders empty date error on blur once the field is enabled', async () => {
        document.body.innerHTML = `<card-expiration-date></card-expiration-date>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Expiration date'});

        expect(inputText).not.toHaveValue();

        await userEvent.click(inputText);
        await userEvent.tab();

        expect(screen.getByShadowTestId('expirationdate-errorMessage')).toHaveTextContent('Required');
    });

    test('renders invalid date error on blur', async () => {
        document.body.innerHTML = `<card-expiration-date></card-expiration-date>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Expiration date'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '01');
        await userEvent.tab();

        expect(screen.getByShadowTestId('expirationdate-errorMessage')).toHaveTextContent('Check your expiration date');
    });

    test('renders valid date', async () => {
        document.body.innerHTML = `<card-expiration-date></card-expiration-date>`;

        const nextYearTwoDigits = ((new Date()).getFullYear() + 1).toString().slice(2);

        const inputText = screen.getByShadowRole('textbox', { name: 'Expiration date'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, `12/${nextYearTwoDigits}`);
        await userEvent.tab();

        expect(screen.getByShadowTestId('expirationdate-errorMessage')).toBeEmptyDOMElement();
    });
});
