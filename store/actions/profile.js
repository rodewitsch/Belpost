import { fetch } from 'cross-fetch';
import { build } from 'search-params'
import { getHiddenFields } from './transport';
import * as Keychain from 'react-native-keychain';

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

export function signIn(email, password) {
    console.log('signIn');
    return function (dispatch, getState) {
        dispatch(SIGNING_IN(email, password));

        const params = build({
            'ToolkitScriptManager1_HiddenField': ';;AjaxControlToolkit, Version=3.5.7.429, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:776e8b41-f645-445e-b0a0-73e096383cec:f2c8e708:de1feab2:720a52bf:f9cec9bc:589eaa30:a67c2700:ab09e3fe:87104b7c:8613aea7:3202a5a2:be6fb298',
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION,
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
                    'Cookie': getState().transport.cookies.value
                }
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (user) {
                const userName = (user.match(/<span id="LblEnter"><b>Здравствуйте, (.*)<\/b><\/span>/) || [])[1];
                getHiddenFields(dispatch, user);
                if (userName) {
                    Keychain.setGenericPassword(email, password);
                    return dispatch(SIGNED_IN(userName));
                }
                Keychain.resetGenericPassword();
                dispatch(SIGNING_ERROR('Ошибка авторизации'));
                dispatch(SIGN_OUT());
            })
            .catch(function (err) {
                Keychain.resetGenericPassword();
                dispatch(SIGNING_ERROR(err));
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