import React from "react";

const LandingPages = () => {
  const landingPages = [
    { clientName: "Client A", url: "https://example.com/a", formSubmissions: 25 },
    { clientName: "Client B", url: "https://example.com/b", formSubmissions: 15 },
    { clientName: "Client C", url: "https://example.com/c", formSubmissions: 40 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Landing Pages</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Client Name</th>
            <th className="p-4 text-left">URL</th>
            <th className="p-4 text-left">Form Submissions</th>
          </tr>
        </thead>
        <tbody>
          {landingPages.map((page, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="p-4">{page.clientName}</td>
              <td className="p-4">
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {page.url}
                </a>
              </td>
              <td className="p-4">{page.formSubmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandingPages;
