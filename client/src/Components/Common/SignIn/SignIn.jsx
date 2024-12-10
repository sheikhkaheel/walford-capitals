
export default function SignIn() {
    return (
        <div className="flex flex-col items-center justify-evenly border bg-stone-100 border-black h-screen">
            <div className="flex flex-col py-24 px-4 bg-white shadow-lg border shadow-slate-300 rounded-2xl w-[25rem]">
                <div className="flex justify-center px-12">
                    <h3 className="h-[4rem] w-20 border rounded-lg bg-gray-200 flex text-gray-500 font-light justify-center items-center text-[2.5rem]">
                        <span>wc</span>
                    </h3>
                </div>

                <p className="my-10 text-xl px-12 work-sans-regular text-gray-800 text-center">
                    Sign in to see this page in Walford Capitals
                </p>

                <div className="flex flex-col px-12">
                    <a href="http://localhost:3000/auth/google/callback" className="hover:bg-gray-100 border text-center border-gray-300 py-2 rounded-lg inline-bolk">
                            <i className="fa-brands fa-google pr-2"></i>
                            Continue with Google
                    </a>

                    <button className="border hover:bg-gray-100 border-gray-300 my-3 py-2 rounded-lg">
                        <i className="fa-brands fa-apple pr-3 text-lg"></i>
                        Continue with Apple
                    </button>
                </div>
            </div>

        </div>
    )
}