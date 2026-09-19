const fs = require('fs');
const path = require('path');

const ITEMS_FILE = path.join(__dirname, '../data/items.json');

function getAllItems({ search = '', category = '', sort = 'rank' } = {}) {
  if (!fs.existsSync(ITEMS_FILE)) {
    return [];
  }

  let items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

  if (category) {
    items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    items = items.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      (item.keyFeatures && item.keyFeatures.some(f => f.toLowerCase().includes(term)))
    );
  }

  if (sort === 'rank') {
    items.sort((a, b) => a.rank - b.rank);
  } else if (sort === 'name') {
    items.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'category') {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

  return items;
}

function getItemById(id) {
  const items = getAllItems();
  return items.find(item => item.id.toLowerCase() === id.toLowerCase()) || null;
}

function getCategories() {
  const items = getAllItems();
  const categories = [...new Set(items.map(item => item.category))];
  return categories.sort();
}

module.exports = {
  getAllItems,
  getItemById,
  getCategories
};
