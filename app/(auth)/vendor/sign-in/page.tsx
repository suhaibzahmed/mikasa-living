import SignInForm from './_components/SignInForm'

const VendorSignInPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>Vendor Sign In</h4>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}

export default VendorSignInPage
