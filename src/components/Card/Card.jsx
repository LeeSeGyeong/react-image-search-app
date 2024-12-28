import "./styles.css";

export default function Card({ index, id, src }) {
  return (
    <>
      <li key={index + id} className="item">
        <div className="item card">
          <img src={src} />
        </div>
      </li>
    </>
  );
}
