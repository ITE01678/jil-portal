import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { PresenceProvider } from "../contexts/PresenceContext";

export default function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <PresenceProvider>
      <div className="min-h-screen flex flex-col bg-[#f0f5fb] dark:bg-[#0d1117]">
        <Header
          isPublic={false}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />

        <div className="flex flex-1 pt-16">
          <Sidebar isOpen={sidebarOpen} />

          {/* Main content shifts with sidebar */}
          <main
            className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
            style={{ marginLeft: sidebarOpen ? "256px" : "68px" }}
          >
            <div className="flex-1 p-6 lg:p-8">
              <Outlet />
            </div>
            <Footer compact />
          </main>
        </div>
      </div>
      <Chatbot />
    </PresenceProvider>
  );
}
