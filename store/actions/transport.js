import { fetch } from 'cross-fetch';
import HTMLParser from 'fast-html-parser';

export const REQUEST_COOKIES = () => ({
    type: 'REQUEST_COOKIES',
});

export const RECEIVE_COOKIES = (cookies) => ({
    type: 'RECEIVE_COOKIES',
    cookies
})

export const SET_HIDDEN_FIELDS = (fields) => ({
    type: 'SET_HIDDEN_FIELDS',
    fields
});

export function getCookiesAsync() {
    console.log('getCookiesAsync');
    return function (dispatch) {
        dispatch(REQUEST_COOKIES());

        return fetch('https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx')
            .then(
                response => Promise.all([response.headers, response.text()]),
                error => console.log('error', error)
            )
            .then(function ([headers, text]) {
                const cookies = headers.map['set-cookie'];
                getHiddenFields(dispatch, text);
                dispatch(RECEIVE_COOKIES(cookies));
            })
    }
}

export function getHiddenFields(dispatch, html) {

    console.log('getHiddenFields');

    const HTML = HTMLParser.parse(html);
    let __VIEWSTATE, __EVENTVALIDATION, __VIEWSTATEGENERATOR;

    const __VIEWSTATE_ID = HTML.querySelector('#__VIEWSTATE');
    if (__VIEWSTATE_ID) __VIEWSTATE = __VIEWSTATE_ID.attributes.value;

    const __EVENTVALIDATION_ID = HTML.querySelector('#__EVENTVALIDATION');
    if (__EVENTVALIDATION_ID) __EVENTVALIDATION = __EVENTVALIDATION_ID.attributes.value;

    const __VIEWSTATEGENERATOR_ID = HTML.querySelector('#__VIEWSTATEGENERATOR');
    if (__VIEWSTATEGENERATOR_ID) __VIEWSTATEGENERATOR = __VIEWSTATEGENERATOR_ID.attributes.value;

    dispatch(SET_HIDDEN_FIELDS({ __VIEWSTATE, __EVENTVALIDATION, __VIEWSTATEGENERATOR }));
}