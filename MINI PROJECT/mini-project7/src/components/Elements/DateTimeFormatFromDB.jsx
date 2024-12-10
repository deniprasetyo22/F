export const formatDateTimeFromDB = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()]; // Get month name
    const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours with leading zero
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes with leading zero
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds with leading zero

    return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`; // "DD Month YYYY, HH:MM:SS"
};
