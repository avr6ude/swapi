import { atom } from "jotai"

export type Character = {
  name: string
}

export const searchResultsAtom = atom<Character[]>([])
export const searchTermAtom = atom<string>('')