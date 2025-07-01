"use client";

import React, { useState } from "react";
import { Button, Logo, UserDropdown } from "@/components";
import { ThemeToggle } from "@/components";
import { cn } from "@/utils/classes";
import { useAuth } from "@/hooks";
import { AlignJustify, LogOut, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav
      className="border-b border-gray-300 dark:border-zinc-700 px-4 py-2 flex items-center justify-between"
      aria-label="Main navigation"
    >
      <Logo className="invert dark:invert-25" animate={false} />

      <ThemeToggle aria-label="Toggle theme" />

      <Button
        variant="ghost"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="md:hidden p-2 flex flex-col"
        onClick={() => setIsOpen((s) => !s)}
      >
        {!isOpen ? <AlignJustify /> : <X />}
      </Button>

      <div
        className="hidden md:flex items-center justify-center space-x-4"
        role="menu"
        aria-label="User menu"
      >
        <UserDropdown user={user} onLogout={() => logout()} />
      </div>

      <div
        id="mobile-menu"
        aria-label="Mobile menu"
        data-testid="mobile-menu"
        className={cn(
          "absolute flex flex-col top-full z-50 inset-x-0 bg-white dark:bg-zinc-800 md:hidden transition-transform duration-300 p-5 border-t border-gray-300 dark:border-t-zinc-700 shadow-2xl",
          !isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div
          className="flex flex-col p-4 space-y-2 justify-end h-full flex-1"
          role="menu"
          aria-label="Mobile user actions"
        >
          <Button
            onClick={logout}
            variant="outline"
            size="lg"
            aria-label="Logout by mobile menu"
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
