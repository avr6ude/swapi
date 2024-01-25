import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InputField from "./InputField";
import { Character } from "../models/types";

export default function CharacterSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])
  const [debounceInputValue, setDebounceInputValue] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  //added debounce so that we don't send a request every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceInputValue(searchTerm)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const onSend = useCallback((query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }
    const uri = 'https://swapi.dev/api/people/?search=' + searchTerm

    fetch(uri)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.results)) {
          setSearchResults(data.results)
        }
      })
      .catch(e => console.error(e))
  }, [searchTerm, setSearchResults])

  useEffect(() => onSend(debounceInputValue), [debounceInputValue, onSend])


  return (
    <div>
      <InputField value={searchTerm} onChange={handleInputChange} />
      <ul>{searchResults.map((character, index) => 
          <li key={index}>{character.name}</li>
        )}
      </ul>
    </div>
  );
}