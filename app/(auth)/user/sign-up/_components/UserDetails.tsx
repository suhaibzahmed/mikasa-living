'use client'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpData, userSignUpSchema } from '@/schemas/user.schema'
import FormInput from '@/components/common/form/FormInput'
import { createUser } from '@/actions/user/actions'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { setCustomClaims } from '@/lib/auth'

const UserDetails = () => {
  const router = useRouter()
  const { user } = useAuth()

  const form = useForm<UserSignUpData>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = async (data: UserSignUpData) => {
    try {
      const res = await createUser(data)
      if (res.success) {
        await setCustomClaims(user?.uid, 'USER')
        const newIdToken = await user?.getIdToken(true)
        await fetch('/api/login', {
          headers: {
            Authorization: `Bearer ${newIdToken}`,
          },
        })

        toast.success(res.message)
        router.push('/')
        router.refresh()
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
