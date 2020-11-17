import * as React from "react"
import { Field, FieldProps, FieldArray, FieldArrayRenderProps } from "formik"
import { SortableElement, SortableContainer } from "react-sortable-hoc"

const Item = SortableElement(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
))

const SortableList = SortableContainer(
  ({ values, array, name, children }: any) => {
    return (
      <>
        {children(values, name, Item, array)}
      </>
    )
  },
)

interface Props {
  name: string
  renderNewPlaceholder: boolean
  renderItem: (
    i: number,
    isLast: boolean,
    array: FieldArrayRenderProps,
    path: string,
  ) => React.ReactNode,
  children: React.ReactNode,
  sortableListProps: any
}

export function SortableArray({
  name,
  renderNewPlaceholder,
  renderItem,
  children,
  sortableListProps
}: Props) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<any>) => {
        return (
          <FieldArray name={name}>
            {(array) => {
              const values = field.value || []
              if (renderNewPlaceholder) {
                return values
                  .map((_: any, i: number) =>
                    renderItem(i, false, array, name + "." + i + "."),
                  )
                  .concat([
                    renderItem(
                      values.length,
                      true,
                      array,
                      name + "." + values.length + ".",
                    ),
                  ])
              } else {
                const onSortEnd = ({ oldIndex, newIndex }: {
                  oldIndex: number
                  newIndex: number
                }) => {
                  array.move(oldIndex, newIndex)
                }

                const props = {
                  values,
                  array,
                  name,
                  onSortEnd,
                  useDragHandle: true,
                  lockAxis: 'y',
                  lockToContainerEdges: true,
                  ...sortableListProps
                };

                return <SortableList {...props}>{children}</SortableList>
              }
            }}
          </FieldArray>
        )
      }}
    </Field>
  )
}
