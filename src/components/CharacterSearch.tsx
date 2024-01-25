import { useAtom } from "jotai";
import { useEffect } from "react";
import { searchResultsAtom, searchTermAtom } from "../models/store";

export default function CharacterSearch() {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom)
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom)

  const uri = 'https://swapi.dev/api/people/?search=' + searchTerm

  useEffect(() => {
    if (searchTerm.length) {
      fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.results)) {
            setSearchResults(data.results)
          }
      })
      .catch((e) => console.error(e))
    } else {
      setSearchResults([])
    }
  }, [searchTerm, setSearchResults, uri])


  return (
    <div>
      <input 
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>{searchResults.map((character, index) => 
          <li key={index}>{character.name}</li>
        )}
      </ul>
    </div>
  );
}