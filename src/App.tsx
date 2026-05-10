import { Preview } from "./Preview";
import { siteConfig } from "./config";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Preview config={siteConfig} />
      <Toaster />
    </>
  );
}
