import { fetch } from 'cross-fetch';

export const REQUEST_COOKIES = () => ({
    type: 'REQUEST_COOKIES',
});

export const RECEIVE_COOKIES = (cookies) => ({
    type: 'RECEIVE_COOKIES',
    cookies
})


export const SIGNING_IN = (email, password) => ({
    type: 'SIGN_IN',
    email,
    password
});

export const signOut = () => ({
    type: 'SIGN_OUT'
});

export function getCookiesAsync() {
    return function (dispatch) {
        dispatch(REQUEST_COOKIES());

        return fetch('https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx')
            .then(
                response => response.headers,
                error => console.log('error', error)
            )
            .then(function (headers) {
                const cookies = headers.map['set-cookie'];
                alert(cookies);
                dispatch(RECEIVE_COOKIES(cookies));
            })
    }
}