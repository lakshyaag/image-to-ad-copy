import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ModelSelect({
  valueChange,
}: {
  valueChange: (value: string) => void
}) {
  return (
    <Select onValueChange={(value) => valueChange(value)}>
      <SelectTrigger className="border-slate-800 dark:border-slate-200">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
        <SelectItem value="gpt-4">GPT-4</SelectItem>
        <SelectItem value="gpt-4-1106-preview">GPT-4 Turbo</SelectItem>
      </SelectContent>
    </Select>
  )
}
