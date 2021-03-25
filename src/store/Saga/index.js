import { takeEvery, all } from 'redux-saga/effects';
import { deleteQueueSaga, getQueueApiCallSaga, editQueueApiCallSaga, createQueueApiCallSaga } from './queueSaga';
import * as actions from '../actions/actionTypes'


export function* watchOut() {
    yield all([
        takeEvery(actions.QUEUE_DELETE_INITIATED, deleteQueueSaga),
        takeEvery(actions.QUEUE_GET_INITIATED, getQueueApiCallSaga),
        takeEvery(actions.QUEUE_EDIT_INITIATED, editQueueApiCallSaga),
        takeEvery(actions.QUEUE_SAVE_INITIATED, createQueueApiCallSaga)
    ])
}