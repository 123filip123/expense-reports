import { CircleDollarSign, ChartColumnDecreasing } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button, buttonVariants } from "./button";
import Image from "next/image";
import Link from "next/link";
import { cx } from "@/libs/utils";
import { logout } from "@/app/api/auth/auth.api";

// Menu items.
const items = [
  {
    title: "Expenses",
    url: "/expenses",
    icon: CircleDollarSign,
  },
  {
    title: "Charts",
    url: "/charts",
    icon: ChartColumnDecreasing,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-center">
            <Image
              src="/alien-logo.png"
              alt="Alien Logo"
              width="100"
              height="100"
            />
          </div>
          <Link
            href="/expenses/add"
            className={cx(buttonVariants({ variant: "default" }), "my-4")}
          >
            Add expense
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center">
          <form action={logout}>
            <Button variant="destructive">Logout</Button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
