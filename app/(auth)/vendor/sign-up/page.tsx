import RenderSteps from './_components/RenderSteps'
import Steps from './_components/Steps'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const VendorRegisterPage = () => {
  return (
    <Card className="w-full max-w-3xl my-10">
      <CardHeader>
        <CardTitle>
          <h4>Vendor Registration</h4>
        </CardTitle>
        <CardDescription>
          Follow the steps below to create your vendor account.
        </CardDescription>
        <div className="pt-6">
          <Steps />
        </div>
      </CardHeader>
      <CardContent>
        <RenderSteps />
      </CardContent>
    </Card>
  )
}

export default VendorRegisterPage
