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
export declare type PlanningCreateFormInputValues = {
    date?: string;
    hour?: string;
};
export declare type PlanningCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    hour?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlanningCreateFormOverridesProps = {
    PlanningCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    hour?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlanningCreateFormProps = React.PropsWithChildren<{
    overrides?: PlanningCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PlanningCreateFormInputValues) => PlanningCreateFormInputValues;
    onSuccess?: (fields: PlanningCreateFormInputValues) => void;
    onError?: (fields: PlanningCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlanningCreateFormInputValues) => PlanningCreateFormInputValues;
    onValidate?: PlanningCreateFormValidationValues;
} & React.CSSProperties>;
export default function PlanningCreateForm(props: PlanningCreateFormProps): React.ReactElement;
