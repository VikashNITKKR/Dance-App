"use client"
import Link from "next/link"

export default function Component() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl">
        <div className="w-full aspect-w-16 aspect-h-9">
          {/* <span className="w-full h-full object-cover shadow-md rounded-md bg-muted" /> */}
          <video src="dance.mp4" className="w-full aspect-video rounded-md bg-muted" controls ></video>
        </div>
        <div className="w-full aspect-w-16 aspect-h-9">
          {/* <span className="w-full h-full object-cover shadow-md rounded-md bg-muted" /> */}
          <video src="dance.mp4" className="w-full aspect-video rounded-md bg-muted" controls ></video>
        </div>
      </div>
      <div className="mt-8">
        <Link
          className="inline-flex items-center justify-center h-10 px-5 text-lg font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          href="#"
        >
          Continue
        </Link>
      </div>
    </main>
  )
}