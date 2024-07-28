import { redirect } from "next/navigation"
import Results from "./_components/results"
import { Suspense } from "react"
import { ResultsSkeleton } from "../_components/results"

interface SearchPagePrams {
    searchParams: {
        term?: string
    }
}

export default async function SearchPage({searchParams}: SearchPagePrams) {

  if (!searchParams.term) {
    redirect("/")
  }

  return (
    <div className="h-full p- max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  )
}
