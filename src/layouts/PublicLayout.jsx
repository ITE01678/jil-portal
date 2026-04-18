import { Outlet } from "react-router-dom";
import Header         from "../components/Header";
import Footer         from "../components/Footer";
import FloatingSidebar from "../components/FloatingSidebar";
import Chatbot        from "../components/Chatbot";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5fb] dark:bg-[#0d1117]">
      <Header isPublic />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <FloatingSidebar />
      <Chatbot />
    </div>
  );
}
