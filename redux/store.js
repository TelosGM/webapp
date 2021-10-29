import { createStore } from 'redux';

const INITIALSTATE = {
    profileData: {}
}

const dispatchRedux = (state = INITIALSTATE, actions) => {
    switch (actions.type) {
        case 'PROFILE_DATA':
            return {
                ...state,
                profileData: actions.data
            }

        default:
            return state;
    }
}

export const store = createStore(dispatchRedux);