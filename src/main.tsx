import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart";
import { Shell } from "./components";
import { AboutPage, HomePage } from "./pages-home";
import { CheckoutPage, LookbookPage, NotFoundPage, ProductPage, ShopPage } from "./pages";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loja" element={<ShopPage />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Shell>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
