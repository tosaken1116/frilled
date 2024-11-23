import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Footer } from "../components/ui/Footer";
import { Header } from "../components/ui/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className=" min-w-full h-screen flex flex-col">
      <Header />
      <main className="w-full h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
