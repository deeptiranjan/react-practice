import * as actions from '../actions/actionTypes';
import { produce } from 'immer'

const initialState = {
    queuesData: [],
    controls: {
        queueName: {
            value: ''
        },
        users: {
            value: ''
        },
        owner: {
            value: ''
        }
    },
    queueTrigger: false
};
const queueReducer = produce((state, action) => {
    switch (action.type) {
        case actions.QUEUE_GET_CALL_SUCCESS:
            state.queuesData = action.data;
            state.queueTrigger = true;
            return state;
        case actions.QUEUE_INPUT_ACTION:
            state.controls[action.inpType].value = action.inpValue;
            state.queueTrigger = false;
            console.log(initialState);
            return state;
        case actions.QUEUE_ROW_EDIT:
            state.controls.queueName.value = action.rowData.name;
            state.controls.users.value = action.rowData.users;
            state.controls.owner.value = action.rowData.owner;
            state.controls.queueTrigger = false;
            return state;
        case actions.QUEUE_POP_INITIAL:
            return initialState;
        default:
            return state;
    }
}, initialState);

export default queueReducer;