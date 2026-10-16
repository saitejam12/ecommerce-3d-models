import type { ReactNode } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Catalogue from "@/screens/Catalogue";
import Product from "@/screens/Product";
import CartCheckout from "@/screens/CartCheckout";
import Account from "@/screens/Account";
import AdminOrders from "@/screens/AdminOrders";
import AdminShopSetup from "@/screens/AdminShopSetup";
import AdminLogin from "@/screens/AdminLogin";
import { adminLogout, useAdminAuth } from "@/lib/api";

const queryClient = new QueryClient();

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

/**
 * Guards every admin route. An unauthenticated visit (no staff token, or one
 * cleared because an admin call came back 403) is redirected to sign-in
 * before the wrapped screen -- and the order/catalogue data it would fetch --
 * ever mounts.
 */
function RequireAdminAuth({ children }: { children: ReactNode }) {
  const isAuthed = useAdminAuth();
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}

/** Sign-out control for the admin nav section; absent until a staff token exists. */
function AdminSignOut() {
  const isAuthed = useAdminAuth();
  const navigate = useRouterNavigate();
  if (!isAuthed) return null;
  return (
    <button
      type="button"
      onClick={() => {
        adminLogout();
        navigate("/admin/login");
      }}
      className="block rounded-[var(--brand-radius)] px-3 py-2 text-left text-sm font-medium text-[var(--brand-fg-muted)] transition-colors hover:bg-[var(--brand-hover)]"
    >
      {"Sign out"}
    </button>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        <aside
          className="w-56 shrink-0 border-r p-4"
          style={{
            backgroundColor: "var(--brand-surface)",
            borderColor: "var(--brand-border)",
          }}
        >
          <p
            className="mb-4 px-3 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"Ecommerce website small 3d models"}
          </p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/catalogue" className={navLinkClass}>
              {"Shop & Category Browse"}
            </NavLink>
            <NavLink to="/product" className={navLinkClass}>
              {"Product Page"}
            </NavLink>
            <NavLink to="/cart-checkout" className={navLinkClass}>
              {"Cart & Checkout"}
            </NavLink>
            <NavLink to="/account" className={navLinkClass}>
              {"My Account"}
            </NavLink>
            <NavLink to="/admin-orders" className={navLinkClass}>
              {"Admin Order Queue"}
            </NavLink>
            <NavLink to="/admin-shop-setup" className={navLinkClass}>
              {"Admin Catalogue & Shop Setup"}
            </NavLink>
            <AdminSignOut />
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart-checkout" element={<CartCheckout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin-orders"
              element={
                <RequireAdminAuth>
                  <AdminOrders />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/admin-shop-setup"
              element={
                <RequireAdminAuth>
                  <AdminShopSetup />
                </RequireAdminAuth>
              }
            />
            <Route path="*" element={<Navigate to="/catalogue" replace />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
}
