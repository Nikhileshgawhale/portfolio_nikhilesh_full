import React from "react";

export default function CV() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600">My Resume</h2>
      <p className="mb-6">Download or view my latest CV below.</p>
      <a
        href="/CV.pdf"
        download
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Download CV
      </a>
      <div className="mt-10 flex justify-center">
        <iframe
          src="/CV.pdf"
          width="80%"
          height="600px"
          className="border rounded-lg shadow-md"
          title="CV"
        />
      </div>
    </section>
  );
}
