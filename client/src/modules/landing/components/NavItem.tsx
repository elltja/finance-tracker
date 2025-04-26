import { Link } from "react-router";

export default function NavItem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <li>
      <Link
        to={href}
        className="duration-300 font-medium ease-linear hover:text-primary py-3"
      >
        {text}
      </Link>
    </li>
  );
}
