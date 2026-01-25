import LoginForm from "@/components/AuthForm/LoginForm";
import AuthSplitLayout from "@/components/layout/AuthSplitLayout";
import Image from "next/image";

const heroImage = "/signUp.svg";
const logoSrc = "/axign_logo.png";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      heroImage={heroImage}
      title="Create your CCG account"
      subtitle="Join groups, events, volunteer, and grow in community."
      // headerActions={headerActions}
      header={
        <Image src={logoSrc} alt="CCG logo" width={120} height={60} priority />
      }
      form={<LoginForm />}
    />
  );
}
