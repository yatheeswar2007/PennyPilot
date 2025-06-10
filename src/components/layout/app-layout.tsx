
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Removed AvatarImage
import { navItems } from "@/config/site";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); 
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/'); 
  };

  const publicPages = ['/', '/login', '/signup'];
  const isPublicPage = publicPages.includes(pathname);

  if (isPublicPage) {
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center justify-center group-data-[collapsible=icon]:justify-center">
              <span className="text-xl font-bold text-primary group-data-[collapsible=icon]:hidden">PennyPilot</span>
              <span className="text-xl font-bold text-primary hidden group-data-[collapsible=icon]:inline">PP</span>
            </Link>
          </SidebarHeader>
          <Separator className="my-0 group-data-[collapsible=icon]:mx-2" />
          <SidebarContent className="p-2 pt-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      className="justify-start"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <Separator className="my-0 group-data-[collapsible=icon]:mx-2" />
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-10 w-10 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
                {/* Removed AvatarImage as no logo is available */}
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">Penny Pilot</span>
                <span className="text-xs text-muted-foreground">user@pennypilot.com</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="md:hidden" /> {/* Mobile toggle */}
            <div className="flex items-center gap-4">
              {/* Can add breadcrumbs or page title here */}
            </div>
            <div>
              {/* Header actions like notifications, theme toggle, etc. */}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

    