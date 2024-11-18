import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, test } from 'vitest';
import { CardName } from '../CardName';
import { screen } from 'shadow-dom-testing-library';
import {userEvent } from "@testing-library/user-event";

customElements.define('card-name', CardName);


describe('CardName', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('renders with no value', async () => {
        document.body.innerHTML = `<card-name></card-name>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Cardholder name'});
        expect(inputText).not.toHaveValue();
    });

    test('renders empty name error on blur', async () => {
        document.body.innerHTML = `<card-name></card-name>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Cardholder name'});

        expect(inputText).not.toHaveValue();

        await userEvent.click(inputText);
        await userEvent.tab();

        expect(screen.getByShadowTestId('holdername-errorMessage')).toHaveTextContent('Required');
    });

    test('renders invalid name error on blur', async () => {
        document.body.innerHTML = `<card-name></card-name>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Cardholder name'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, '012');
        await userEvent.tab();

        expect(screen.getByShadowTestId('holdername-errorMessage')).toHaveTextContent('Please enter the card holder name in this field');
    });

    test('renders valid name', async () => {
        document.body.innerHTML = `<card-name></card-name>`;

        const inputText = screen.getByShadowRole('textbox', { name: 'Cardholder name'});

        expect(inputText).not.toHaveValue();

        await userEvent.type(inputText, 'Bom Kim');
        await userEvent.tab();

        expect(screen.getByShadowTestId('holdername-errorMessage')).toBeEmptyDOMElement();
    });
});
