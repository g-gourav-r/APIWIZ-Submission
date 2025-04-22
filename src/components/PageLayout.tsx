import { ReactNode } from 'react';

const PageLayout = ({
  children,
  calendar,
}: {
  children: ReactNode;
  calendar: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-full">
      <div className="md:col-span-2 h-full">{children}</div>
      <div className="md:col-span-1">
        {calendar}
      </div>
    </div>
  );
};

export default PageLayout;
