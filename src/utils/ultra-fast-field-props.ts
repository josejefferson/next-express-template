import { FieldInputProps } from 'formik'

/**
 * Melhora o desempenho das Inputs de texto do Formik
 *
 * @example
 * <input
 *   // Ao invés disto
 *   {...field}
 *   // Use isto
 *   {...fp(field)}
 * />
 */
export default function fp(field: FieldInputProps<any>) {
  return {
    ...field,
    onChange: () => {},
    value: undefined,
    defaultValue: field.value,
    onBlur: (e: any) => {
      if (e.target.value === field.value) return
      field.onChange(e)
    }
  }
}
