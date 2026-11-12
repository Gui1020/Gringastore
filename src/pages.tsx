import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { categories, categoryLabel, formatPrice, getProduct, lookbook, products, type CategoryId } from "./data";
import { useCart } from "./cart";
import { PageHero, ProductCard, usePageTitle } from "./components";

const sorts = [
  { id: "destaque", label: "Destaques" },
  { id: "novos", label: "Novidades" },
  { id: "menor", label: "Menor preço" },
  { id: "maior", label: "Maior preço" },
] as const;

export function ShopPage() {
  usePageTitle("Loja");
  const [params, setParams] = useSearchParams();
  const category = params.get("categoria") ?? "todos";
  const sort = params.get("ordem") ?? "destaque";
  const query = params.get("q") ?? "";

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let next = products.filter((product) => {
      const categoryOk = category === "todos" || product.category === category;
      const queryOk =
        !q ||
        `${product.name} ${categoryLabel(product.category)} ${product.description}`.toLowerCase().includes(q);
      return categoryOk && queryOk;
    });
    if (sort === "menor") next = [...next].sort((a, b) => a.price - b.price);
    if (sort === "maior") next = [...next].sort((a, b) => b.price - a.price);
    if (sort === "novos") next = [...next].sort((a, b) => Number(b.badge === "Novo") - Number(a.badge === "Novo"));
    if (sort === "destaque") next = [...next].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return next;
  }, [category, sort, query]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "todos" || value === "destaque") next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const active = categories.find((item) => item.id === category);

  return (
    <>
      <PageHero
        kicker={query ? "Busca" : "Loja"}
        title={query ? `Resultados para “${query}”` : active ? active.label : "Toda a coleção"}
        text={
          active?.blurb ??
          "Camisas, malhas, calças, blazers e objetos. Filtre por categoria ou ordene pelo que importa agora."
        }
      />
      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Categorias">
          <button type="button" className={category === "todos" ? "on" : ""} onClick={() => setParam("categoria", "todos")}>
            Tudo
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "on" : ""}
              onClick={() => setParam("categoria", item.id as CategoryId)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="sort">
          <span>Ordenar</span>
          <select value={sort} onChange={(event) => setParam("ordem", event.target.value)}>
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="result-count">
        {list.length} {list.length === 1 ? "peça" : "peças"}
      </p>
      {list.length === 0 ? (
        <div className="empty shop-empty">
          <p>Nada encontrado com esses filtros.</p>
          <button className="btn" type="button" onClick={() => setParams(new URLSearchParams())}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid shop-grid">
          {list.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id ?? "");
  usePageTitle(product?.name ?? "Produto");
  if (!product) {
    return (
      <section className="page-hero">
        <h1>Peça não encontrada</h1>
        <Link to="/loja" className="btn">
          Voltar à loja
        </Link>
      </section>
    );
  }

  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const { addLine } = useCart();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [photo, setPhoto] = useState(0);
  const [error, setError] = useState("");

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <>
      <article className="pdp">
        <div className="gallery">
          <img src={product.images[photo] ?? product.images[0]} alt={product.name} />
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((image, index) => (
                <button key={image} type="button" className={photo === index ? "on" : ""} onClick={() => setPhoto(index)}>
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pdp-info">
          <p className="kicker">
            <Link to={`/loja?categoria=${product.category}`}>{categoryLabel(product.category)}</Link>
            {product.badge ? ` · ${product.badge}` : ""}
          </p>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p className="lead">{product.description}</p>

          <fieldset>
            <legend>Cor · {color}</legend>
            <div className="colors">
              {product.colors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={color === item.name ? "on" : ""}
                  style={{ background: item.hex }}
                  aria-label={item.name}
                  onClick={() => setColor(item.name)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Tamanho</legend>
            <div className="size-row big">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={size === item ? "on" : ""}
                  onClick={() => {
                    setSize(item);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <Link to="/sobre" className="text-link small">
              Guia de tamanho
            </Link>
          </fieldset>

          {error && <p className="form-error">{error}</p>}
          <button
            className="btn btn-dark full"
            type="button"
            onClick={() => {
              if (!size) {
                setError("Escolha um tamanho para continuar.");
                return;
              }
              addLine({ productId: product.id, size, color });
            }}
          >
            Adicionar à sacola · {formatPrice(product.price)}
          </button>
          <ul className="assurances">
            <li>Frete grátis acima de R$ 499</li>
            <li>Troca de tamanho em 30 dias</li>
            <li>Envio em até 2 dias úteis</li>
          </ul>
          <details open>
            <summary>Composição e corte</summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Entrega e troca</summary>
            <p>
              Despachamos de São Paulo. A primeira troca de tamanho é por nossa conta. Peças com sinal de uso não entram na troca.
            </p>
          </details>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>No mesmo guarda-roupa</h2>
          </div>
          <div className="grid">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export function LookbookPage() {
  usePageTitle("Lookbook");
  return (
    <>
      <PageHero
        kicker="Lookbook"
        title="Quatro horas do mesmo homem."
        text="As mesmas regras de corte, mudando só a camada. Use como ponto de partida, não como uniforme."
      />
      <div className="looks">
        {lookbook.map((look, index) => (
          <article key={look.title} className={index % 2 ? "flip" : ""}>
            <img src={look.image} alt="" />
            <div>
              <p className="kicker">0{index + 1}</p>
              <h2>{look.title}</h2>
              <p>{look.text}</p>
              <Link to="/loja" className="text-link">
                Montar este caminho
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function CheckoutPage() {
  usePageTitle("Checkout");
  const { lines, subtotal, shipping, total, clear, closeDrawer } = useCart();
  const [done, setDone] = useState<{ name: string; order: string } | null>(null);
  const [pay, setPay] = useState("pix");

  if (done) {
    return (
      <section className="success">
        <p className="kicker">Pedido {done.order}</p>
        <h1>Obrigado, {done.name.split(" ")[0]}.</h1>
        <p>Enviamos a confirmação para o seu e-mail. Este é um pedido de demonstração — nenhum pagamento foi processado.</p>
        <Link to="/loja" className="btn btn-dark">
          Continuar na loja
        </Link>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="page-hero">
        <h1>Sua sacola está vazia.</h1>
        <Link to="/loja" className="btn btn-dark">
          Escolher peças
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("nome") || "Cliente");
          const order = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
          clear();
          closeDrawer();
          setDone({ name, order });
        }}
      >
        <div>
          <p className="kicker">Checkout</p>
          <h1>Entrega e pagamento</h1>
          <div className="form-grid">
            <label className="wide">
              Nome completo
              <input name="nome" required autoComplete="name" />
            </label>
            <label>
              E-mail
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Telefone
              <input name="telefone" required autoComplete="tel" placeholder="(11) 90000-0000" />
            </label>
            <label>
              CEP
              <input name="cep" required autoComplete="postal-code" placeholder="00000-000" />
            </label>
            <label>
              Cidade
              <input name="cidade" required autoComplete="address-level2" />
            </label>
            <label className="wide">
              Endereço
              <input name="endereco" required autoComplete="street-address" placeholder="Rua, número, complemento" />
            </label>
          </div>
          <fieldset className="pay">
            <legend>Pagamento</legend>
            <label className={pay === "pix" ? "on" : ""}>
              <input type="radio" name="pay" value="pix" checked={pay === "pix"} onChange={() => setPay("pix")} />
              <span>
                <strong>Pix</strong>
                <small>Aprovação na hora. Demonstração, sem cobrança.</small>
              </span>
            </label>
            <label className={pay === "cartao" ? "on" : ""}>
              <input type="radio" name="pay" value="cartao" checked={pay === "cartao"} onChange={() => setPay("cartao")} />
              <span>
                <strong>Cartão</strong>
                <small>Em até 3x sem juros, nesta vitrine.</small>
              </span>
            </label>
          </fieldset>
          <button className="btn btn-dark full" type="submit">
            Confirmar pedido · {formatPrice(total)}
          </button>
          <p className="fine">Ambiente de demonstração. Nenhum dado é enviado a um servidor.</p>
        </div>
        <aside className="summary">
          <h2>Resumo</h2>
          {lines.map((line) => {
            const product = getProduct(line.productId);
            if (!product) return null;
            return (
              <div className="sum-line" key={`${line.productId}-${line.size}-${line.color}`}>
                <img src={product.images[0]} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {line.color} · {line.size} · {line.qty}×
                  </span>
                </div>
                <b>{formatPrice(product.price * line.qty)}</b>
              </div>
            );
          })}
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
        </aside>
      </form>
    </section>
  );
}

export function NotFoundPage() {
  usePageTitle("Página não encontrada");
  return (
    <section className="page-hero">
      <p className="kicker">404</p>
      <h1>Essa página não está na coleção.</h1>
      <Link to="/" className="btn btn-dark">
        Voltar ao início
      </Link>
    </section>
  );
}
