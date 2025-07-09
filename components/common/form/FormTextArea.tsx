import { Control, FieldPath, FieldValues } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

type FormTextAreaProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  placeholder?: string
  label?: string
  className?: string
}

const FormTextArea = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  className,
}: FormTextAreaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
