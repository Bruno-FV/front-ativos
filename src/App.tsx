import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import MachinesPage from "./pages/MachinesPage";
import RoutersPage from "./pages/RoutersPage";
import ExtensionsPage from "./pages/ExtensionsPage";
import ExtensionsPublic from "./pages/ExtensionsPublic";
import NotFound from "./pages/NotFound";
import path from 'path';
import LicenseAntiVirus from "./pages/LicenseAntiVirus";
import LicenseMachinesPage from "./pages/LicenseMachinesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MachinesPage />} />
            <Route path="/routers" element={<RoutersPage />} />
            <Route path="/extensions" element={<ExtensionsPage />} />
            <Route path="/extensionsPublic" element={<ExtensionsPublic />} />
            <Route path="/license" element={<LicenseAntiVirus />} />
            <Route path="/license/:id/machines" element={<LicenseMachinesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
