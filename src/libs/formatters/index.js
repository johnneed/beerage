export const formatPhone = (num: 'string') => {
    const digits = num.replace(/[^0-9]/g, '');
    switch (true) {
        case digits.length <= 3:
            return digits;
        case digits.length <= 7:
            return `${digits.slice(0, 3)}-${digits.slice(3)}`;
        case digits.length <= 10:
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        default:
            return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
};


