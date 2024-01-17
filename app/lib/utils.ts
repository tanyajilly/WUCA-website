export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };

  function convertToDataURI(file: File, callback: (dataUri: string) => void): void {
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
        // Check if event.target.result is string for TypeScript type assertion
        if (typeof event.target?.result === 'string') {
            callback(event.target.result);
        }
    };

    reader.onerror = function (error: ProgressEvent<FileReader>) {
        console.error('Error reading file:', error);
    };

    // Read the file as a data URL (base64 string)
    reader.readAsDataURL(file);
}