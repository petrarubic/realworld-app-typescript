import RegisterForm from "./forms/RegisterForm"

function RegisterPage() {
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register new account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <RegisterForm />
        </div>
    </div>
)
}
  
export default RegisterPage