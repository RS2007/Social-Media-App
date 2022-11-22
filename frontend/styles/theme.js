import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./ButtonStyles";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { InputStyles as Input } from "./InputStyles";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  colors: {
    active: "#0095f6",
    inactive: "#b2dffc",
    facebook: "#385185",
    background: "#fafafa",
    forgot: "#00376b",
    formFontColor: "#969696",
  },
  components: {
    Button,
    Input,
    Steps,
  },
  breakpoints: createBreakpoints({
    xxs: "0px",
    xs: "300px",
    sm: "352px",
    smLogin: "452px",
    md: "875px",
  }),
});

export default theme;
