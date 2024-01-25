import { InputFieldProps } from "../models/types"

export default function InputField (
  { value, onChange }: InputFieldProps) {
    return (
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    )
  }