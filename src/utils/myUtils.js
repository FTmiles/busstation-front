export function dateToString (date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad with '0' if needed

    return `${year}-${month}-${day}`
}


