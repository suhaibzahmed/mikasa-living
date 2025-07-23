'use client'

import { vendorDetailsSchema, VendorDetailsData } from '@/schemas/vendor.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import FormInput from '@/components/common/form/FormInput'
import FormSubmitButton from '@/components/common/form/FormSubmitButton'
import { useVendorStore } from '@/lib/store/vendorStore'
import { useEffect, useState } from 'react'
import { Service } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { getAllServices } from '@/actions/user/actions'

const VendorDetails = () => {
  const { vendorData, setVendorData, nextStep } = useVendorStore()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    async function fetchServices() {
      const allServices = await getAllServices()
      setServices(allServices)
    }
    fetchServices()
  }, [])

  const form = useForm<VendorDetailsData>({
    resolver: zodResolver(vendorDetailsSchema),
    defaultValues: {
      email: vendorData.email || '',
      companyName: vendorData.companyName || '',
      gstNumber: vendorData.gstNumber || '',
      services: vendorData.services || [],
    },
  })

  function onSubmit(data: VendorDetailsData) {
    setVendorData(data)
    nextStep()
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormInput
            control={form.control}
            name="companyName"
            label="Company Name"
            placeholder="Company Name"
            type="text"
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
          />
          <FormInput
            control={form.control}
            name="gstNumber"
            label="GST Number"
            placeholder="GST Number"
            type="text"
          />
          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Services</FormLabel>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {services.map((service) => (
                    <FormField
                      key={service.id}
                      control={form.control}
                      name="services"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={service.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        service.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {service.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <FormSubmitButton
              isPending={form.formState.isSubmitting}
              title="Next Step"
              pendingText="Proceeding to Select Plan"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
export default VendorDetails
