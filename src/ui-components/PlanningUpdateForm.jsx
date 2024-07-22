/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPlanning } from "../graphql/queries";
import { updatePlanning } from "../graphql/mutations";
const client = generateClient();
export default function PlanningUpdateForm(props) {
  const {
    id: idProp,
    planning: planningModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    hour: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [hour, setHour] = React.useState(initialValues.hour);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = planningRecord
      ? { ...initialValues, ...planningRecord }
      : initialValues;
    setDate(cleanValues.date);
    setHour(cleanValues.hour);
    setErrors({});
  };
  const [planningRecord, setPlanningRecord] = React.useState(planningModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPlanning.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPlanning
        : planningModelProp;
      setPlanningRecord(record);
    };
    queryData();
  }, [idProp, planningModelProp]);
  React.useEffect(resetStateValues, [planningRecord]);
  const validations = {
    date: [],
    hour: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          date: date ?? null,
          hour: hour ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updatePlanning.replaceAll("__typename", ""),
            variables: {
              input: {
                id: planningRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PlanningUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              hour,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Hour"
        isRequired={false}
        isReadOnly={false}
        value={hour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              hour: value,
            };
            const result = onChange(modelFields);
            value = result?.hour ?? value;
          }
          if (errors.hour?.hasError) {
            runValidationTasks("hour", value);
          }
          setHour(value);
        }}
        onBlur={() => runValidationTasks("hour", hour)}
        errorMessage={errors.hour?.errorMessage}
        hasError={errors.hour?.hasError}
        {...getOverrideProps(overrides, "hour")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || planningModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || planningModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
