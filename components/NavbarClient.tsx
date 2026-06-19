"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavbarClient({ user }: { user: User | null }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSignout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* Desktop view */}
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden md:block"
        >
          Dashboard
        </Link>
        <button
          onClick={handleSignout}
          className="text-white bg-black/80 hover:text-black border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors hidden md:flex items-center gap-2"
        >
          <LogOut size={16} />
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-6 md:hidden bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-50">
            <Link
              href="/"
              onClick={handleNavClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/saved"
              onClick={handleNavClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Saved
            </Link>
            <Link
              href="/listings/new"
              onClick={handleNavClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              List Property
            </Link>
            <Link
              href="/dashboard"
              onClick={handleNavClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Dashboard
            </Link>
            <hr className="my-2" />
            <button
              onClick={() => {
                handleSignout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Desktop view */}
      <Link
        href="/login"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors hidden md:block"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="text-sm font-medium bg-black/80 text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-colors hidden md:block"
      >
        Sign up
      </Link>

      {/* Mobile view - Sign in button only */}
      <Link
        href="/login"
        className="text-sm bg-black/90 font-medium text-gray-700 hover:text-gray-900 transition-colors md:hidden"
      >
        Sign in
      </Link>
    </div>
  );
}
