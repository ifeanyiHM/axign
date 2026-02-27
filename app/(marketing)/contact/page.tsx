"use client";
import { InfoRow } from "@/components/dashboard/taskId/InfoRow";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import InputField from "@/components/primitives/form/InputField";
import TextareaField from "@/components/primitives/form/TextareaField";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { theme } from "@/utils/constants";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface RequestType {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const request = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const styles = {
  input:
    "w-full text-xs rounded-none border border-gray-400 placeholder-[#333333] p-3 xl:p-2.5 mb-8 xl:mb-6",
};

function ContactPage() {
  const { sendContactMessage, contactLoading } = useUser();

  const [details, setDetails] = useState<RequestType>(request);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactLoading) return;

    setStatus(null);

    try {
      const res = await sendContactMessage({
        fullName: details.name,
        email: details.email,
        company: details.company,
        subject: details.subject,
        message: details.message,
      });

      setStatus({
        type: "success",
        msg: res.message,
      });

      setDetails(request); // reset form
    } catch (err) {
      setStatus({
        type: "error",
        msg: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative mt-18 md:mt-32 pb-10 lg:pb-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10 px-4 sm:px-6 lg:px-8 xl:px-0 xl:w-[75%] mx-auto mt-10 md:mt-16">
          <div className="lg:mt-8 w-full lg:w-[40%] xl:w-1/2 text-[#333333]">
            <div className="">
              <div className="xl:max-w-[85%] flex items-center justify-between lg:block">
                <h1 className="hidden lg:block text-4xl font-bold">
                  {" "}
                  Let’s help you move faster.
                </h1>
                <h1 className="lg:hidden text-4xl font-bold"> Contact Us.</h1>

                <ul className="flex items-center gap-3 lg:hidden my-5">
                  <li>
                    <Link
                      href="https://www.instagram.com/raceeduservices1?igsh=dDZ2bTZ1anU2M2Z1"
                      target="_blank"
                      className="flex items-center gap-3"
                    >
                      <span className="text-[] font-bold text-xl">
                        <Instagram />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/share/WNBrWDJXg8Hso873/"
                      target="_blank"
                      className="flex items-center gap-3"
                    >
                      <span className="text-[] font-bold text-xl">
                        <Facebook />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://x.com/Raceduservices?t=UvnxM6yluN7mFkOhbUzUng&s=09"
                      target="_blank"
                      className="flex items-center gap-3"
                    >
                      <span className="text-[] font-bold text-xl">
                        <Twitter />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="xl:max-w-[75%] my-8">
                Reach out for product questions, onboarding, partnerships, or
                support. We usually respond within 24 hours on business days.
              </p>
              <div className="hidden xl:max-w-[85%] mt-5 space-y-4 text-sm text-gray-700 lg:grid grid-cols-2">
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value="+234 814 566 3725"
                  href="tel:+2348145663725"
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value="info@axiign@gmail.com"
                  href="mailto:info@axiign@gmail.com"
                />
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value="Nigeria (Remote-first)"
                />{" "}
                <InfoRow
                  icon={Clock}
                  label="Support hours (WAT)"
                  value="Mon–Fri, 9:00am–6:00pm "
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] xl:w-1/2 text-[#333333]">
            <form
              onSubmit={handleSubmit}
              className="lg:max-w-lg mx-auto lg:p-10 bg-white lg:shadow-[0_4px_10px_rgba(0,0,0,0.3),0_10px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="hidden lg:block space-y-1 mb-8">
                <h2 className="font-semibold text-lg">Send a message</h2>
                <p className="text-sm">
                  Fill the form and we’ll get back to you.
                </p>
              </div>
              <InputField
                type="text"
                name="name"
                value={details.name}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Your Name"
              />
              <InputField
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Your Email"
              />
              <InputField
                type="text"
                name="company"
                value={details.company}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Company Name (optional)"
              />

              <InputField
                type="text"
                name="subject"
                value={details.subject}
                onChange={handleChange}
                className={styles.input}
                placeholder="Subject"
              />
              <TextareaField
                name="message"
                value={details.message}
                onChange={handleChange}
                className={`${styles.input} h-36`}
                placeholder="Your Message"
                required
              />

              <Button
                type="submit"
                className="rounded-none px-10 py-2 lg:p-2 lg:w-full"
                style={{ backgroundColor: theme.darkCard }}
              >
                Submit
              </Button>

              {status && (
                <Alert
                  variant={status.type === "success" ? "success" : "danger"}
                  title={status.type === "success" ? "Success" : "Failed"}
                  description={status.msg}
                  dismissible={false}
                />
              )}
            </form>
          </div>
        </div>
        <div
          className={`hidden h-32 absolute w-full -bottom-px z-[-1] lg:block`}
          style={{ backgroundColor: theme.darkCard }}
        ></div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
