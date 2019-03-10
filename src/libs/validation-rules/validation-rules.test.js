/* eslint no-undefined: 0 */
/* global it, beforeEach, afterEach, expect, describe, jest */


import * as rules from './validation-rules';

describe('ValidationRules', () => {
    it('validates a required value', () => {
        expect(rules.isRequired('foo')).toBe(true);
        expect(rules.isRequired(0)).toBe(true);
        expect(rules.isRequired(false)).toBe(true);
        expect(rules.isRequired(undefined)).toBe(false);
    });

    it('validates a ranged value', () => {
        expect(rules.isInRange(-1, 1, 0)).toBe(true);
        expect(rules.isInRange(0, 100, 101)).toBe(false);
    });

    it('validates a ZIP Code', () => {
        expect(rules.isValidZIP('05454')).toBe(true);
        expect(rules.isValidZIP('05454-1234')).toBe(true);
        expect(rules.isValidZIP('999999')).toBe(false);
    });

    it('validates a phone number', () => {
        expect(rules.isValidPhone('8025551234')).toBe(true);
        expect(rules.isValidPhone('802-555-5555')).toBe(true);
        expect(rules.isValidPhone('(802) 555-5555')).toBe(true);
        expect(rules.isValidPhone('(802) 555-5555 x555')).toBe(true);
        expect(rules.isValidPhone('foo')).toBe(false);
        expect(rules.isValidPhone('802-555-123')).toBe(false);
    });

    it('validates a VIN', () => {
        expect(rules.isValidVIN('3C6TR5HT0EG168018')).toBe(true);
        expect(rules.isValidVIN('3C6TR5HT0EG16801G')).toBe(false);
        expect(rules.isValidVIN('foo')).toBe(false);
    });

    it('validates an Email', () => {
        expect(rules.isValidEmail('a@example.com')).toBe(true);
        expect(rules.isValidEmail('a@example.edu')).toBe(true);
        expect(rules.isValidEmail('a.example.com')).toBe(false);
        expect(rules.isValidEmail('foo!@example.com')).toBe(true);
        expect(rules.isValidEmail('José@example.com')).toBe(true);
    });

    it('validates a Date', () => {
        expect(rules.isValidDate('Jan 20, 2009')).toBe(true);
        expect(rules.isValidDate('01-20-2009')).toBe(true);
        expect(rules.isValidDate(new Date('01-20-2009'))).toBe(true);
        expect(rules.isValidDate('The twentieth of January, two thousand seventeen')).toBe(false);
    });
});