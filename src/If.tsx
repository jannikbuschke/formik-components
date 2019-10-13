import * as React from "react"
import { Field, FieldProps } from "formik"

export function If({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return field.value ? children : null
      }}
    </Field>
  )
}

export function IfNot({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return !field.value ? children : null
      }}
    </Field>
  )
}

export function IfValid({ children }: { children: React.ReactNode }) {
  return (
    <Field name={name}>
      {({ form }: FieldProps<any>) => form.isValid && children}/>
    </Field>
  )
}

export function IfDirty({ children }: { children: React.ReactNode }) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => form.dirty && children}/>
    </Field>
  )
}

export function IfSubmitting({ children }: { children: React.ReactNode }) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => form.isSubmitting && children}/>
    </Field>
  )
}

export function IfValidating({ children }: { children: React.ReactNode }) {
    return <Field>
        {({ field, form }: FieldProps<any>) => form.isValidating? children:null}/>
    </Field>
}

export function IfTouched({ children }: { children: React.ReactNode }) {
    return <Field>
        {({ field, form }: FieldProps<any>) => form.touched?children:null}/>
    </Field>
}

export function IfError({ children }: { children: React.ReactNode }) {
    return <Field>
        {({ field, form }: FieldProps<any>) => (form.errors) && children}/>
    </Field>
}

export function IfField({
  name,
  children,
  value,
}: {
  name: string
  children: React.ReactNode
  value?: any
}) {
  return (
    <Field>
      {({ field, form }: FieldProps<any>) =>
        value === undefined
          ? field.value && children
          : field.value == value && children
      }
      />
    </Field>
  )
}
