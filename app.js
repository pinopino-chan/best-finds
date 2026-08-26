const state = {
  products: [],
  filtered: [],
  category: "All",
  query: "",
  page: 1,
  perPage: 20,
  shortId: null
};

const $ = (id) => document.getElementById(id);

function esc(s=""){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function trackAmazonClick(product){
  if (typeof gtag === "function") {
    gtag("event","amazon_click",{
      product_id: product.id,
      product_name: product.title,
      category: product.category
    });
  }
}

function card(p){
  const safeUrl = esc(p.amazon);
  const ytUrl = p.youtube_id ? `https://www.youtube.com/shorts/${esc(p.youtube_id)}` : "";
  return `<article class="card">
    <a class="card-img" href="${safeUrl}" target="_blank" rel="sponsored nofollow noopener" data-amazon="${esc(p.id)}">
      <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.style.display='none'">
    </a>
    <div class="card-body">
      ${p.featured ? '<span class="badge">FEATURED</span>' : ''}
      <h3>${esc(p.title)}</h3>
      <div class="meta"><span>${esc(p.category)}</span><span class="price">${esc(p.price || "")}</span></div>
      ${ytUrl ? `<a class="shorts-link" href="${ytUrl}" target="_blank" rel="noopener">▶ Watch on YouTube Shorts</a>` : ""}
      <a class="amazon" href="${safeUrl}" target="_blank" rel="sponsored nofollow noopener" data-amazon="${esc(p.id)}">View on Amazon →</a>
    </div>
  </article>`;
}

function renderGrid(){
  const start = 0, end = state.page * state.perPage;
  const items = state.filtered.slice(start,end);
  $("productGrid").innerHTML = items.map(card).join("");
  $("loadMore").classList.toggle("hidden", end >= state.filtered.length);
  $("empty").classList.toggle("hidden", state.filtered.length !== 0);
  bindAmazonClicks();
}

function renderShort(items){
  if (!items.length){ $("shortSection").classList.add("hidden"); return; }
  $("shortSection").classList.remove("hidden");
  $("shortGrid").innerHTML = items.map(card).join("");
  bindAmazonClicks();
}

function bindAmazonClicks(){
  document.querySelectorAll("[data-amazon]").forEach(el=>{
    el.onclick = () => {
      const p = state.products.find(x=>x.id === el.dataset.amazon);
      if (p) trackAmazonClick(p);
    };
  });
}

function applyFilters(){
  const q = state.query.toLowerCase().trim();
  state.filtered = state.products.filter(p=>{
    const cat = state.category === "All" || p.category === state.category;
    const text = `${p.title} ${p.category} ${p.tags || ""}`.toLowerCase();
    return cat && (!q || text.includes(q));
  });
  state.page = 1;
  $("sectionTitle").textContent = state.category === "All" ? "Trending now" : state.category;
  renderGrid();
}

function renderCategories(){
  const cats = ["All", ...new Set(state.products.map(p=>p.category).filter(Boolean))];
  $("categories").innerHTML = cats.map(c=>`<button class="chip ${c==="All"?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  document.querySelectorAll("[data-cat]").forEach(btn=>{
    btn.onclick=()=>{
      state.category=btn.dataset.cat;
      document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
      window.scrollTo({top:document.querySelector(".section").offsetTop-60,behavior:"smooth"});
    };
  });
}

function handleShortParam(){
  const id = new URLSearchParams(location.search).get("p");
  if (!id) return;
  state.shortId=id;
  const matches=state.products.filter(p=>p.id===id || (Array.isArray(p.shorts)&&p.shorts.includes(id)));
  if(matches.length){
    renderShort(matches);
    $("shortTitle").textContent=matches.length===1 ? matches[0].title : "Products from this video";
  }
}

$("search").addEventListener("input", e=>{state.query=e.target.value;applyFilters();});
$("loadMore").addEventListener("click",()=>{state.page++;renderGrid();});
$("clearShort").addEventListener("click",()=>{$("shortSection").classList.add("hidden"); history.replaceState({}, "", location.pathname);});

fetch("products.json")
  .then(r=>r.json())
  .then(data=>{
    state.products=Array.isArray(data)?data:[];
    renderCategories();
    handleShortParam();
    applyFilters();
  })
  .catch(err=>{
    console.error(err);
    $("empty").textContent="Could not load products.json.";
    $("empty").classList.remove("hidden");
  });
