import Index from "./index";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Index />
    </Suspense>
  );
}
