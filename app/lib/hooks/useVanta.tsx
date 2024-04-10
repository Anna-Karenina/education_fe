import {
  useState,
  useEffect,
  MutableRefObject,
  useRef,
  useMemo,
  memo,
} from "react";
import * as THREE from "three";
import net from "vanta/dist/vanta.net.min.js";

export const useVanta = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        net({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          backgroundColor: 0xffffff,
          points: 3.0,
          maxDistance: 10.0,
          spacing: 20.0,
          THREE,
        })
      );
    } else {
      vantaEffect?.destroy();
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return vantaRef;
};
