import { Server, Wifi, Phone, PanelLeft } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Máquinas", url: "/", icon: Server },
  { title: "Roteadores", url: "/routers", icon: Wifi },
  { title: "Ramais", url: "/extensions", icon: Phone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border/50 bg-card">
      <SidebarHeader className="border-b border-border/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
            <Server className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">
                <span className="text-foreground">Iventário</span>
                <span className="text-primary">HSR</span>
              </h1>
              <p className="text-xs text-muted-foreground">Sistema de Monitoramento</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ativos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 hover:bg-muted/50 transition-colors"
                        activeClassName="bg-primary/10 text-primary border-l-2 border-primary"
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
