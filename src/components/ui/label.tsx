import React, { forwardRef } from 'react';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const Label = forwardRef<HTMLLabelElement, LabelProps>(({
  className = '',
  ...props
}, ref) => {
  return <label ref={ref} className={`text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />;
});
Label.displayName = 'Label';
export { Label };