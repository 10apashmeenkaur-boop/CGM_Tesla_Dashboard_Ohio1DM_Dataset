import React from 'react';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Tesla-style base classes: sharp fonts, slight letter spacing, smooth transitions
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-[0.15em] text-[10px] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  // Custom Variants
  const variants = {
    // Solid Blue (The "Autopilot" active look)
    default: "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]",
    
    // Transparent with a thin border (The "MCU Menu" look)
    outline: "border border-white/10 bg-transparent text-gray-400 hover:border-white/40 hover:text-white hover:bg-white/5",
    
    // Ghost (Minimal text)
    ghost: "text-gray-500 hover:text-white hover:bg-white/5",
    
    // High-contrast (Like the "Emergency" or "Stop" controls)
    danger: "bg-red-600/20 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-6 py-3 rounded-xl",
    lg: "px-10 py-4 rounded-2xl text-xs",
    icon: "p-2 rounded-full"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};