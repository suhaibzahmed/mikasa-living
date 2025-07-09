import AdminSignInForm from './_components/SignInForm'

const AdminSignInPage = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h4>Admin Sign-in</h4>
      <div className="w-full max-w-sm">
        <AdminSignInForm />
      </div>
    </div>
  )
}

export default AdminSignInPage
