import { ChangeEvent } from "react"

export type Character = {
  name: string
}
export type InputFieldProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}