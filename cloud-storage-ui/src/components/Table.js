import React from 'react';

// Simple table styled with tailwind
function Table({ headers, data, deleteBucketFile }) {
  if (data.length === 0) {
    return <div />;
  }

  return (
    <table className="table-auto w-3/4 mt-12">
      <thead>
        <tr>
          {headers.map(h => {
            return (
              <th key={h} className="px-4 py-2 text-lg">
                {h}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(d => {
          return (
            <tr key={d.name} className="text-base">
              <td className="border px-4 py-2 underline">
                <a href={d.readUrl} target="_blank" rel="noopener noreferrer">
                  {d.name}
                </a>
              </td>
              <td className="border px-4 py-2">{d.createdAt}</td>
              <td className="border px-4 py-2">{d.contentType}</td>
              <td className="border px-4 py-2">
                <a
                  href={d.saveUrl}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                </a>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={deleteBucketFile}
                  data-delete-url={d.delUrl}
                  data-file-name={d.name}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 80">
                    <path
                      d="M26.5,3.17a4,4,0,0,0-4,4v4H5.5a3,3,0,0,0-3,3v10a3,3,0,0,0,3,3h3v53a3,3,0,0,0,3,3h44a3,3,0,0,0,3-3v-53h3a3,3,0,0,0,3-3v-10a3,3,0,0,0-3-3h-17v-4a4,4,0,0,0-4-4Zm0,2h14a2.16,2.16,0,0,1,2,2v4h-18v-4A2.16,2.16,0,0,1,26.5,5.17Zm-21,8h56a1,1,0,0,1,1,1v10a1,1,0,0,1-1,1H5.5a1,1,0,0,1-1-1v-10A1,1,0,0,1,5.5,13.17Zm5,14h46v53a1,1,0,0,1-1,1h-44a1,1,0,0,1-1-1Zm11,10a1,1,0,0,0-1,1v32a1,1,0,0,0,2,0v-32a1,1,0,0,0-1-1Zm12,0a1,1,0,0,0-1,1v32a1,1,0,0,0,2,0v-32a1,1,0,0,0-1-1Zm12,0a1,1,0,0,0-1,1v32a1,1,0,0,0,2,0v-32a1,1,0,0,0-1-1Z"
                      transform="translate(-2.5 -3.17)"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
