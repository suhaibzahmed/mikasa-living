'use client'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpData, userSignUpSchema } from '@/schemas/user.schema'
import { useUserStore } from '@/lib/store/userStore'
import FormInput from '@/components/common/form/FormInput'
import { createUser } from '@/actions/user/actions'
import { useRouter } from 'next/navigation'
import { createSession } from '@/actions/session'

const UserDetails = () => {
  const { phone, firebaseUid, idToken } = useUserStore()
  const router = useRouter()
  const form = useForm<UserSignUpData>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: phone,
    },
  })

  const onSubmit = async (data: UserSignUpData) => {
    try {
      const res = await createUser({ ...data, firebaseUid })
      if (res.success) {
        const sessionRes = await createSession({ idToken, role: 'user' })
        if (sessionRes.success) {
          toast.success('Account created successfully')
          router.refresh()
          router.push('/')
        } else {
          toast.error(sessionRes.message)
        }
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <FormInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
        />
        <FormInput
          control={form.control}
          name="email"
          label="Email (optional)"
          placeholder="john@gmail.com"
        />
        <FormSubmitButton
          title="Create Account"
          isPending={form.formState.isSubmitting}
          pendingText="Creating Account"
        />
      </form>
    </Form>
  )
}

export default UserDetails
