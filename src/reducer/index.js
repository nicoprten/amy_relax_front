const initialState = {
    schedules: [],
    user: JSON.parse(localStorage.getItem('user')),
    reservation: {}
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'SCHEDULES':
            return{
                ...state,
                schedules: action.payload
            };
        case 'LOG_IN':
            return{
                ...state,
                user: action.payload
            };
        case 'LOG_OUT':
            return{
                ...state,
                user: null
            };
        case 'SET_RESERVATION':
            console.log(action.payload)
            return{
                ...state,
                reservation: action.payload
            };
        default:
            return state;
    }
}