"use client"

import Link from "next/link"

import { Toaster } from "@/components/ui/toaster"
import Landing from "@/components/landing"

export default function IndexPage() {
  return (
    <main className="mx-2 my-10 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:flex-row sm:items-start sm:justify-start sm:text-left">
      <Toaster />
      <Landing />
    </main>
  )
}
