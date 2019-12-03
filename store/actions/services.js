import { fetch } from 'cross-fetch';
import { build } from 'search-params'
import HTMLParser from 'fast-html-parser';
import { getHiddenFields } from './transport';

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
                const html = data ? HTMLParser.parse(data) : null;
                getHiddenFields(dispatch, data);
                let tracks = [];
                for (let i = 0; ; i++) {
                    const track = html.querySelector(`#LBtn${i}`);
                    if (!track) break;
                    const openBrakeIndex = track.rawText.indexOf('('),
                        closeBrakeIndex = track.rawText.indexOf(')');
                    tracks.push({ track: track.rawText.substring(0, openBrakeIndex), title: track.rawText.substring(openBrakeIndex + 1, closeBrakeIndex) });
                }
                dispatch(RECEIVE_TRACKS(tracks));
            })
    }
}

export function getTrackHistory(trackIndex) {
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
                const item = {
                    date: rows[1].childNodes[1].text.trim(),
                    event: rows[1].childNodes[2].text.trim(),
                    office: rows[1].childNodes[3].text.trim()
                }
                // console.log(item);
                history = rows.map((row, index) => {
                    return {
                        id: `${index}`,
                        date: row.childNodes[1].text.trim(),
                        event: row.childNodes[2].text.trim(),
                        office: row.childNodes[3].text.trim()
                    };
                });
                // console.log(history);
                dispatch(RECEIVE_TRACK_HISTORY(trackIndex, history));
            })
    }
}