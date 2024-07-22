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
export declare type PlanningUpdateFormInputValues = {
    date?: string;
    hour?: string;
};
export declare type PlanningUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    hour?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlanningUpdateFormOverridesProps = {
    PlanningUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    hour?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlanningUpdateFormProps = React.PropsWithChildren<{
    overrides?: PlanningUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    planning?: any;
    onSubmit?: (fields: PlanningUpdateFormInputValues) => PlanningUpdateFormInputValues;
    onSuccess?: (fields: PlanningUpdateFormInputValues) => void;
    onError?: (fields: PlanningUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlanningUpdateFormInputValues) => PlanningUpdateFormInputValues;
    onValidate?: PlanningUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PlanningUpdateForm(props: PlanningUpdateFormProps): React.ReactElement;
