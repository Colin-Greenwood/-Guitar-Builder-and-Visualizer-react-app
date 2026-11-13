
function FilterControls({ filter, setFilter }) {
  return (
    <section className="filter-controls">
      <h2>Explore Guitar Parts</h2>

      <label htmlFor="categoryFilter">Filter by category:</label>

      <select
        id="categoryFilter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="All">All Parts</option>
        <option value="Body">Body</option>
        <option value="Pickups">Pickups</option>
        <option value="Neck">Neck</option>
        <option value="Hardware">Hardware</option>
        <option value="Finish">Finish</option>
      </select>
    </section>
  );
}

export default FilterControls;
