/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AnnonceursCreateFormInputValues = {
    Nom?: string;
    numero?: number;
    mail?: string;
};
export declare type AnnonceursCreateFormValidationValues = {
    Nom?: ValidationFunction<string>;
    numero?: ValidationFunction<number>;
    mail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnnonceursCreateFormOverridesProps = {
    AnnonceursCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Nom?: PrimitiveOverrideProps<TextFieldProps>;
    numero?: PrimitiveOverrideProps<TextFieldProps>;
    mail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnnonceursCreateFormProps = React.PropsWithChildren<{
    overrides?: AnnonceursCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AnnonceursCreateFormInputValues) => AnnonceursCreateFormInputValues;
    onSuccess?: (fields: AnnonceursCreateFormInputValues) => void;
    onError?: (fields: AnnonceursCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnnonceursCreateFormInputValues) => AnnonceursCreateFormInputValues;
    onValidate?: AnnonceursCreateFormValidationValues;
} & React.CSSProperties>;
export default function AnnonceursCreateForm(props: AnnonceursCreateFormProps): React.ReactElement;
