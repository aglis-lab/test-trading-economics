import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navigation from "./components/navigation";
import { Sidebar, SidebarProvider } from "./components/ui/sidebar";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      </head>
      <body className="bg-slate-50">
        <SidebarProvider>
          <Sidebar className="border-none">
            <Navigation></Navigation>
          </Sidebar>
          <div className="w-full">{children}</div>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
