import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LandingLayout({
  children,
  title,
}: {
  children: Readonly<React.ReactNode>;
  title: string;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
