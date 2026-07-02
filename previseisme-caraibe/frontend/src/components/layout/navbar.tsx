"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, Bell, LayoutDashboard, User, LogOut, ChevronDown } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/components/providers/auth-provider";
import { demoNotifications } from "@/lib/demo-data/notifications";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const unread = demoNotifications.filter((n) => !n.read).length;

  const mainLinks = [
    { href: "/carte-mondiale", label: t("worldMap") },
    { href: "/carte-caraibes", label: t("caribbeanMap") },
    { href: "/recherche", label: t("search") },
    { href: "/historique", label: t("history") },
  ];

  const solutionLinks = [
    { href: "/entreprises", label: t("businesses") },
    { href: "/collectivites", label: t("communities") },
    { href: "/api", label: t("api") },
  ];

  const infoLinks = [
    { href: "/a-propos", label: t("about") },
    { href: "/aide", label: t("help") },
    { href: "/contact", label: t("contact") },
  ];

  const initials = user?.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="border-border/70 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href && "bg-muted text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground gap-1 px-3 text-sm font-medium"
              >
                {t("solutions")}
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {solutionLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <Link
              href="/tableau-de-bord"
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/tableau-de-bord" && "bg-muted text-foreground",
              )}
            >
              {t("dashboard")}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {user ? (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/notifications" aria-label={t("notifications")}>
                  <Bell className="size-4" />
                  {unread > 0 && (
                    <span className="bg-primary absolute top-1.5 right-1.5 flex size-2 rounded-full" />
                  )}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-muted-foreground truncate text-xs">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/tableau-de-bord">
                      <LayoutDashboard className="size-4" /> {t("dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profil">
                      <User className="size-4" /> {t("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="size-4" /> {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/connexion">{t("login")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/inscription">{t("signup")}</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("menu")}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                {[
                  ...mainLinks,
                  ...(user ? [{ href: "/tableau-de-bord", label: t("dashboard") }] : []),
                  ...solutionLinks,
                  ...infoLinks,
                ].map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:bg-muted rounded-md px-3 py-2.5 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="border-border mt-auto flex flex-col gap-2 border-t pt-4">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                {!user && (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                        <Link href="/connexion">{t("login")}</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link href="/inscription">{t("signup")}</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
