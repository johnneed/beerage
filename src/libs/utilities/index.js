// @flow
import {isNil} from 'ramda';

export const formatPhone = (phone: any): string => (phone || '').toString().replace(/[^\d]/g, '');
export const safeSetSessionStorage = (key, value) => isNil(value) ? window.sessionStorage.removeItem(key) : window.sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
export const toUpper = (str: string) => str.toLowerCase().split(' ').map(word => (word[0].toUpperCase() + word.substr(1))).join(' ');
export const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen || docEl.requestFullscreen || (() => {
    });
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
};
export const isMobilesafari = () => (/iP(ad|hone|od).+Version\/[\d.]+.*Safari/i).test(navigator.userAgent);

// gets query string parameter values
export const getUrlParameter = (name: string) => {
    const regex = new RegExp(`[\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


// TODO: Refactor the following two functions to a single search function using mutual recursion.

// filters a data hash
export const filterHash = (data: Object, query: string) => Object.entries(data)
    .filter(datum => {
            switch (typeof datum[1]) {
                case 'string' :
                    return !query || datum[1].toLowerCase().indexOf(query.toLowerCase()) !== -1;
                case 'number' :
                    return !query || datum[1].toString().indexOf(query.toLowerCase()) !== -1;
                case 'object' :
                    return !query || Object.values(datum[1]).reduce((found, value) => filterHash(value, query) || found, false);
                default:
                    return false;
            }
        }
    )
    .reduce((obj, item) => ({...obj, [item[0]]: item[1]}), {});

// filters a data array
export const search = (data: Array<Object>, query: string) => (Array.isArray(data) ? data : [])
    .filter(datum => {
            switch (typeof datum) {
                case 'string' :
                    return !query || datum.toLowerCase().indexOf(query.trim().toLowerCase()) !== -1;
                case 'number' :
                    return !query || datum.toString().indexOf(query.trim().toLowerCase()) !== -1;
                case 'object' :
                    return !datum ? false : !query || search(Object.values(datum), query.trim()).length > 0;
                default:
                    return false;
            }
        }
    );