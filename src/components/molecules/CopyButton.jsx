import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CopyButton = ({ 
  text, 
  variant = "outline", 
  size = "sm",
  className,
  children 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      <ApperIcon 
        name={copied ? "Check" : "Copy"} 
        size={16} 
        className="mr-2"
      />
      {children || (copied ? "Copied!" : "Copy")}
    </Button>
  );
};

export default CopyButton;