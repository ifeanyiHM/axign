import React from "react";

interface AvatarProps {
  avatar?: string;
  name?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, name, className = "" }) => {
  return avatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatar}
      alt="Profile"
      className={`rounded-full object-cover border border-slate-600 ${className}`}
    />
  ) : (
    <div
      className={`rounded-full bg-slate-600 text-white flex items-center justify-center text-xs font-semibold shrink-0 ${className}`}
    >
      {name?.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;
