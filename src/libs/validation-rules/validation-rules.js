// @flow
import {curry} from 'ramda';

export const isRequired = (value: any) => typeof value !== 'undefined' && value !== null && value !== ''; // is Required;
export const isInRange = curry((min: number, max: number, value: number) => value <= max && value >= min);
export const isValidZIP = (value: string) => (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
export const isValidPhone = (value: string = '') => value.replace(/[^0-9]/g, '').length === 7 || value.replace(/[^0-9]/g, '').length > 9;
export const isValidEmail = (value: string) => (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).test(value);

/**
 * determines if a date is valid
 * @param {*} param - date to check
 * @returns {boolean} is valid
 */
export const isValidDate = (param: any): boolean => (new Date(param || 'invalid')).toString() !== 'Invalid Date';
export const isValidHexColor = (value: string) => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
export const isValidTime = (param: any = ''): boolean => {
    const hours = Number(param.split(':')[0]);
    const minutes = Number(param.split(':')[1]);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};