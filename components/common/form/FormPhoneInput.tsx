import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type FormPhoneInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label?: string
  countryCode: string
  setCountryCode: (value: string) => void
}

const FormPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  countryCode,
  setCountryCode,
}: FormPhoneInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem>
          {label && (
            <FormLabel
              className={cn(formState.errors[name] && 'text-destructive')}
            >
              {label}
            </FormLabel>
          )}
          <div className="flex items-start gap-x-2 ">
            <Select onValueChange={setCountryCode} defaultValue={countryCode}>
              <SelectTrigger>
                <SelectValue placeholder="+91" defaultValue="+91" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+91">+91 (IN)</SelectItem>
                <SelectItem value="+1">+1 (US)</SelectItem>
                <SelectItem value="+44">+44 (UK)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1">
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}

export default FormPhoneInput
