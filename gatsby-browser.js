import "./src/styles/global.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";

export const onInitialClientRender = () => {
  Prism.highlightAll();
};
