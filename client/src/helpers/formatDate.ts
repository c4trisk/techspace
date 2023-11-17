

export function formatDate(dateString: any) {

  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  let daySuffix = 'th';

  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  return formattedDate.replace(/\b\d+\b/, `${day}${daySuffix}`);
}