/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AnnonceursUpdateFormInputValues = {
    Nom?: string;
    numero?: number;
    mail?: string;
    admin?: boolean;
};
export declare type AnnonceursUpdateFormValidationValues = {
    Nom?: ValidationFunction<string>;
    numero?: ValidationFunction<number>;
    mail?: ValidationFunction<string>;
    admin?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnnonceursUpdateFormOverridesProps = {
    AnnonceursUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Nom?: PrimitiveOverrideProps<TextFieldProps>;
    numero?: PrimitiveOverrideProps<TextFieldProps>;
    mail?: PrimitiveOverrideProps<TextFieldProps>;
    admin?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AnnonceursUpdateFormProps = React.PropsWithChildren<{
    overrides?: AnnonceursUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    annonceurs?: any;
    onSubmit?: (fields: AnnonceursUpdateFormInputValues) => AnnonceursUpdateFormInputValues;
    onSuccess?: (fields: AnnonceursUpdateFormInputValues) => void;
    onError?: (fields: AnnonceursUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnnonceursUpdateFormInputValues) => AnnonceursUpdateFormInputValues;
    onValidate?: AnnonceursUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AnnonceursUpdateForm(props: AnnonceursUpdateFormProps): React.ReactElement;
