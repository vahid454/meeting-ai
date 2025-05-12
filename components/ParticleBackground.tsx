"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine"; // Ensure consistent import
import { loadSlim } from "tsparticles-slim"; // Import loadSlim from the correct package

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Instead of loadAll, you can use loadSlim or another loading function.
    await loadSlim(engine); // This loads a slim version, you can use loadFull for full features
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#0d1117" },
        particles: {
          number: { value: 50 },
          color: { value: "#00f6ff" },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          links: {
            enable: true,
            color: "#00f6ff",
            distance: 150,
            opacity: 0.5,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
