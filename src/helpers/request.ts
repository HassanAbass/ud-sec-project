export const validateNumber = (str: string): boolean => {
    const number: number = +str;
    if (!number) return false;
    if (isNaN(number)) return false;
    if (number < 1) return false;
    return true;
};
