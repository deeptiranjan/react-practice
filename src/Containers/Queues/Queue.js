import React, { Component } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Aux from '../../shared/components/Auxillary';
import Queuetable from '../../Components/Queue/Queue-table';

import * as queueActions from '../../store/actions';
import { connect } from 'react-redux';
class Queue extends Component {
    static contextType = AuthContext;
    rowId = '';
    constructor(props) {
        super(props);
        console.log("Parent Queue constructor");
        this.buttonText = 'Create';
        this.state = {
            deleteQueueDialog: false,
            displayMaximizable: false,
        }
    }
    static getDerivedStateFromProps(props, state) {
        console.log("Parent Queue stateDerivedFromProps", props + 'state', state);
        return true;
    }

    componentDidMount() {
        console.log("parent queue component Did Mount");
        this.props.getQueueApi();
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("parent queue component should update");
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("parent queue get snapshot", prevProps + 'state', prevState);
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        //search call after the dom is updated
        console.log("parent Queue component did update");
    }

    componentWillUnmount() {
        console.log("parent queue component will unMount");
    }

    onHide = (name, type) => {
        if (type === '') {
            const stateData = {...this.state};
            stateData[name] = false;
            this.setState(stateData);
        } else {
            const postData = {
                name: this.props.queueStateData.controls.queueName.value,
                users: this.props.queueStateData.controls.users.value,
                owner: this.props.queueStateData.controls.owner.value,
            }
            this.props.queueSaveData(postData, this.rowId, type);
            const stateData = {...this.state};
            stateData[name] = false;
            this.setState(stateData);
        }
    }
    inputFormHandler = (value, type) => {
        this.props.inputChange(type, value)
    }
    onClickAction = (rowData, type, clickType) => {
        if (clickType === 'edit') {
            this.rowId = rowData.keyData;
            this.buttonText = "Update";
            this.props.editLoad(rowData);
        } else {
            this.buttonText = "Create";
            this.props.editLoadReset();
        }
        const stateData = {...this.state};
        stateData[type] = true;
        this.setState(stateData);
    }
    renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => this.onHide('displayMaximizable', '')} className="p-button-text" />
                { this.buttonText === 'Create' ? <Button label="Create" icon="pi pi-check" onClick={() => this.onHide('displayMaximizable', 'Create')} autoFocus />
                    : <Button label="Update" icon="pi pi-check" onClick={() => this.onHide('displayMaximizable', 'Update')} autoFocus />}
            </div>
        );
    }

    render() {
        console.log("Parent queue is renderd");

        return (
            <Aux>
                <Button label="Create" onClick={() => this.onClickAction('', 'displayMaximizable', '')} />
                <Dialog header="Header" visible={this.state.displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={this.renderFooter('displayMaximizable')} onHide={() => this.onHide('displayMaximizable', '')}>
                    <h5>Queue Name</h5>
                    <InputText value={this.props.queueStateData.controls.queueName.value} onChange={(e) => this.inputFormHandler(e.target.value, 'queueName')} />
                    <h5>Users</h5>
                    <InputText value={this.props.queueStateData.controls.users.value} onChange={(e) => this.inputFormHandler(e.target.value, 'users')} />
                    <h5>Owner</h5>
                    <InputText value={this.props.queueStateData.controls.owner.value} onChange={(e) => this.inputFormHandler(e.target.value, 'owner')} />
                </Dialog>
                <Queuetable queueData={this.props.queueStateData.queuesData}
                    queueUpdate={this.props.queueStateData.queueTrigger}
                    selectChange={this.onClickAction}
                    queueChange={this.getQueues}></Queuetable>
            </Aux>

        )
    }
}
const mapToProps = (state) => {
    return {
        queueStateData: state.queueState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQueueApi: () => dispatch(queueActions.getQueueAPICall()),
        inputChange: (type, value) => dispatch(queueActions.queueInputChange(type, value)),
        editLoad: (rowData) => dispatch(queueActions.queueRowEdit(rowData)),
        editLoadReset: () => dispatch(queueActions.queuePopInitial()),
        queueSaveData: (postData, rowId, type) => dispatch(queueActions.queueEditUpdateAction(postData, rowId, type))
    }
}
export default connect(mapToProps, mapDispatchToProps)(Queue);