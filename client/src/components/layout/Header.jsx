import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBackground() {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useEffect(() => {
    gsap.to(orb1.current, {
      x: 80,
      y: 40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(orb2.current, {
      x: -70,
      y: 60,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(orb3.current, {
      x: 50,
      y: -50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      <div ref={orb1} className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div ref={orb2} className="absolute right-20 top-52 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div ref={orb3} className="absolute bottom-10 left-1/2 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}