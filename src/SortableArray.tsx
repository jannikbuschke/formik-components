import * as React from "react"
import { Field, FieldProps, FieldArray, FieldArrayRenderProps } from "formik"
import { SortableElement, SortableContainer } from "react-sortable-hoc"

const Item = SortableElement(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
))

const SortableList = SortableContainer(
  ({ renderItem, value, array, name }: any) => {
    return (
      <div>
        {value.map((_: any, i: number) => (
          <Item key={i} index={i}>
            {renderItem(i, false, array, name + "." + i + ".")}
          </Item>
        ))}
      </div>
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
  ) => React.ReactNode
}

export function SortableArray({
  name,
  renderNewPlaceholder,
  renderItem,
}: Props) {
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
                return (
                  <SortableList
                    renderItem={renderItem}
                    value={value}
                    array={array}
                    name={name}
                    onSortEnd={({
                      oldIndex,
                      newIndex,
                    }: {
                      oldIndex: number
                      newIndex: number
                    }) => {
                      array.move(oldIndex, newIndex)
                    }}
                    useDragHandle={true}
                    lockAxis={"y"}
                    lockToContainerEdges={true}
                  />
                )
              }
            }}
          </FieldArray>
        )
      }}
    </Field>
  )
}
