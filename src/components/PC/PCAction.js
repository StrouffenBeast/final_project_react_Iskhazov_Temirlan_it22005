import { DELETE_PC } from './PCActionTypes';

export const deletePC = (pcId) => ({
    type: DELETE_PC,
    payload: pcId,
});