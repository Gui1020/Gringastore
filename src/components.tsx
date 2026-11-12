import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  categories,
  categoryLabel,
  formatPrice,
  FREE_SHIPPING,
  getProduct,
  products,
  type Product,
} from "./data";
import { useCart } from "./cart";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title === "Início" ? "Grigastore — Alfaiataria contemporânea" : `${title} · Grigastore`;
  }, [title]);
}

function Icon({ name }: { name: "search" | "bag" | "close" | "menu" | "arrow" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "search") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16.5 20 20.5" />
      </svg>
    );
  }
  if (name === "bag") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6.5 8.5h11l-.8 11h-9.4l-.8-11Z" />
        <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
      </svg>
    );
  }
  if (name === "close") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }
  if (name === "menu") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 7.5h16M4 12h16M4 16.5h10" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const { toast } = useCart();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Announcement />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileNav />
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Announcement() {
  return (
    <div className="announce">
      <p>Frete grátis acima de {formatPrice(FREE_SHIPPING)} · Troca em 30 dias · Envio em até 2 dias úteis</p>
    </div>
  );
}

function Header() {
  const { count, openDrawer, openSearch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-inner">
        <button className="icon-btn menu-btn" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" />
        </button>
        <nav className="desk-nav" aria-label="Principal">
          <NavLink to="/loja">Loja</NavLink>
          <div className="nav-drop">
            <span>Categorias</span>
            <div className="nav-panel">
              {categories.map((category) => (
                <Link key={category.id} to={`/loja?categoria=${category.id}`}>
                  <strong>{category.label}</strong>
                  <small>{category.blurb}</small>
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/lookbook">Lookbook</NavLink>
          <NavLink to="/sobre">A marca</NavLink>
        </nav>
        <Link to="/" className="logo" aria-label="Grigastore, início">
          <em>Griga</em>
          <span>store</span>
        </Link>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Buscar" onClick={openSearch}>
            <Icon name="search" />
          </button>
          <button className="icon-btn bag-btn" aria-label={`Sacola, ${count} itens`} onClick={openDrawer}>
            <Icon name="bag" />
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-top">
              <strong>Menu</strong>
              <button className="icon-btn" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            <Link to="/loja" onClick={() => setMenuOpen(false)}>
              Toda a loja
            </Link>
            {categories.map((category) => (
              <Link key={category.id} to={`/loja?categoria=${category.id}`} onClick={() => setMenuOpen(false)}>
                {category.label}
              </Link>
            ))}
            <Link to="/lookbook" onClick={() => setMenuOpen(false)}>
              Lookbook
            </Link>
            <Link to="/sobre" onClick={() => setMenuOpen(false)}>
              A marca
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addLine } = useCart();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
    >
      <Link to={`/produto/${product.id}`} className="card-media">
        <img src={product.images[0]} alt={product.name} />
        {product.images[1] && <img className="alt" src={product.images[1]} alt="" />}
        {product.badge && <em>{product.badge}</em>}
      </Link>
      <div className="card-body">
        <div className="card-row">
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <p>{categoryLabel(product.category)}</p>
        <div className="size-row" role="group" aria-label={`Tamanho de ${product.name}`}>
          {product.sizes.map((item) => (
            <button
              key={item}
              type="button"
              className={size === item ? "on" : ""}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          className="add-mini"
          type="button"
          onClick={() => {
            if (!size) return;
            addLine({ productId: product.id, size, color: product.colors[0].name });
          }}
          disabled={!size}
        >
          {size ? "Adicionar à sacola" : "Escolha o tamanho"}
        </button>
      </div>
    </motion.article>
  );
}

function CartDrawer() {
  const { lines, drawerOpen, closeDrawer, setQty, removeLine, subtotal, shipping, total, remainingForFreeShipping } =
    useCart();
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.button
            className="backdrop"
            aria-label="Fechar sacola"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="Sacola"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="drawer-head">
              <h2>Sacola</h2>
              <button className="icon-btn" aria-label="Fechar sacola" onClick={closeDrawer}>
                <Icon name="close" />
              </button>
            </div>
            <div className="ship-meter">
              <div style={{ width: `${progress}%` }} />
            </div>
            <p className="ship-note">
              {subtotal === 0
                ? `Frete grátis a partir de ${formatPrice(FREE_SHIPPING)}.`
                : remainingForFreeShipping === 0
                  ? "Você ganhou frete grátis."
                  : `Faltam ${formatPrice(remainingForFreeShipping)} para o frete grátis.`}
            </p>
            <div className="drawer-list">
              {lines.length === 0 && (
                <div className="empty">
                  <p>Sua sacola está vazia.</p>
                  <Link to="/loja" onClick={closeDrawer} className="btn">
                    Ver a coleção
                  </Link>
                </div>
              )}
              {lines.map((line, index) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                return (
                  <div className="line" key={`${line.productId}-${line.size}-${line.color}`}>
                    <Link to={`/produto/${product.id}`} onClick={closeDrawer}>
                      <img src={product.images[0]} alt="" />
                    </Link>
                    <div>
                      <strong>{product.name}</strong>
                      <span>
                        {line.color} · {line.size}
                      </span>
                      <div className="qty">
                        <button type="button" onClick={() => setQty(index, line.qty - 1)} aria-label="Diminuir">
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button type="button" onClick={() => setQty(index, line.qty + 1)} aria-label="Aumentar">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="line-end">
                      <b>{formatPrice(product.price * line.qty)}</b>
                      <button type="button" onClick={() => removeLine(index)}>
                        Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {lines.length > 0 && (
              <div className="drawer-foot">
                <p>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </p>
                <p>
                  <span>Frete</span>
                  <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                </p>
                <p className="total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </p>
                <Link to="/checkout" className="btn btn-dark" onClick={closeDrawer}>
                  Finalizar pedido
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchOverlay() {
  const { searchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 5);
    return products.filter((product) => {
      const hay = `${product.name} ${categoryLabel(product.category)} ${product.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="search-layer">
      <button className="backdrop" aria-label="Fechar busca" onClick={closeSearch} />
      <motion.div
        className="search-panel"
        role="dialog"
        aria-label="Buscar produtos"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            closeSearch();
            navigate(query.trim() ? `/loja?q=${encodeURIComponent(query.trim())}` : "/loja");
          }}
        >
          <Icon name="search" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar camisa, blazer, calça..."
            aria-label="Buscar"
          />
          <button type="button" className="text-btn" onClick={closeSearch}>
            Fechar
          </button>
        </form>
        <ul>
          {results.length === 0 && <li className="muted">Nenhum produto com esse nome.</li>}
          {results.map((product) => (
            <li key={product.id}>
              <Link to={`/produto/${product.id}`} onClick={closeSearch}>
                <img src={product.images[0]} alt="" />
                <span>
                  <strong>{product.name}</strong>
                  <small>
                    {categoryLabel(product.category)} · {formatPrice(product.price)}
                  </small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function MobileNav() {
  const { count, openDrawer } = useCart();
  return (
    <nav className="tabbar" aria-label="Atalhos">
      <NavLink to="/" end>
        Início
      </NavLink>
      <NavLink to="/loja">Loja</NavLink>
      <NavLink to="/lookbook">Looks</NavLink>
      <button type="button" onClick={openDrawer}>
        Sacola{count > 0 ? ` (${count})` : ""}
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="logo">
            <em>Griga</em>
            <span>store</span>
          </p>
          <p className="footer-lead">Alfaiataria contemporânea para quem prefere menos peça e mais corte.</p>
        </div>
        <div>
          <h3>Loja</h3>
          {categories.map((category) => (
            <Link key={category.id} to={`/loja?categoria=${category.id}`}>
              {category.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Ajuda</h3>
          <Link to="/sobre">Trocas e envio</Link>
          <Link to="/sobre">Guia de tamanho</Link>
          <Link to="/sobre">Cuidado com as peças</Link>
          <a href="mailto:ola@grigastore.com">ola@grigastore.com</a>
        </div>
        <form
          className="news"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            form.reset();
            form.dataset.sent = "true";
          }}
        >
          <h3>Novidades</h3>
          <p>Uma nota curta quando a coleção mudar. Sem enxurrada.</p>
          <p className="sent">Pronto. Avisamos na próxima coleção.</p>
          <label>
            <span className="sr">E-mail</span>
            <input type="email" required placeholder="seu@email.com" />
          </label>
          <button className="btn" type="submit">
            Quero receber
          </button>
        </form>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Grigastore</span>
        <span>São Paulo</span>
      </div>
    </footer>
  );
}

export function PageHero({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
