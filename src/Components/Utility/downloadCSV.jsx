import React from 'react';

export default function DownloadCSV({ data }) {
  const handleDownload = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, 'data.csv');
  };

  return (
    <div>
      <button 
        onClick={handleDownload} 
        className='bg-purple-800 py-3 px-2 text-white rounded-lg' 
        style={{ fontFamily: "Noto Sans" }}>
        Download CSV
      </button>
    </div>
  );
}

const convertToCSV = (array) => {
  const header = Object.keys(array[0]).join(',');
  const rows = array.map(obj => {
    return Object.values(obj).map(value => {
      if (Array.isArray(value)) {
        return `"${value.join('; ')}"`;
      }
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    }).join(',');
  });

  return [header, ...rows].join('\n');
};

const downloadCSV = (csv, filename) => {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
