"use client";

import menuLinks from "@/data/navigation/links.json";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

export function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <nav ref={containerRef} className="sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>🍞</button>
      <ul
        className={`
          fixed inset-0 top-20
          flex flex-col items-center justify-center gap-4 p-4
          ${isOpen ? "" : "translate-x-full"}
          backdrop-blur-md backdrop-brightness-50 transition-transform
        `}
      >
        {menuLinks.map((item) => (
          <li key={"navbar-desktop-" + item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
