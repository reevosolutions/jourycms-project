import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/customized.sidebar";
import React from "react";
import PageTitle from "../ui/page-header";
import Footer from "./footer";
import AdminSidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const PageLyout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="upcms-page-layout font-noto">
      <SidebarProvider>
        <div className="flex-grow">
          <main className="px-4">
            {title && <PageTitle title={title} />}
            <div className="d">{children}</div>
          </main>
          <Footer />
        </div>
        {/* <SidebarTrigger /> */}
        <AdminSidebar />
      </SidebarProvider>
    </div>
  );
};

export default PageLyout;
