import { verifySession } from "@/lib/dal";
import Image from "next/image";
import HeroImg from "../../public/hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await verifySession();

  return (
    <div className="flex flex-col-reverse items-center justify-center gap-4 px-4 md:flex-row overflow-hidden mx-2 max-w-[1400px] md:mx-auto h-screen">
      <div>
        <h1 className="text-center text-5xl mx-4 font-bold text-foreground md:text-6xl lg:text-7xl">
          Boost Your Sales With Our CRM
        </h1>
        <p className="mt-4 text-center text-md md:text-lg lg:text-xl mx-2 md:mx-4 lg:mx-20 ">
          Our CRM is designed to help you manage your sales pipeline, track
          leads, and close deals faster than ever before.
        </p>
        <p className="mt-4 text-center text-xl mx-20">
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="ml-4"
            >
              Login
            </Button>
          </Link>
        </p>
      </div>
      <div className="aspect-square h-[22rem] md:h-[28rem] lg:h-[42rem] relative ">
        <Image
          src={HeroImg}
          fill
          alt="hero image"
        />
      </div>
    </div>
  );
}
