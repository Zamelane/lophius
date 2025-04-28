import React from "react";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <div className="flex gap-4 justify-between items-center">
    <h1 className="text-2xl font-semibold">{title}</h1>
    {actions && (
      <div className="flex gap-1 items-center">
        {actions}
      </div>
    )}
  </div>
);