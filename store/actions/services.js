import { fetch } from 'cross-fetch';
import { build } from 'search-params'
import HTMLParser from 'fast-html-parser';
import { getHiddenFields } from './transport';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import moment from 'moment';

FileReader.prototype.readAsArrayBuffer = function (blob) {
    if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
    this._setReadyState(this.LOADING);
    this._result = null;
    this._error = null;
    const fr = new FileReader();
    fr.onloadend = () => {
        const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
        const buffer = new ArrayBuffer(content.length);
        const view = new Uint8Array(buffer);
        view.set(Array.from(content).map(c => c.charCodeAt(0)));
        this._result = buffer;
        this._setReadyState(this.DONE);
    };
    fr.readAsDataURL(blob);
}

function atob(input) {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    do {
        enc1 = keyStr.indexOf(input.charAt(i++))
        enc2 = keyStr.indexOf(input.charAt(i++))
        enc3 = keyStr.indexOf(input.charAt(i++))
        enc4 = keyStr.indexOf(input.charAt(i++))
        chr1 = (enc1 << 2) | (enc2 >> 4)
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
        chr3 = ((enc3 & 3) << 6) | enc4
        output = output + String.fromCharCode(chr1)
        if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2)
        }
        if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3)
        }
    } while (i < input.length)
    return output
}

export const REQUEST_TRACKS = () => ({ type: 'REQUEST_TRACKS' });

export const RECEIVE_TRACKS = (tracks) => ({ type: 'RECEIVE_TRACKS', tracks })

export const REQUEST_NEWS = () => ({ type: 'REQUEST_NEWS' });

export const RECEIVE_NEWS = (news) => ({ type: 'RECEIVE_NEWS', news })

export const REQUEST_TRACK_HISTORY = () => ({ type: 'REQUEST_TRACK_HISTORY' });

export const RECEIVE_TRACK_HISTORY = (index, history) => ({ type: 'RECEIVE_TRACK_HISTORY', index, history })

export const REQUEST_ARCHIVE = () => ({ type: 'REQUEST_ARCHIVE' })

export const RECEIVE_ARCHIVE = (archive) => ({ type: 'RECEIVE_ARCHIVE', archive })

export function getTracks() {
    return function (dispatch, getState) {
        dispatch(REQUEST_TRACKS());

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
            .then(
                response => {
                    getHiddenFields(dispatch, response);
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
                }
            )
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

export function getNews() {
    return function (dispatch) {
        dispatch(REQUEST_NEWS());
        return fetch('http://www.belpost.by/press-centre/news-company/')
            .then(
                response => response.arrayBuffer(),
                error => alert(error)
            )
            .then(function (data) {
                data = iconv.decode(Buffer.from(data), 'win1251').toString();
                const news = parseNews(data);
                dispatch(RECEIVE_NEWS(news));
            })
            .catch(function (err) {
                alert(err);
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

export function deleteTrack(index) {

    return function (dispatch, getState) {
        console.log('deleteTrack', {
            'ToolkitScriptManager1': `UpdatePanel5|IBtn${index}`,
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION,
            [`IBtn${index}.x`]: 10,
            [`IBtn${index}.y`]: 10
        });
        dispatch(REQUEST_TRACKS());
        const params = build({
            'ToolkitScriptManager1': `UpdatePanel5|IBtn${index}`,
            '__VIEWSTATE': getState().transport.hiddenFields.__VIEWSTATE,
            '__VIEWSTATEGENERATOR': getState().transport.hiddenFields.__VIEWSTATEGENERATOR,
            '__EVENTVALIDATION': getState().transport.hiddenFields.__EVENTVALIDATION,
            [`IBtn${index}.x`]: 10,
            [`IBtn${index}.y`]: 10
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

export function getArchive() {
    return function (dispatch, getState) {
        dispatch(REQUEST_ARCHIVE());

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
                    'ToolkitScriptManager1': `UpdatePanel2|LButnArch`,
                    '__EVENTTARGET': `LButnArch`,
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
            })
            .then(
                response => response.text(),
                error => console.log('error', error)
            )
            .then(function (data) {
                const html = data ? HTMLParser.parse(data) : null;
                getHiddenFields(dispatch, data);
                let archive = [];
                const table = html.querySelector(`#GridViewArch`);
                const rows = table.querySelectorAll('tr');
                archive = rows
                    .slice(1)
                    .map((row, index) => {
                        return {
                            id: `${index}`,
                            event: row.childNodes[1].text.trim(),
                            trackCode: row.childNodes[2].text.trim(),
                            date: moment(row.childNodes[4].text.trim(), 'DD.MM.YYYY HH:mm:ss'),
                            name: row.childNodes[5].text.trim()
                        }
                    })
                    .sort((a, b) => a.date.isBefore(b.date) ? 1 : -1)
                dispatch(RECEIVE_ARCHIVE(archive));
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

function parseNews(data) {
    const html = data ? HTMLParser.parse(data) : null;
    const newsArea = html.querySelectorAll(`div.news-div`);
    let news = [];
    for (let i = 0; i < newsArea.length; i++) {
        let newsItem = {
            image: null,
            title: null,
            date: null,
            description: null,
            link: null
        };
        const imageEl = newsArea[i].querySelector('img'),
            titleEl = newsArea[i].querySelector('.link2'),
            descriptionEl = newsArea[i].querySelector('.link2 p'),
            dateEl = newsArea[i].querySelector('.date');
        if (imageEl) newsItem.image = `http://www.belpost.by${imageEl.attributes.src}`;
        if (titleEl) {
            newsItem.title = (titleEl.childNodes[0].rawText || titleEl.childNodes[1].rawText).toUpperCase();
            newsItem.link = titleEl.childNodes[0].attributes.href;
            if (newsItem.link.indexOf('http') == -1) newsItem.link = `http://www.belpost.by${newsItem.link}`
        }
        if (descriptionEl) newsItem.description = descriptionEl.rawText;
        if (dateEl) newsItem.date = dateEl.rawText;
        news.push(newsItem);
    }
    return news;
}