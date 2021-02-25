import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addSeason(action) {
    const farm_id = action.payload.farm_id
    yield axios({
        method: 'POST',
        url: 'api/seasons',
        data: action.payload
    });
}

function* fetchSeasons(action) {
    console.log('what is the farm id in fetchseasons', action.payload);
    let response = yield axios({
        method: 'GET',
        url: 'api/seasons',
        params: action.payload
    });
    yield put({
        type: 'SET_SEASONS',
        payload: response.data,
    });
    }

function* seasonsSaga() {
    yield takeLatest("ADD_SEASON", addSeason);
    yield takeLatest("FETCH_SEASONS", fetchSeasons);
}

export default seasonsSaga;