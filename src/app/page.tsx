import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustGrid } from "@/components/sections/TrustGrid";
import { WhyStandOut } from "@/components/sections/WhyStandOut";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustGrid />
        <WhyStandOut />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
      <FinalCta />
    </>
  );
}
