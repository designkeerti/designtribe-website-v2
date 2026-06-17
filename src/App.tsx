import { Home } from "./components/Home";
import { ServicePage } from "./components/ServicePage";

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith("/services/")) {
    return <ServicePage slug={path.replace("/services/", "")} />;
  }

  return <Home />;
}
