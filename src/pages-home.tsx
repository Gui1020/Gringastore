import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories, lookbook, products } from "./data";
import { PageHero, ProductCard, usePageTitle } from "./components";

const heroImage =
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1800&q=80";

export function HomePage() {
  usePageTitle("Início");
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const fresh = products.filter((product) => product.badge === "Novo").slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Coleção permanente · 2026</p>
          <h1>
            Corte preciso.
            <br />
            <em>Presença quieta.</em>
          </h1>
          <p>
            A Grigastore faz poucas peças masculinas, com tecido escolhido e alfaiataria que funciona de manhã à noite.
          </p>
          <div className="hero-actions">
            <Link to="/loja" className="btn btn-dark">
              Ver a coleção
            </Link>
            <Link to="/lookbook" className="btn">
              Abrir o lookbook
            </Link>
          </div>
          <ul className="hero-points">
            <li>
              <strong>01</strong>
              <span>Corte</span>
            </li>
            <li>
              <strong>02</strong>
              <span>Tecido</span>
            </li>
            <li>
              <strong>03</strong>
              <span>Duração</span>
            </li>
          </ul>
        </div>
        <div className="hero-media">
          <img src={heroImage} alt="Homem de blazer escuro em luz natural" />
          <p>Blazer estruturado · calça carvão</p>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index}>Grigastore — Nova temporada — Alfaiataria contemporânea — São Paulo — </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Navegar</p>
            <h2>Sete categorias, um guarda-roupa.</h2>
          </div>
          <Link to="/loja" className="text-link">
            Ver tudo
          </Link>
        </div>
        <div className="cat-rail">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/loja?categoria=${category.id}`} className="cat-card">
              <img src={category.image} alt="" />
              <div>
                <small>0{index + 1}</small>
                <strong>{category.label}</strong>
                <span>{category.blurb}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Em destaque</p>
            <h2>As peças que sustentam o resto.</h2>
          </div>
        </div>
        <div className="feature-grid">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="quote-band">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="kicker light">A ideia</p>
          <h2>Menos peças. Melhor corte.</h2>
          <p>
            Cada modelo passa por prova de movimento: sentar, caminhar, subir escada. Se a peça pede atenção o tempo todo, ela não entra na coleção.
          </p>
          <Link to="/sobre" className="text-link light">
            Conhecer a marca
          </Link>
        </motion.div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Acabou de chegar</p>
            <h2>Novidades da temporada.</h2>
          </div>
          <Link to="/loja?ordem=novos" className="text-link">
            Ver novidades
          </Link>
        </div>
        <div className="grid">
          {fresh.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="look-tease">
        <Link to="/lookbook" className="look-main">
          <img src={lookbook[2].image} alt="" />
          <div>
            <p className="kicker light">Lookbook</p>
            <h2>{lookbook[2].title}</h2>
            <span>Ver os quatro looks</span>
          </div>
        </Link>
        <div className="benefits">
          <article>
            <strong>Envio rápido</strong>
            <p>Sai do ateliê em até 2 dias úteis, com rastreio no e-mail.</p>
          </article>
          <article>
            <strong>Troca simples</strong>
            <p>30 dias para trocar tamanho. A etiqueta pode sair, a peça não pode ter uso.</p>
          </article>
          <article>
            <strong>Atendimento humano</strong>
            <p>Dúvida de caimento? Escreva para ola@grigastore.com.</p>
          </article>
        </div>
      </section>
    </>
  );
}

export function AboutPage() {
  usePageTitle("A marca");
  return (
    <>
      <PageHero
        kicker="A marca"
        title="Uma loja pequena, com régua alta."
        text="A Grigastore nasce em São Paulo para resolver um guarda-roupa masculino sem excesso: camisa que não estufa, calça que não aperta, blazer que não parece fantasia."
      />
      <section className="about-grid">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=80"
          alt="Interior de loja com roupas em araras"
        />
        <div>
          <h2>Como escolhemos</h2>
          <p>
            Trabalhamos com poucas fábricas e repetimos os modelos que funcionam. A coleção muda devagar de propósito — a peça de hoje ainda conversa com a do ano passado.
          </p>
          <h3>Envio</h3>
          <p>Frete grátis acima de R$ 499. Abaixo disso, uma taxa fixa de R$ 29 para todo o Brasil. Prazo médio de 3 a 7 dias úteis depois do despacho.</p>
          <h3>Trocas</h3>
          <p>Você tem 30 dias. O primeiro envio da troca sai por nossa conta. Escreva para ola@grigastore.com com o número do pedido.</p>
          <h3>Guia rápido</h3>
          <table className="size-table">
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Peito</th>
                <th>Cintura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P</td>
                <td>92–96 cm</td>
                <td>76–80 cm</td>
              </tr>
              <tr>
                <td>M</td>
                <td>96–102 cm</td>
                <td>80–86 cm</td>
              </tr>
              <tr>
                <td>G</td>
                <td>102–108 cm</td>
                <td>86–94 cm</td>
              </tr>
              <tr>
                <td>GG</td>
                <td>108–116 cm</td>
                <td>94–102 cm</td>
              </tr>
            </tbody>
          </table>
          <p className="fine">Calças usam numeração 38 a 48. Se estiver entre dois tamanhos, prefira o maior no blazer e o da cintura real na calça.</p>
        </div>
      </section>
    </>
  );
}
