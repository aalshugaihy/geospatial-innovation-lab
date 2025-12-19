import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Incubator from "./pages/initiatives/Incubator";
import Accelerator from "./pages/initiatives/Accelerator";
import Hackathons from "./pages/initiatives/Hackathons";
import Bootcamps from "./pages/initiatives/Bootcamps";
import GeoSandbox from "./pages/initiatives/GeoSandbox";
import Events from "./pages/Events";
import SuccessStories from "./pages/SuccessStories";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/initiatives/incubator"} component={Incubator} />
      <Route path={"/initiatives/accelerator"} component={Accelerator} />
      <Route path={"/initiatives/hackathons"} component={Hackathons} />
      <Route path={"/initiatives/bootcamps"} component={Bootcamps} />
      <Route path={"/initiatives/geosandbox"} component={GeoSandbox} />
      <Route path={"/events"} component={Events} />
      <Route path={"/success-stories"} component={SuccessStories} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
