import React, {  useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Aux from '../../shared/components/Auxillary';
import axiosUsers from '../../shared/axios/axios-users';
const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const contextData = useContext(AuthContext);
    let isToken = useRef('test');
    const token = contextData.isAuth.token;
    const rowKey = useRef('');
    const buttonText = useRef('Edit');
    const [createForm, SetCreateForm] = useState({
        controls: {
            name: {
                value: ''
            },
            email: {
                value: ''
            },
            phoneNumber: {
                value: ''
            }
        },
        userTrigger: false
    });
    const dialogFuncMap = {
        'displayMaximizable': setDisplayMaximizable,
        'deleteUsersDialog': setDeleteUsersDialog
    }
    useEffect(() => {
        const dataState = { ...createForm };
        dataState.userTrigger = true;
        SetCreateForm(dataState);
    }, [])
    useEffect(() => {
        if (createForm.userTrigger) {
            axiosUsers.get('users.json?auth=' + token).then(
                (userData) => {
                    //console.log('get data' + data);
                    var tableData = Object.keys(userData.data).map(function (key) {
                        const stubData = userData.data[key];
                        stubData.keyData = key;
                        return stubData;
                    });
                    setUsersData(tableData);
                    console.log(usersData);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }, [createForm.userTrigger])

    const onClick = (name) => {
         resetForm();
        dialogFuncMap[`${name}`](true);

    }

    const resetForm = () => {
        const reset = {
            controls: {
                name: {
                    value: ''
                },
                email: {
                    value: ''
                },
                phoneNumber: {
                    value: ''
                }
            },
            userTrigger: false
        }
        SetCreateForm(reset);
    }

    const onHide = (name, type) => {
        if (type === '') {
            dialogFuncMap[`${name}`](false);
        } else if (type === 'Edit') {
            const postData = {
                name: createForm.controls.name.value,
                email: createForm.controls.email.value,
                phoneNumber: createForm.controls.phoneNumber.value,
            }
            axiosUsers.post('users.json?auth=' + token, postData).then(
                (data) => {
                    const dataState = { ...createForm };
                    dataState.userTrigger = true;
                    SetCreateForm(dataState);
                    dialogFuncMap[`${name}`](false);
                },
                (error) => {
                    console.log(error);
                    dialogFuncMap[`${name}`](false);
                }
            )
        } else if (type === 'Update') {
            const patchData = {
                name: createForm.controls.name.value,
                email: createForm.controls.email.value,
                phoneNumber: createForm.controls.phoneNumber.value,
            }
            axiosUsers.patch('/users/' + rowKey.current + '.json?auth=' + token,patchData).then(
                (data) => {
                    const dataState = { ...createForm };
                    dataState.userTrigger = true;
                    SetCreateForm(dataState);
                    dialogFuncMap[`${name}`](false);
                },
                (error) => {
                    dialogFuncMap[`${name}`](false);
                    console.log("error")
                }
            )
        }

    }

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }
    const deleteSelectedUsers = () => {
        axiosUsers.delete('/users/' + rowKey.current + '.json?auth=' + token).then(
            (data) => {
                const dataState = { ...createForm };
                dataState.userTrigger = true;
                SetCreateForm(dataState);
                dialogFuncMap['deleteUsersDialog'](false);
            },
            (error) => {
                console.log("error")
            }
        )
    }



    const editRow = (rowData, name) => {
        //console.log("istoken"+istoken);
        rowKey.current = rowData.keyData;
        buttonText.current = 'Update'
        const formData = { ...createForm };
        const formControls = { ...formData.controls }
        formControls.name.value = rowData.name;
        formControls.email.value = rowData.email;
        formControls.phoneNumber.value = rowData.phoneNumber;
        formData.userTrigger = false;
        SetCreateForm(formData);
        dialogFuncMap[`${name}`](true);
    }

    const deleteRow = (rowData, name) => {
        isToken.current = 'Delete';
        const dataState = { ...createForm };
        dataState.userTrigger = false;
        SetCreateForm(dataState);
        rowKey.current = rowData.keyData
        dialogFuncMap[`${name}`](true);
    }

    const inputFormHandler = (value, type) => {
        const formData = { ...createForm };
        const formData1 = { ...formData.controls };
        const formTypeData = { ...formData1[type] };
        formTypeData.value = value;
        formData1[type] = formTypeData;
        formData.controls = formData1;
        SetCreateForm(formData);
    }
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={() => onHide(name, '')} className="p-button-text" />
                { buttonText.current === 'Edit' ? <Button label="Create" icon="pi pi-check" onClick={() => onHide(name, 'Edit')} autoFocus />
                    : <Button label="Update" icon="pi pi-check" onClick={() => onHide(name, 'Update')} autoFocus />}

            </div>
        );
    }
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
            <Button label="Delete" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
        </React.Fragment>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editRow(rowData, 'displayMaximizable')} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteRow(rowData, 'deleteUsersDialog')} />
            </React.Fragment>
        );
    }
    return (
        <Aux>
            <Button label="Create" onClick={() => onClick('displayMaximizable')} />
            <Dialog header="Header" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable', '')}>
                <h5>Name</h5>
                <InputText value={createForm.controls.name.value} onChange={(e) => inputFormHandler(e.target.value, 'name')} />
                <h5>Email</h5>
                <InputText value={createForm.controls.email.value} onChange={(e) => inputFormHandler(e.target.value, 'email')} />
                <h5>Phone Number</h5>
                <InputText value={createForm.controls.phoneNumber.value} onChange={(e) => inputFormHandler(e.target.value, 'phoneNumber')} />
            </Dialog>
            <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
            <div className="card">
                <DataTable value={usersData}>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </Aux>

    )
}


export default Users;