let allItems = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
  fetchItems();

  document.getElementById('searchInput').addEventListener('input', filterAndRender);
  document.getElementById('categoryFilter').addEventListener('change', filterAndRender);
  document.getElementById('sortSelect').addEventListener('change', filterAndRender);

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('previewModal').addEventListener('click', (e) => {
    if (e.target.id === 'previewModal') closeModal();
  });
});

async function fetchCategories() {
  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    const select = document.getElementById('categoryFilter');
    data.categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
}

async function fetchItems() {
  try {
    const res = await fetch('/api/items');
    const data = await res.json();
    allItems = data.items;
    renderItems(allItems);
  } catch (err) {
    console.error('Error fetching items:', err);
    document.getElementById('cardGrid').innerHTML = '<p>Error loading tools. Please refresh.</p>';
  }
}

function filterAndRender() {
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const sort = document.getElementById('sortSelect').value;

  let filtered = allItems.filter(item => {
    const matchesSearch = !search ||
      item.title.toLowerCase().includes(search) ||
      item.summary.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);
    const matchesCategory = !category || item.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === 'rank') {
    filtered.sort((a, b) => a.rank - b.rank);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'category') {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  renderItems(filtered);
}

function renderItems(items) {
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No agentic tools found matching criteria.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <div>
        <div class="card-header">
          <span class="rank-badge">#${item.rank}</span>
          <span class="category-tag">${item.category}</span>
        </div>
        <h2 class="card-title">${item.title}</h2>
        <span class="card-badge">${item.badge || 'Agent Tool'}</span>
        <p class="card-summary">${item.summary}</p>
      </div>
      <div class="card-actions">
        <button class="secondary outline preview-btn" onclick="openPreview('${item.id}')">Quick Preview</button>
        <a href="item.html?id=${item.id}" role="button" class="contrast">Full Page &rarr;</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openPreview(id) {
  const item = allItems.find(i => i.id === id);
  if (!item) return;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <span class="category-tag">${item.category}</span>
      <span class="rank-badge">Rank #${item.rank}</span>
    </div>
    <h2 style="margin-bottom: 0.5rem; color: #38bdf8;">${item.title}</h2>
    <p style="color: #cbd5e1; font-weight: 500;">${item.summary}</p>
    <hr style="margin: 1rem 0; border-color: #334155;">
    <p style="color: #94a3b8; font-size: 0.95rem;">${item.description}</p>
    <h4 style="font-size: 1rem; color: #f1f5f9; margin-top: 1rem;">Key Highlights:</h4>
    <ul class="feature-list">
      ${item.keyFeatures.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
      <a href="item.html?id=${item.id}" role="button" class="primary" style="flex: 1; text-align: center;">View Dedicated Page</a>
      <a href="${item.docUrl}" target="_blank" rel="noopener" role="button" class="secondary outline" style="flex: 1; text-align: center;">Official Docs &#8599;</a>
    </div>
  `;

  document.getElementById('previewModal').classList.add('active');
}

function closeModal() {
  document.getElementById('previewModal').classList.remove('active');
}
