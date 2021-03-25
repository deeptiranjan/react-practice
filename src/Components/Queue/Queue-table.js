import React, { Component } from 'react';
import Aux from '../../shared/components/Auxillary';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';

class QueueTable extends Component {
    rowId = '';
    constructor(props) {
        super(props);
        console.log("Child Queue constructor");
        this.state = { deleteQueueDialog: false };
    }
    static getDerivedStateFromProps(props, state) {
        console.log("Child Queue stateDerivedFromProps", props + 'state', state);
        return true;
    }

    componentDidMount() {
        console.log("Child queue component Did Mount");
    }
    shouldComponentUpdate(nextProps,nextState) {
        console.log("Child queue component should update",nextProps,nextState);
        if(nextProps.queueUpdate){
            return true;
        }else{
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Child queue get snapshot", prevProps + 'state', prevState);
        return null;
    }
    componentDidUpdate() {
        console.log("Child Queue component did update");
    }

    componentWillUnmount() {
        console.log("Child queue component will unMount");
    }

    hideDeleteQueuesDialog = () => {
        this.setState({
            deleteQueueDialog : false
        })
    }
    deleteSelectedQueues = () => {
        this.setState({
            deleteQueueDialog : false
        });
        this.props.deleteApiCall(this.rowId);
       // this.props.queueChange();
    }
    editRow = (data, type) => {
        this.props.selectChange(data,type,'edit');
    }
    deleteRow = (data, type) => {
        this.rowId = data.keyData;
        this.setState({
            deleteQueueDialog : true
        })
    }

    deleteQueueDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteQueuesDialog} />
            <Button label="Delete" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedQueues} />
        </React.Fragment>
    );
    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editRow(rowData, 'displayMaximizable')} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.deleteRow(rowData, 'deleteQueueDialog')} />
            </React.Fragment>
        );
    }
    render() {
        console.log("Child  component rendered");
        return (
            <Aux>
                <Dialog visible={this.state.deleteQueueDialog} style={{ width: '450px' }} header="Confirm" modal footer={this.deleteQueueDialogFooter} onHide={this.hideDeleteQueuesDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {<span>Are you sure you want to delete the selected Queue?</span>}
                    </div>
                </Dialog>
             <div className="card">
                    <DataTable value={this.props.queueData}>
                        <Column field="name" header="Queue Name"></Column>
                        <Column field="users" header="Users"></Column>
                        <Column field="owner" header="Owner"></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </Aux>

        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        deleteApiCall : (rowId) => dispatch(actions.queueDeleteAction(rowId))
    }
}

export default connect(null,mapDispatchToProps) (QueueTable);