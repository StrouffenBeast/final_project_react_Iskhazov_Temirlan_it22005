import { DELETE_USER } from './dataActionTypes';

const initialState = {
    users: [],
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER:
            const updatedUsers = state.users.filter((user) => user.id !== action.payload);
            return {
                ...state,
                users: updatedUsers,
            };
        default:
            return state;
    }
};

export default dataReducer;