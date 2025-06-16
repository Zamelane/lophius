import React from 'react';

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-300 rounded-md px-4 py-2"
    />
  );
};

export default SearchInput;
