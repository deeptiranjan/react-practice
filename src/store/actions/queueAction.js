import * as actions from './actionTypes';

export const queueSaveSuccess = (successData) => {
    return {
        type: actions.QUEUE_SAVED_SUCCESS,
        data: successData
    }
}

export const queueSaveFailure = (errorData) => {
    return {
        type: actions.QUEUE_SAVED_FAILED,
        error: errorData
    }
}

export const queueEditSuccess = (successData) => {
    return {
        type: actions.QUEUE_EDITED_SUCCESS,
        data: successData
    }
}

export const queueEditFailure = (errorData) => {
    return {
        type: actions.QUEUE_EDITED_FAILED,
        error: errorData
    }
}


export const queueDeleteSuccess = (successData) => {
    return {
        type: actions.QUEUE_DELETED_SUCCESS,
        data: successData
    }
}

export const queueDeleteFailure = (errorData) => {
    return {
        type: actions.QUEUE_DELETED_FAILED,
        error: errorData
    }
}


export const queueGetCallSuccess = (successData) => {
    return {
        type: actions.QUEUE_GET_CALL_SUCCESS,
        data: successData
    }
}

export const queueGetCallFailure = (errorData) => {
    return {
        type: actions.QUEUE_GET_CALL_FAILED,
        error: errorData
    }
}

export const queueInputChange = (ingType, inpValue) => {
    return {
        type: actions.QUEUE_INPUT_ACTION,
        inpType: ingType,
        inpValue: inpValue
    }
}

export const queueRowEdit = (rowData) => {
    return {
        type: actions.QUEUE_ROW_EDIT,
        rowData: rowData
    }
}

export const queuePopInitial = () => {
    return {
        type: actions.QUEUE_POP_INITIAL,
    }
}

export const queueEditUpdateAction = (postData, rowId, type) => {

    if (type === 'Create') {
        return {
            type: actions.QUEUE_SAVE_INITIATED,
            postData : postData
        }
    } else if (type === 'Update') {
        return {
            type: actions.QUEUE_EDIT_INITIATED,
            postData : postData,
            rowId: rowId
        }
    }
}


export const queueDeleteAction = (rowId) => {
    return {
        type: actions.QUEUE_DELETE_INITIATED,
        rowId: rowId
    }
}

export const getQueueAPICall = () => {
    return {
        type: actions.QUEUE_GET_INITIATED
    }
}
