import { fetch } from 'cross-fetch';
import { build } from 'search-params'

export const REQUEST_COOKIES = () => ({
    type: 'REQUEST_COOKIES',
});

export const RECEIVE_COOKIES = (cookies) => ({
    type: 'RECEIVE_COOKIES',
    cookies
})


export const SIGNING_IN = (email, password) => ({
    type: 'SIGNING_IN',
    email,
    password
});

export const SIGNING_ERROR = (text) => ({
    type: 'SIGNING_ERROR',
    text
});

export const SELECTING_ADDRESS = (selected) => ({
    type: 'SELECTING_ADDRESS',
    selected
});

export const DELETING_ADDRESS = (deleted) => ({
    type: 'DELETING_ADDRESS',
    deleted
});

export const SIGNED_IN = (user) => ({
    type: 'SIGNED_IN',
    user
});

export const SIGN_OUT = () => ({
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
                dispatch(RECEIVE_COOKIES(cookies));
            })
    }
}

export function signIn(email, password) {
    return function (dispatch, getState) {
        dispatch(SIGNING_IN(email, password));

        console.log(getState().profile.cookies.value);

        const params = build({
            'ToolkitScriptManager1_HiddenField': ';;AjaxControlToolkit, Version=3.5.7.429, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:776e8b41-f645-445e-b0a0-73e096383cec:f2c8e708:de1feab2:720a52bf:f9cec9bc:589eaa30:a67c2700:ab09e3fe:87104b7c:8613aea7:3202a5a2:be6fb298',
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__VIEWSTATE': '/wEPDwUKLTcxNzk0MTEwMQ9kFgICAw9kFgQCFQ9kFgJmD2QWBgIBD2QWAmYPZBYIAiEPZBYCZg9kFgQCAw9kFgJmD2QWAgJLD2QWAmYPZBYCAgEPZBYCAgEPZBYIAgMPPCsAEQIBEBYAFgAWAAwUKwAAZAIHDzwrABECARAWABYAFgAMFCsAAGQCCQ88KwARAgEQFgAWABYADBQrAABkAgsPPCsAEQEMFCsAAGQCBQ9kFgJmD2QWAgIRD2QWAgIBD2QWAgIHDzwrABECARAWABYAFgAMFCsAAGQCJQ9kFgJmD2QWAgIBD2QWAmYPZBYCAhcPZBYCAgEPPCsACQBkAjcPZBYCZg9kFgICAQ88KwARAgEQFgAWABYADBQrAABkAjkPZBYCZg9kFgICEQ88KwARAgEQFgAWABYADBQrAABkAgMPZBYCZg9kFgICAQ8QZGQWAGQCBQ9kFgJmD2QWAgIBDxBkZBYAZAIXDw8WAh4HVmlzaWJsZWdkZBgIBQhHcmlkSW5mbw9nZAUJR3JpZEluZm8wD2dkBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBAUJSUJ0bkJ1bmVyBQxJbWdCdG5Qcm9maWwFDkltZ0J0blNlcnZpY2VzBQhJQnRuRXhpdAUJR3JpZFZpZXcyD2dkBQxHcmlkSW5mb1BhcnQPZ2QFCUdyaWRWaWV3MQ9nZAUMR3JpZFZpZXdBcmNoD2dkBQpHcmlkSW5mbzAxD2dkbXDUCUXSjAZaPdZleBOwxrIGOC+UxWxDv5u8FS9wSDs=',
            '__VIEWSTATEGENERATOR': '96F07904',
            '__EVENTVALIDATION': '/wEdAAyhqaWi/nKBown+L2uhuyVux+ul7AJ7xT3xsYbt5iMGXa+3mwHLnFwS+M756+XlsbYzqCkN5uSWlxQ1kezK7M1IL77sbKP0DRTnfZ5hwrxSLJAYFr+T8yjNKLBqcbOH7DgHOt8lyy1apjx+DzzJoJkTJFRn1SJNuBzTeXlr/MzB2U7uKdRv19MkMMOkiPrcQPB/KtR1XH22gZ/sqt3l4AwJUF+PS1mjiaybKB6YJuC0qT9YyyR4qjX0bKJ2X6bXV1NGgQCu12y6c3CcXMPSwx2YyBIVJdGJDFwr04pIDBPDWw==',
            'TxtLogin': email,
            'TxtPass': password,
            'BtnEnter': 'Войти'
        });

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx',
            {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': getState().profile.cookies.value
                }
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (user) {
                const userName = (user.match(/<span id="LblEnter"><b>Здравствуйте, (.*)<\/b><\/span>/) || [])[1];
                if (userName) return dispatch(SIGNED_IN(userName));
                dispatch(SIGNING_ERROR('Ошибка авторизации'));
                dispatch(SIGN_OUT());
            })
    }
}

export function selectAddress(selectedItem) {
    return function (dispatch) {
        dispatch(SELECTING_ADDRESS(selectedItem));
    }
}

export function deleteAddress(deletedItem) {
    return function (dispatch) {
        dispatch(DELETING_ADDRESS(deletedItem));
    }
}