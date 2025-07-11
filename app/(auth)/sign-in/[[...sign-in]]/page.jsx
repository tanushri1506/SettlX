import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#2563EB",  
            colorBackground: "#ffffff",
            borderRadius: "0.75rem",  
            fontSize: "14px",
          },
          elements: {
            card: "shadow-lg w-[400px] p-6 rounded-xl", 
            headerTitle: "text-blue-600 font-bold text-xl",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded",
          },
        }}
      />
    </div>
  );
}
