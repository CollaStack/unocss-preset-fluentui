import "virtual:uno.css";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const root = createRoot(document.getElementById("root")!);
root.render(
  <FluentProvider theme={webLightTheme}>
    <div
      style={{ borderStyle: "solid", width: "200px", height: "100px" }}
      className="bg-neutral-background1 text-neutral-foreground1 font-monospace text-base600 border-thin border-brand-background p-m"
    >
      Hello, world!
    </div>
  </FluentProvider>,
);
