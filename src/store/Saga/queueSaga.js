import queueAxios from '../../shared/axios/axios-queue';
import * as actions from '../actions';
import { put } from 'redux-saga/effects';

export function* getQueueApiCallSaga(action) {
    try {
        const response = yield queueAxios.get('queues.json');
        const queueArry = Object.keys(response.data).map((key) => {
            const stubData = response.data[key];
            stubData.keyData = key;
            return stubData;
        });
        yield put(actions.queueGetCallSuccess(queueArry))
    } catch (error) {
        yield put(actions.queueGetCallFailure(error))
    }
}

export function* deleteQueueSaga(action) {
    try {
        const resp = yield queueAxios.delete('/queues/' + action.rowId + '.json');
        yield put(actions.queueDeleteSuccess(resp.data));
        yield put(actions.getQueueAPICall());
    } catch (error) {
        yield put(actions.queueDeleteFailure(error))
    }
}

export function* createQueueApiCallSaga(action) {
    try {
        const resp = yield queueAxios.post('queues.json', action.postData)
        yield put(actions.queueSaveSuccess(resp.data));
        yield put(actions.getQueueAPICall());
    } catch (error) {
        yield put(actions.queueSaveFailure(error))
    }
}

export function* editQueueApiCallSaga(action) {
    try {
        const resp = yield queueAxios.patch('queues/' + action.rowId + '.json', action.postData)
        yield put(actions.queueEditSuccess(resp.data));
        yield put(actions.getQueueAPICall());
    } catch (error) {
        yield put(actions.queueEditFailure(error))
    }
}