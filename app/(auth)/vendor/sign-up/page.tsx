import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Steps from './_components/Steps'
import RenderSteps from './_components/RenderSteps'

const VendorSignUpPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
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
    </div>
  )
}

export default VendorSignUpPage
