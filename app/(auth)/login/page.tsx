import LoginForm from "@/components/AuthForm/LoginForm";
import AuthSplitLayout from "@/components/layout/AuthSplitLayout";
import Image from "next/image";

const heroImage = "/loginn.jpg";
const logoSrc = "/axign_logoo.png";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      heroImage={heroImage}
      title="Login to Your Account"
      subtitle="Enter your login details."
      header={
        <Image src={logoSrc} alt="CCG logo" width={120} height={60} priority />
      }
      form={<LoginForm />}
    />
  );
}
