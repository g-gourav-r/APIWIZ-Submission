import { ThemeProvider } from "@/components/theme-provider"
import {ModeToggle} from "@/components/mode-toggle"
import { ReactNode } from "react";

function App({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      {children}
    </ThemeProvider>
  )
}

export default App
