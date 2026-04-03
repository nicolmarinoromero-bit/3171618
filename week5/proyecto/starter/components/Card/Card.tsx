import React from 'react';

// Root
interface CardRootProps {
  children: React.ReactNode;
  className?: string;
}
const CardRoot: React.FC<CardRootProps> = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

// Header
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-header">{children}</div>
);

// Title
const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="card-title">{children}</h3>
);

// Actions
const CardActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-actions">{children}</div>
);

// Body
const CardBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-body">{children}</div>
);

// Footer
const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-footer">{children}</div>
);

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Actions: CardActions,
  Body: CardBody,
  Footer: CardFooter,
});