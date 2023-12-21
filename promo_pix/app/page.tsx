/* eslint-disable tailwindcss/classnames-order */
import Link from "next/link"

import Landing from "@/components/landing"

export default function IndexPage() {
  return (
    <main className="mt-10 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:flex-row sm:items-start sm:justify-start sm:text-left">
      <Landing />
    </main>
  )
}
