import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, test } from 'vitest';
import { CardNumber } from '../CardNumber';
import { screen } from 'shadow-dom-testing-library';
import {userEvent } from "@testing-library/user-event";

customElements.define('card-number', CardNumber);

describe('CardNumber', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('renders with no value', async () => {
        document.body.innerHTML = `<card-number></card-number>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Card number'});
        expect(inputText).not.toHaveValue();
    });

    test('renders empty code error on blur once the field is enabled', async () => {
        document.body.innerHTML = `<card-number></card-number>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Card number'});

        expect(inputText).not.toHaveValue();

        await userEvent.click(inputText);
        await userEvent.tab();

        expect(screen.getByShadowTestId('cardnumber-errorMessage')).toHaveTextContent('Required');
    });

    test('renders invalid code error on blur', async () => {
        document.body.innerHTML = `<card-number></card-number>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Card number'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '01');
        await userEvent.tab();

        expect(screen.getByShadowTestId('cardnumber-errorMessage')).toHaveTextContent('Invalid card');
    });

    test('renders valid code', async () => {
        document.body.innerHTML = `<card-number></card-number>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Card number'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '4111 1111 1111 1111');
        await userEvent.tab();

        expect(screen.getByShadowTestId('cardnumber-errorMessage')).toBeEmptyDOMElement();
    });
});
