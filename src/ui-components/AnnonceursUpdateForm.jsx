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
import { getAnnonceurs } from "../graphql/queries";
import { updateAnnonceurs } from "../graphql/mutations";
const client = generateClient();
export default function AnnonceursUpdateForm(props) {
  const {
    id: idProp,
    annonceurs: annonceursModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Nom: "",
    numero: "",
    mail: "",
  };
  const [Nom, setNom] = React.useState(initialValues.Nom);
  const [numero, setNumero] = React.useState(initialValues.numero);
  const [mail, setMail] = React.useState(initialValues.mail);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = annonceursRecord
      ? { ...initialValues, ...annonceursRecord }
      : initialValues;
    setNom(cleanValues.Nom);
    setNumero(cleanValues.numero);
    setMail(cleanValues.mail);
    setErrors({});
  };
  const [annonceursRecord, setAnnonceursRecord] =
    React.useState(annonceursModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getAnnonceurs.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAnnonceurs
        : annonceursModelProp;
      setAnnonceursRecord(record);
    };
    queryData();
  }, [idProp, annonceursModelProp]);
  React.useEffect(resetStateValues, [annonceursRecord]);
  const validations = {
    Nom: [],
    numero: [],
    mail: [{ type: "Email" }],
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
          Nom: Nom ?? null,
          numero: numero ?? null,
          mail: mail ?? null,
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
            query: updateAnnonceurs.replaceAll("__typename", ""),
            variables: {
              input: {
                id: annonceursRecord.id,
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
      {...getOverrideProps(overrides, "AnnonceursUpdateForm")}
      {...rest}
    >
      <TextField
        label="Nom"
        isRequired={false}
        isReadOnly={false}
        value={Nom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Nom: value,
              numero,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.Nom ?? value;
          }
          if (errors.Nom?.hasError) {
            runValidationTasks("Nom", value);
          }
          setNom(value);
        }}
        onBlur={() => runValidationTasks("Nom", Nom)}
        errorMessage={errors.Nom?.errorMessage}
        hasError={errors.Nom?.hasError}
        {...getOverrideProps(overrides, "Nom")}
      ></TextField>
      <TextField
        label="Numero"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={numero}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Nom,
              numero: value,
              mail,
            };
            const result = onChange(modelFields);
            value = result?.numero ?? value;
          }
          if (errors.numero?.hasError) {
            runValidationTasks("numero", value);
          }
          setNumero(value);
        }}
        onBlur={() => runValidationTasks("numero", numero)}
        errorMessage={errors.numero?.errorMessage}
        hasError={errors.numero?.hasError}
        {...getOverrideProps(overrides, "numero")}
      ></TextField>
      <TextField
        label="Mail"
        isRequired={false}
        isReadOnly={false}
        value={mail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Nom,
              numero,
              mail: value,
            };
            const result = onChange(modelFields);
            value = result?.mail ?? value;
          }
          if (errors.mail?.hasError) {
            runValidationTasks("mail", value);
          }
          setMail(value);
        }}
        onBlur={() => runValidationTasks("mail", mail)}
        errorMessage={errors.mail?.errorMessage}
        hasError={errors.mail?.hasError}
        {...getOverrideProps(overrides, "mail")}
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
          isDisabled={!(idProp || annonceursModelProp)}
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
              !(idProp || annonceursModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
