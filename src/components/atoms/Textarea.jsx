import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className, 
  label,
  error,
  rows = 4,
  ...props 
}, ref) => {
  const id = props.id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all duration-200 placeholder:text-gray-400 resize-none form-field",
          error && "border-coral-500 focus:border-coral-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-coral-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;