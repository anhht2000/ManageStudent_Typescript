import { Box, Button, CircularProgress, FormControl } from "@material-ui/core";
import { useAppSelector } from "app/hooks";
import { InputsField } from "component/FormField/InputsField";
import RidioFields from "component/FormField/RidioFields";
import SelectField from "component/FormField/SelectField";
import { getListCity } from "features/city/citySlice";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { students } from "typeData";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@material-ui/lab";

interface StudentFormProps {
  initialValues?: students;
  error: string;
  onbubmit: (formValue: students) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .test("two-words", "Please enter 2 word", (value) => {
      if (!value) return true;
      const part = value.split(" ");
      return part.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive("Please enter positive number")
    .min(18, "Min is 18")
    .max(60, "Max is 60")
    .required("Please enter your age")
    .typeError("Please enter number"),

  mark: yup
    .number()
    .positive("Please enter positive number")
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .required("Please enter your mark")
    .typeError("Please enter number"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select either male or female")
    .required("Please select your gender"),
});
export default function StudentForm({
  initialValues,
  onbubmit,
  error,
}: StudentFormProps): ReactElement {
  const ListCity = useAppSelector(getListCity);
  const newListCityToSelect: Array<{ value: string; label: string }> = ListCity.map((city) => {
    return { value: city.code, label: city.name };
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<students>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <Box width='40%' margin='auto'>
      <form onSubmit={handleSubmit(onbubmit)}>
        <InputsField name='name' control={control} label='Name' />

        <InputsField name='age' control={control} label='Age' />

        <InputsField name='mark' control={control} label='Mark' />

        <RidioFields
          name='gender'
          control={control}
          label='Gender'
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        <SelectField name='city' control={control} label='City' options={newListCityToSelect} />

        {error && <Alert severity='error'>Error connect to server </Alert>}
        <Box mt={2}>
          <Button variant='outlined' type='submit'>
            {isSubmitting && <CircularProgress size='small' />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
