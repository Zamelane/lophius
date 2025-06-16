import React from 'react';

const Filter = ({ options }: { options: string[] }) => {
  return (
    <select className="border border-gray-300 rounded-md px-4 py-2">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Filter;