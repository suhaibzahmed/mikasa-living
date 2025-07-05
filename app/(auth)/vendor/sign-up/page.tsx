import RenderSteps from './_components/RenderSteps'
import Steps from './_components/Steps'

const VendorRegisterPage = () => {
  return (
    <div className="flex flex-col gap-y-4 min-h-svh w-full items-center justify-center ">
      <h4>Vendor Registration</h4>
      <Steps />
      <RenderSteps />
    </div>
  )
}

export default VendorRegisterPage
