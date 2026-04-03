interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por nombre o marca..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={onClear} className="clear-btn">
          ✖ Limpiar
        </button>
      )}
    </div>
  );
};

export default SearchBar;