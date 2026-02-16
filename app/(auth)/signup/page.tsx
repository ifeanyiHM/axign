import SignupForm from "@/components/AuthForm/SignupForm";
import AuthSplitLayout from "@/components/layout/AuthSplitLayout";
import Image from "next/image";

const heroImage = "/signup.jpg";
const logoSrc = "/new_axign_logo.png";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      heroImage={heroImage}
      title="Register Account Form"
      subtitle="Please fill in this form to create an account!"
      header={
        <Image src={logoSrc} alt="CCG logo" width={120} height={60} priority />
      }
      form={<SignupForm />}
    />
  );
}
