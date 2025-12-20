import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Apply from "./pages/Apply";
import ScheduleSession from "./pages/ScheduleSession";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Search from "./pages/Search";
import Profile from "@/pages/Profile";
import Leaderboard from "@/pages/Leaderboard";
import UserManagement from "./pages/UserManagement";
import Resources from "./pages/Resources";
import Projects from "./pages/Projects";
import ResourceAnalytics from "./pages/ResourceAnalytics";
import UploadResource from "./pages/UploadResource";
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
import ChatWidget from "@/components/ChatWidget";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/apply"} component={Apply} />
      <Route path={"/schedule-session"} component={ScheduleSession} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/user-management"} component={UserManagement} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/resource-analytics"} component={ResourceAnalytics} />
       <Route path="/upload-resource" component={UploadResource} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path={"/projects"} component={Projects} />
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

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Router />
          <ChatWidget />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
