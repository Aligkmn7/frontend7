import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm transition-colors ${
        isActive 
          ? 'border-b-2 border-blue-500 text-blue-600' 
          : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface TabsProps {
  value: number;
  onChange: (index: number) => void;
  children: React.ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = ({ value, onChange, children }) => {
  const tabs = React.Children.map(children, (child, index) => {
    if (React.isValidElement<TabProps>(child)) {
      return React.cloneElement(child, {
        isActive: index === value,
        onClick: () => onChange(index),
      });
    }
    return child;
  });

  return (
    <div className="border-b mb-4">
      <div className="flex space-x-4">{tabs}</div>
    </div>
  );
};