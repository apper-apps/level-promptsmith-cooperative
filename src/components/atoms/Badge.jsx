import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  size = "sm",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border border-primary-300",
    secondary: "bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 border border-sky-300",
    coral: "bg-gradient-to-r from-coral-100 to-coral-200 text-coral-700 border border-coral-300",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;