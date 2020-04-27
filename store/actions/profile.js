import { fetch } from 'cross-fetch';
import { build } from 'search-params'
import { getHiddenFields } from './transport';
import HTMLParser, { parse } from 'fast-html-parser';
import * as Keychain from 'react-native-keychain';

export const SIGNING_IN = (email, password) => ({ type: 'SIGNING_IN', email, password });

export const SIGNING_ERROR = (text) => ({ type: 'SIGNING_ERROR', text });

export const SELECTING_ADDRESS = (selected) => ({ type: 'SELECTING_ADDRESS', selected });

export const DELETING_ADDRESS = (deleted) => ({ type: 'DELETING_ADDRESS', deleted });

export const SIGNED_IN = (user) => ({ type: 'SIGNED_IN', user });

export const SIGN_OUT = () => ({ type: 'SIGN_OUT' });

export const REQUEST_PROFILE = () => ({ type: 'REQUEST_PROFILE' });

export const RECEIVE_PROFILE = (profile) => ({ type: 'RECEIVE_PROFILE', profile })

export function signIn(email, password) {
    console.log('signIn');
    return function (dispatch, getState) {
        dispatch(SIGNING_IN(email, password));

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx',
            {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': getState().transport.cookies.value
                }
            }
        )
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(response => {
                getHiddenFields(dispatch, response);
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

export function getProfile() {
    return function (dispatch, getState) {
        dispatch(REQUEST_PROFILE());

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/Profile.aspx',
            {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': getState().transport.cookies.value
                }
            }
        )
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(
                response => {
                    getHiddenFields(dispatch, response);
                    const params = build({
                        'ToolkitScriptManager1': 'UpdatePanel1|BtnPersonalData',
                        'ToolkitScriptManager1_HiddenField': '',
                        '__EVENTTARGET': 'BtnPersonalData',
                        '__EVENTARGUMENT': '',
                        '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
                        '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
                        '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION,
                        '__ASYNCPOST': true
                    });

                    return fetch(
                        'https://webservices.belpost.by/PersonalCabinet/Profile.aspx',
                        {
                            method: 'POST',
                            body: params,
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 Edg/81.0.416.64',
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Cookie': getState().transport.cookies.value
                            }
                        })
                }
            )
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (response) {
                getHiddenFields(dispatch, response);
                const profile = parseProfile(response);
                return dispatch(RECEIVE_PROFILE(profile));
            })
            .catch(function (err) {
                console.error(err);
            })
    }
}

export function signOut() {
    return function (dispatch) {
        Keychain.resetGenericPassword();
        dispatch(SIGN_OUT());
    }
}

function parseProfile(data) {
    const html = data ? HTMLParser.parse(data) : null;
    let profile = {};
    const lastNameInput = html.querySelector(`#PersonalPanel #TxtLName`),
        firstNameInput = html.querySelector(`#PersonalPanel #TxtFName`),
        middleNameIntput = html.querySelector(`#PersonalPanel #TxtMName`),
        emailInput = html.querySelector(`#PersonalPanel #TxtEmail`),
        phoneInput = html.querySelector(`#PersonalPanel #TxtPhone`),
        mobileOperatorInput = html.querySelectorAll(`#PersonalPanel #DDLOper option`);
    if (lastNameInput) profile.lastName = lastNameInput.attributes.value;
    if (firstNameInput) profile.firstName = firstNameInput.attributes.value;
    if (middleNameIntput) profile.middleName = middleNameIntput.attributes.value;
    if (emailInput) profile.email = emailInput.attributes.value;
    if (phoneInput) profile.phoneNumer = phoneInput.attributes.value;
    if (mobileOperatorInput && mobileOperatorInput.length) profile.mobileOperators = mobileOperatorInput.map(operator => ({ value: operator.attributes.value, selected: !!operator.attributes.selected }));
    return profile;
}