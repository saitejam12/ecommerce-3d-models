import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import Catalogue from "@/screens/Catalogue";
import Product from "@/screens/Product";
import CartCheckout from "@/screens/CartCheckout";
import Account from "@/screens/Account";
import AdminOrders from "@/screens/AdminOrders";
import AdminShopSetup from "@/screens/AdminShopSetup";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

export default function App() {
  return (
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
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart-checkout" element={<CartCheckout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
          <Route path="/admin-shop-setup" element={<AdminShopSetup />} />
          <Route path="*" element={<Navigate to="/catalogue" replace />} />
        </Routes>
      </main>
    </div>
  );
}
