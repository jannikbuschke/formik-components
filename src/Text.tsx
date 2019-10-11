import { Field, FieldProps } from "formik"
import * as React from "react"

export const Text = (props: { name: string }) => (
  <Field {...props}>
    {({ field }: FieldProps) => (field.value ? field.value : null)}
  </Field>
)
