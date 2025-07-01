"use client";

import React, { useRef, useState } from "react";

import { Button, Label } from "@/components";
import { LogOut, User } from "lucide-react";

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";

import { cn } from "@/utils/classes";
import { UserProfile } from "@/types/modules/auth";

export type UserDropdownProps = {
  user: UserProfile | null;
  onLogout: () => void;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNav]
  );

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 200, close: 150 },
    initial: { opacity: 0, transform: "scale(0.95)" },
    open: { opacity: 1, transform: "scale(1)" },
    close: { opacity: 0, transform: "scale(0.95)" },
  });

  const handleItemKey = (e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === "Enter" || e.key === "Backspace") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <div className="relative">
      <Button
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        aria-label="User menu"
        ref={refs.setReference}
        variant="outline"
        size="md"
        {...getReferenceProps()}
      >
        <Label className="m-0 cursor-pointer flex flex-row items-center justify-between gap-2">
          <User size={15} />
          {user?.email}
        </Label>
      </Button>
      {open && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles}>
            <FloatingFocusManager context={context}>
              <div
                aria-label="menu-items"
                aria-labelledby="user-menu"
                aria-activedescendant={
                  activeIndex !== null ? `menu-item-${activeIndex}` : undefined
                }
                role="menu"
                className={cn(
                  "z-50 p-1 border bg-gray-100 border-gray-300 dark:bg-zinc-800 text-gray-600 dark:text-zinc-200 dark:border-zinc-700 mt-[2px] rounded-sm"
                )}
                {...getFloatingProps()}
                style={{ ...transitionStyles }}
              >
                <div
                  aria-label="Logout"
                  aria-disabled="false"
                  role="menuitem"
                  ref={(node) => {
                    listRef.current[0] = node || null;
                  }}
                  tabIndex={activeIndex === 0 ? 0 : -1}
                  {...getItemProps()}
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  onKeyDown={(e) =>
                    handleItemKey(e, () => {
                      onLogout();
                      setOpen(false);
                    })
                  }
                  className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-sm px-2 py-1 focus-visible-ring flex flex-row gap-2 items-center justify-start"
                >
                  <LogOut size={12} />
                  Logout
                </div>
              </div>
            </FloatingFocusManager>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
};

export default UserDropdown;
