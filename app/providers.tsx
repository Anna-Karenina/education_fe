"use client";

import {
  ChakraProvider,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";

const customIconWhiteButton = defineStyle({
  background: "transparent",
  color: "black",
  fontFamily: "serif",
  fontWeight: "normal",
});

export const buttonTheme = defineStyleConfig({
  variants: { customIconWhiteButton },
});

const theme = extendTheme({
  components: { Button: buttonTheme },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    tensesCardH1: {
      fontSize: ["14px", "18px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    tensesCardH2: {
      fontSize: ["12px", "16px"],
      fontWeight: "normal",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
