import * as types from "./actionType";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blue-journalist-bbrpv.ineuron.app:4000/',
});

const getUsers = (users: any) => ({
    type: types.GET_USERS,
    payload: users
});

const userDeleted = () => ({
    type: types.DELETE_USERS 
});

const userAdded = () => ({
    type: types.ADD_USERS 
});

const userUpdated = () => ({
    type: types.UPDATE_USERS 
});

const getUserDetail = (user: any) => ({
    type: types.GET_DETAIL_USERS, 
    payload: user
});


export const loadUsers = () => {
    return function (dispatch: any) {
        instance
            .get(`users`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUsers(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const deleteUsers = (id:any) => {
    return function (dispatch: any) {
        instance
            .delete(`user/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const addUsers = (user:any) => {
    return function (dispatch:any) {
        instance
            .post(`user/create`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userAdded());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const getDetailUsers = (id:any) => {
    console.log("get detail78: ", id)
    return function (dispatch:any) {
        instance
            .get(`user/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUserDetail(resp.data.data));
            })
            .catch((error) => console.log(error));
    };
};

export const updateUsers = (user:any, id:any) => {
    return function (dispatch:any) {
        instance
            .patch(`user/${id}`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userUpdated());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};
