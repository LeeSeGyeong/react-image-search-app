import './styles.css';
export default function SearchBar({ children }) {

  return (
    <div className="search-bar">
      <h1> Unsplash 이미지 찾기 </h1>
      {children}
    </div>
  );
}
