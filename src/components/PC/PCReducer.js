import { DELETE_PC } from './PCActionTypes';

const initialState = {
    pces: [],
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PC:
            const updatedPC = state.pc.filter((pc) => pc.id !== action.payload);
            return {
                ...state,
                pces: updatedPC,
            };
        default:
            return state;
    }
};

export default dataReducer;