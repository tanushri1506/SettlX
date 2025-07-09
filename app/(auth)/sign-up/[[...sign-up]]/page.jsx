import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <SignUp
            appearance={{
              variables: {
                colorPrimary: "#2563EB",   // Tailwind blue-600
                colorBackground: "#ffffff",
                borderRadius: "0.75rem",   // rounded-xl
                fontSize: "14px",
              },
              elements: {
                card: "shadow-lg w-[400px] p-6 rounded-xl",  // custom width, padding, shadow
                headerTitle: "text-blue-600 font-bold text-xl",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded",
              },
            }}
          />
  )
}

export default SignUpPage
