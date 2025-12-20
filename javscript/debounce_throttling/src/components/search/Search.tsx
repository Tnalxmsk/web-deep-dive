import { useMemo, useState } from "react";
import { debounce } from "./debounce.ts";

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const search = (value: string) => {
    console.log('API 호출', value);
  };

  const debounceSearch = useMemo(() => debounce(search, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    search(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <input type="text" value={keyword} onChange={handleChange} placeholder="검색어 입력" />
  );
};

export default Search;
