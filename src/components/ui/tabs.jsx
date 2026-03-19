import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from 'react';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List 
    {...props} 
    className="flex bg-[#111] p-1 rounded-2xl border border-white/5 shadow-inner" 
  />
);

export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger 
    {...props} 
    className="flex-1 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-500 ease-out" 
  />
);

export const TabsContent = (props) => (
  <TabsPrimitive.Content {...props} className="mt-6 outline-none" />
);