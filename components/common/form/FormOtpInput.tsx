import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

type FormOtpInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label?: string
}

const FormOtpInput = <T extends FieldValues>({
  control,
  name,
  label,
}: FormOtpInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="rounded-md border" />
                <InputOTPSlot index={1} className="rounded-md border" />
                <InputOTPSlot index={2} className="rounded-md border" />
                <InputOTPSlot index={3} className="rounded-md border" />
                <InputOTPSlot index={4} className="rounded-md border" />
                <InputOTPSlot index={5} className="rounded-md border" />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormOtpInput
