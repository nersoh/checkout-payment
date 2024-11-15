export const fieldStyles = `
     <style>
        .field {
            font-family: var(--typography-body-font-family), serif;
            font-size: var(--typography-footnote-font-size);
            line-height: var(--typography-footnote-line-height);
            display: block;
            color: var(--colors-forms-primary-default-enabled-label);
            text-align: left;
        }
        
        label {
            display: block;
            margin-bottom: var(--spacers-4);
        }
        
        .input-wrapper {
            position: relative;
            display: flex;
            padding-right: var(--spacers-12);
            border-radius: var(--borders-corner-m);
            border: var(--borders-border-s) solid var(--colors-forms-primary-default-enabled-stroke);
            flex-wrap: nowrap;
            align-items: center;
            cursor: text;
            background-color: var(--colors-forms-primary-default-enabled-surface);
            color: var(--colors-forms-primary-default-enabled-label);
            
            input {
                padding: 0;
                padding-inline-start: var(--spacers-16);
                width: 100%;
                border: none;
                outline: none;
                height: calc(4.4rem - var(--borders-border-m));
                border-radius: var(--borders-corner-m);
                appearance: none;
                text-overflow: ellipsis;
                background-color: var(--colors-forms-primary-default-enabled-surface);
                font-family: var(--typography-body-font-family), serif;
                font-size: var(--typography-body-font-size);
                line-height: var(--typography-body-line-height);
                color: var(--colors-forms-primary-default-enabled-label);
            }
            input:disabled {
                height: 4.4rem;
                background-color: var(--colors-forms-primary-default-disabled-surface);
                color: var(--colors-forms-primary-default-disabled-label);
            }
        }
        .input-wrapper:focus-within {
            outline: 0.1rem auto -webkit-focus-ring-color;
        }
        .input-container {
            width: 50%;
            @media (min-width: 36rem) {
                width: 30%;
            }
            
        }
        .field.disabled .input-wrapper {
            border: 0;
            background-color: var(--colors-forms-primary-default-disabled-surface);
            color: var(--colors-forms-primary-default-disabled-label);
        }
        
        .input-validation-icons {
            position: relative;
            display: flex;
            /*width: var(--icons-medium-width);*/
            height: var(--icons-medium-height);
            align-items: center;
        }
        
        .input-card-type {
            width: 4.8rem;
            height: 3rem;
            border-radius: var(--borders-corner-s);
        }

        .input-icon {
            position: absolute;
            visibility: hidden;
            height: var(--icons-medium-height);
        }
        
        .input-icon svg {
            width: var(--icons-medium-width);
            height: var(--icons-medium-height);
        }
        
        .input-icon.success {
            fill: var( --colors-forms-primary-success-enabled-validation-icon);
        }

        .input-icon.error {
            fill: var(--colors-forms-primary-error-enabled-validation-icon);
        }
        
        .hasError .input-wrapper {
            border: var(--borders-border-s) solid var(--colors-forms-primary-error-enabled-stroke);
            margin-bottom: var(--spacers-4);
        }
        
        .hasError .input-icon.error,
        .isValid .input-icon.success {
            position: static;
            visibility: visible;
        }
        
        .error {
            display: none;
            font-family: var(--typography-body-font-family), serif;
            font-size: var(--typography-footnote-font-size);
            line-height: var(--typography-footnote-line-height);
        }
        
        .hasError .error {
            display: block;
            color: var(--colors-forms-primary-error-enabled-stroke);
        }
    </style>
`