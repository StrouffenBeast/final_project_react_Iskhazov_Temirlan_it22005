import { DELETE_USER } from './dataActionTypes';

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    payload: userId,
});