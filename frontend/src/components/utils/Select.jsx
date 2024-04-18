import React, { useEffect, useState } from "react";

export const MultiSelect = ({ onChange }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetch(`${backendUrl}api/tags/`);
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOptions([
      ...selectedOptions,
      { id: option.id, name: option.name },
    ]);
    setSearchText("");
    onChange &&
      onChange([...selectedOptions, { id: option.id, name: option.name }]);
    // Remove selected option from dropdown
    setOptions(options.filter((opt) => opt.id !== option.id));
  };

  const handleRemoveTag = (tagId) => {
    const updatedOptions = selectedOptions.filter((opt) => opt.id !== tagId);
    setSelectedOptions(updatedOptions);
    onChange && onChange(updatedOptions);
    // Add removed option back to dropdown
    const removedOption = selectedOptions.find((opt) => opt.id === tagId);
    if (removedOption) {
      setOptions([...options, removedOption]);
    }
  };

  return (
    <div className="relative inline-block w-64">
      <input
        type="text"
        placeholder="Select tags..."
        className="block w-full py-2 px-3 rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setIsOpen(!isOpen)}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-md">
          {options
            .filter((option) =>
              option.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((option, index) => (
              <div
                key={index}
                className="py-1 px-3 text-gray-800 cursor-pointer hover:bg-gray-200"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap">
        {selectedOptions.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white py-1 px-2 rounded-full mr-2 mb-2 cursor-pointer"
            onClick={() => handleRemoveTag(tag.id)}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};
