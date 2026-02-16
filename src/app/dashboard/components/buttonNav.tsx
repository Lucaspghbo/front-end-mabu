/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

interface ButtonNavProps {
  text: string;
  to: string;
  icon?: any;
  param: boolean;
  onClick?: () => void;
}

export function ButtonNav({ text, to, icon, param, onClick }: ButtonNavProps) {
  const baseStyle =
    "flex items-center gap-4 p-3 rounded-xl text-lg transition-colors";
  const activeStyle = "bg-white text-orange-500";
  const inactiveStyle = "text-white hover:bg-zinc-700";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseStyle} ${param ? activeStyle : inactiveStyle}`}
      >
        {icon && icon}
        {text}
      </button>
    );
  }

  return (
    <Link
      href={to}
      className={`${baseStyle} ${param ? activeStyle : inactiveStyle}`}
    >
      {icon && icon}
      {text}
    </Link>
  );
}
