import React from 'react'

export default function PageNotFound() {
  return (
    <section className="container flex items-center px-6 py-12 mx-auto">
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <img className="object-cover object-center rounded" height={"350px"} width={"350px"} alt="" src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527127.jpg?size=626&ext=jpg" />
        <h1 className="mt-3 text-4xl font-semibold text-gray-800">Page not found</h1>
        <p className="mt-4 text-gray-500">The page you are looking for doesn't exist.</p>
      </div>
    </section>
  )
}
