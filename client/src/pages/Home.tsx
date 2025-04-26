import LandingLayout from "@/modules/landing/components/LandingLayout";
import Hero from "@/modules/landing/components/sections/Hero";

export default function Home() {
  return (
    <LandingLayout title="Finance Tracker">
      <Hero />
    </LandingLayout>
  );
}
