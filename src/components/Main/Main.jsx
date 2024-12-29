import { React, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getImages } from "../../utils/api";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import "./styles.css";

export default function Main() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const imageRows = [];

  useEffect(() => {
    if (inView) {
      setPage(page => page + 1);
      fetchData();
    }
  }, [inView]);

  const fetchData = async () => {
    const fetch = async () => {
      const response = await getImages(searchValue, page);
      if (response) {
        setSearchResult(prevResponse => [...prevResponse, ...response]);
      }
    };
    fetch();
  };

  const handleSubmitKeywords = (e) => {
    e.preventDefault();
    const fetch = async () => {
      const response = await getImages(searchValue, page);
      setSearchResult(response);
    };
    fetch();
  };

  if (searchResult) {
    searchResult.map((el, index) => {
      imageRows.push(
        <Card
          index={index}
          imageId={el.id}
          src={el.urls.thumb}
        />
      );
    });
  }

  return (
    <div className="main-container">
      <SearchBar>
        <form className="search-form" onSubmit={handleSubmitKeywords}>
          <input
            type="text"
            placeholder="원하는 이미지의 키워드를 입력하세요."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button type="submit">검 색</button>
        </form>
      </SearchBar>
      <section className="content">
        <ul key="image-ul" className="list">
          {imageRows}
        </ul>
      </section>
      <div ref={ref}> {inView ? "" : "로딩중"} </div>
    </div>
  );
}
