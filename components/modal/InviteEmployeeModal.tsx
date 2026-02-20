"use client";

import { useState } from "react";
import { X, Mail, User, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import InputField from "../primitives/form/InputField";
import { Button } from "../ui/button";
import { Alert } from "../ui/alert";

interface InviteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteEmployeeModal({
  isOpen,
  onClose,
}: InviteEmployeeModalProps) {
  const { inviteEmployee } = useUser();
  const [formData, setFormData] = useState({
    inviteeName: "",
    inviteeEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await inviteEmployee(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Invitation sent successfully!",
        });
        // Clear form after 2 seconds and close modal
        setTimeout(() => {
          setFormData({ inviteeName: "", inviteeEmail: "" });
          setMessage(null);
          onClose();
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to send invitation",
        });
      }
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ inviteeName: "", inviteeEmail: "" });
      setMessage(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 pr-8">
            Invite Employee
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Send an invitation to join your organization
          </p>
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Input */}
          <div className="relative">
            <User
              className="absolute left-3 top-2/3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <InputField
              type="text"
              label="Employee Name"
              id="inviteeName"
              name="inviteeName"
              value={formData.inviteeName}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Emeka Okafor"
              className="pl-10"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-2/3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <InputField
              type="email"
              label="Email Address"
              id="inviteeEmail"
              name="inviteeEmail"
              value={formData.inviteeEmail}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="john@company.com"
              className="pl-10"
            />
          </div>

          {/* Message Display */}
          {message && (
            <Alert
              variant={message.type !== "success" ? "danger" : "success"}
              title={message.type !== "success" ? "Failed" : "Success"}
              description={message.text}
              dismissible={false}
            />
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant={"secondary"}
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
