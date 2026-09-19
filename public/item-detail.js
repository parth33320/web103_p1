document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const container = document.getElementById('itemDetail');

  if (!id) {
    container.innerHTML = '<p style="color: #ef4444;">No tool ID provided in URL.</p>';
    return;
  }

  try {
    const res = await fetch(`/api/items/${encodeURIComponent(id)}`);
    if (!res.ok) {
      container.innerHTML = '<p style="color: #ef4444;">Requested Agentic AI Tool not found.</p>';
      return;
    }

    const item = await res.json();
    document.title = `${item.title} - Top 10 Agentic AI Tools`;

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span class="category-tag">${item.category}</span>
        <span class="rank-badge" style="font-size: 1rem;">Rank #${item.rank}</span>
      </div>

      <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: #f8fafc;">${item.title}</h1>
      <p style="font-size: 1.2rem; color: #38bdf8; font-weight: 500; margin-bottom: 1.5rem;">${item.summary}</p>

      <section style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; color: #f1f5f9; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">Overview & Architecture Role</h3>
        <p style="color: #cbd5e1; line-height: 1.7; font-size: 1.05rem;">${item.description}</p>
      </section>

      <section style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; color: #f1f5f9; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">Technical Specifications</h3>
        <div class="specs-grid">
          <div class="spec-item">
            <span class="spec-label">Language / Runtime</span>
            <span class="spec-value">${item.specs.language}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">License</span>
            <span class="spec-value">${item.specs.license}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">GitHub Stars</span>
            <span class="spec-value">${item.specs.stars}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Primary Agentic Role</span>
            <span class="spec-value">${item.specs.primaryUse}</span>
          </div>
        </div>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.25rem; color: #f1f5f9; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">Key Capability Highlights</h3>
        <ul class="feature-list">
          ${item.keyFeatures.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </section>

      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <a href="${item.docUrl}" target="_blank" rel="noopener" role="button" class="primary" style="flex: 1; text-align: center;">Official Documentation &#8599;</a>
        <a href="index.html" role="button" class="secondary outline" style="flex: 1; text-align: center;">Return to Listicle</a>
      </div>
    `;
  } catch (err) {
    console.error('Error fetching item details:', err);
    container.innerHTML = '<p style="color: #ef4444;">Failed to load tool details. Please try again.</p>';
  }
});
