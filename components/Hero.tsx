"use client"

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
       </div>
    </>
  );
}