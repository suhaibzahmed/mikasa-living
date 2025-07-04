import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { VendorRegistrationProvider } from '@/lib/VendorRegistrationContext'
import VendorRegistrationStepper from './_components/VendorRegistrationStepper'

const VendorRegisterPage = () => {
  return (
    <VendorRegistrationProvider>
      <div className="flex flex-col gap-y-4 min-h-svh w-full items-center justify-center ">
        <h4>Vendor Registration</h4>

        <Card className="min-w-md">
          <CardHeader>
            <CardTitle>Join Our Marketplace</CardTitle>
            <CardDescription>
              Please enter your details to join our marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VendorRegistrationStepper />
          </CardContent>
        </Card>
      </div>
    </VendorRegistrationProvider>
  )
}

export default VendorRegisterPage
