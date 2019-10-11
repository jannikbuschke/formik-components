import * as React from "react"
import { Field, FieldProps, FieldArray, FieldArrayRenderProps } from "formik"

interface Props {
  name: string
  renderNewPlaceholder: boolean
  renderItem: (
    i: number,
    isLast: boolean,
    array: FieldArrayRenderProps,
    path: string,
  ) => React.ReactNode
}

export function Array({ name, renderItem, renderNewPlaceholder }: Props) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => {
        return (
          <FieldArray name={name}>
            {(array) => {
              const value = field.value || []
              if (renderNewPlaceholder) {
                return value
                  .map((_: any, i: number) =>
                    renderItem(i, false, array, name + "." + i + "."),
                  )
                  .concat([
                    renderItem(
                      value.length,
                      true,
                      array,
                      name + "." + value.length + ".",
                    ),
                  ])
              } else {
                return value.map((_: any, i: number) =>
                  renderItem(i, false, array, name + "." + i + "."),
                )
              }
            }}
          </FieldArray>
        )
      }}
    </Field>
  )
}
