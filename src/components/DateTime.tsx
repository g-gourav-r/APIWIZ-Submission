// src/components/DateTime.tsx

import { useEffect, useState } from "react";

interface DateTimeProps {
  showTime?: boolean;
  showDate?: boolean;
  dateFormat?: string;
  timeFormat?: string;
}

const DateTime: React.FC<DateTimeProps> = ({
  showTime = true,
  showDate = true,
  dateFormat = "en-GB",
  timeFormat = "en-GB",
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // Formatting the date using the provided or default format
  const formattedDate = currentDateTime.toLocaleDateString(dateFormat, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Formatting the time using the provided or default format
  const formattedTime = currentDateTime.toLocaleTimeString(timeFormat, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col items-center">
      {showDate && <p className="text-xl font-semibold">{formattedDate}</p>}
      {showTime && <p className="text-lg">{formattedTime}</p>}
    </div>
  );
};

export default DateTime;
