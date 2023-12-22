import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-background sticky bottom-0 z-40 w-full border-t">
      <div className="py-4">
        <p className="text-center text-sm ">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://twitter.com/lakshyaag"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Lakshya Agarwal
          </a>{" "}
          using the{" "}
          <a
            href="https://github.com/jxnl/instructor"
            className="text-pink-600 hover:underline dark:text-pink-400"
          >
            instructor
          </a>{" "}
          library.
        </p>
      </div>
    </footer>
  )
}
