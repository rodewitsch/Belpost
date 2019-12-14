import { fetch } from 'cross-fetch';
import { build } from 'search-params'
import HTMLParser from 'fast-html-parser';
import { getHiddenFields } from './transport';
import moment from 'moment';

export const REQUEST_TRACKS = () => ({
    type: 'REQUEST_TRACKS',
});

export const RECEIVE_TRACKS = (tracks) => ({
    type: 'RECEIVE_TRACKS',
    tracks
})

export const REQUEST_TRACK_HISTORY = () => ({
    type: 'REQUEST_TRACK_HISTORY',
});

export const RECEIVE_TRACK_HISTORY = (index, history) => ({
    type: 'RECEIVE_TRACK_HISTORY',
    index,
    history
})


export function getTracks() {

    return function (dispatch, getState) {
        console.log('getTracks', getState());
        dispatch(REQUEST_TRACKS());
        const params = build({
            'ToolkitScriptManager1': 'UpdatePanel2|LinkBtnSearch',
            '__EVENTTARGET': 'LinkBtnSearch',
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION
        });

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx',
            {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                    'Cookie': getState().transport.cookies.value
                }
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (data) {
                getHiddenFields(dispatch, data);
                const tracks = parseTracks(data);
                dispatch(RECEIVE_TRACKS(tracks));
            })
            .catch(function (err) {
                console.error(err);
            })
    }
}

export function getTrackHistory(trackIndex) {
    console.log('getTrackHistory');
    return function (dispatch, getState) {
        dispatch(REQUEST_TRACK_HISTORY());
        const params = build({
            'ToolkitScriptManager1': `UpdatePanel5|LBtn${trackIndex}`,
            '__EVENTTARGET': `LBtn${trackIndex}`,
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION
        });

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx',
            {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                    'Cookie': getState().transport.cookies.value
                }
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (data) {
                const html = data ? HTMLParser.parse(data) : null;
                getHiddenFields(dispatch, data);
                let history = [];
                const rows = html.querySelectorAll(`#Panel2 tr`);
                history = rows
                    .filter(row => row.childNodes[1].text.trim() != 'Дата')
                    .map((row, index) => {
                        return {
                            id: `${index}`,
                            date: moment(row.childNodes[1].text.trim(), 'DD.MM.YYYY'),
                            event: row.childNodes[2].text.trim(),
                            office: row.childNodes[3].text.trim()
                        };
                    })
                    .sort((a, b) => a.date.isBefore(b.date) ? -1 : 1)
                // console.log(history);
                dispatch(RECEIVE_TRACK_HISTORY(trackIndex, history));
            })
    }
}

export function addTrack(name, track) {

    return function (dispatch, getState) {
        console.log('addTrack', {
            'ToolkitScriptManager1': 'UpdatePanel5|BtnSearch',
            'TxtNumPos': track,
            'TxtKom': name,
            'BtnSearch': 'Сохранить',
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION
        });
        dispatch(REQUEST_TRACKS());
        const params = build({
            'ToolkitScriptManager1': 'UpdatePanel5|BtnSearch',
            'TxtNumPos': track,
            'TxtKom': name,
            'BtnSearch': 'Сохранить',
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION
        });

        return fetch(
            'https://webservices.belpost.by/PersonalCabinet/PersonalCabinet.aspx',
            {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
                    'Cookie': getState().transport.cookies.value
                }
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (data) {
                getHiddenFields(dispatch, data);
                const tracks = parseTracks(data);
                dispatch(RECEIVE_TRACKS(tracks));
            })
            .catch(function (err) {
                console.error(err);
            })
    }
}

function parseTracks(data) {
    const html = data ? HTMLParser.parse(data) : null;
    let tracks = [];
    for (let i = 0; ; i++) {
        const track = html.querySelector(`#LBtn${i}`);
        if (!track) break;
        const openBrakeIndex = track.rawText.indexOf('('),
            closeBrakeIndex = track.rawText.indexOf(')');
        tracks.push({ track: track.rawText.substring(0, openBrakeIndex), title: track.rawText.substring(openBrakeIndex + 1, closeBrakeIndex) });
    }
    return tracks;
}