"use client"

import Link from "next/link";
import { anton , unbounded } from "@/lib/font"
// import { useHeroAnimaion } from "@/hooks/useHeroAnimaion"

export default function Hero() {
  // const textRef = useHeroAnimation();
  return (
    <>
       <div className="absolute insert-0 flex flex-col items-center pt-40 md:pt-40 text-white">
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <h1 className={`${anton.className} text-6xl md:text-8xl leading-tight`} >
              PRIYANSHU KUMAR
            </h1>

            <h3 className={`${unbounded.className} text-xl md:text-4xl leading-tight`}>
              Full Stack Developer
            </h3>
          </div>
          <div className={`${unbounded.className} text-l md:text-2xl flex text-center max-w-[500px] pt-30 md:pt-40 px-1 md:px-0`}>
            {/* <p ref={textRef}>
                CRafting Seamless experiences,
                <br /> one line at a time.
            </p> */}
            <p >
              Crafting Seamless experiences,
              <br /> one line at a time.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 px-4">
            <Link
              href="/about"
              className="rounded-md border border-white/35 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="rounded-md border border-white/35 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className="rounded-md border border-white/35 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition-colors"
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/35 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition-colors"
            >
              Contact
            </Link>
          </div>
       </div>
    </>
  );
}