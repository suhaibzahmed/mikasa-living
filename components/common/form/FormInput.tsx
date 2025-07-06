import { Control, FieldPath, FieldValues } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  type?: string
  placeholder?: string
  label?: string
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  type = 'text',
  placeholder,
  label,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              onChange={(e) => {
                if (type === 'number') {
                  field.onChange(
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                } else {
                  field.onChange(e.target.value)
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
