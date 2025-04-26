import { Link } from "react-router";

export default function BtnLink({
  href,
  text,
  className = "",
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link
      to={href}
      className={`px-6 py-3 rounded-full outline-none relative overflow-hidden border dark:bg-violet-600
                  cursor-pointer transform transition duration-300 ${className}`}
    >
      <span className="relative z-10 text-white">{text}</span>
    </Link>
  );
}
