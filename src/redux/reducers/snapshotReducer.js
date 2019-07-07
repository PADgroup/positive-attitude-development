const snapshotReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SNAPSHOT':
            return action.payload; 
        default:
            return state;
    }
};

export default snapshotReducer;