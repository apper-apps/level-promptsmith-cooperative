import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const TagInput = ({ 
  tags = [], 
  onChange, 
  placeholder = "Add tags...",
  className 
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions] = useState([
    "AI", "GPT", "ChatGPT", "Claude", "Coding", "Writing", "Email", "Blog", "Marketing", "Social Media"
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      !tags.includes(suggestion) && 
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2 p-3 border-2 border-gray-200 rounded-lg focus-within:border-primary-500 transition-all duration-200">
        {tags.map((tag, index) => (
          <Badge key={index} variant="primary" className="flex items-center gap-1">
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 hover:bg-primary-300 rounded-full p-0.5 transition-colors duration-200"
            >
              <ApperIcon name="X" size={12} />
            </button>
          </Badge>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent placeholder:text-gray-400"
        />
      </div>
      
      {inputValue && filteredSuggestions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 animate-fade-in">
          <div className="text-xs text-gray-500 mb-2 px-2">Suggestions:</div>
          <div className="flex flex-wrap gap-1">
            {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addTag(suggestion)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagInput;