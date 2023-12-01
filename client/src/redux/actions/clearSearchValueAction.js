import {  
    DATEPICKER_ACTION_TYPE, 
    SEARCH_VALUES_ACTION_TYPES,
    FINE_FILTER_ACTION_TYPE,
  } from "../actions-type";


export const clearSearchValue=()=>{
    return(dispatch)=>{
    dispatch({type:SEARCH_VALUES_ACTION_TYPES.FINE_SEARCH_VALUE,payload:""})
    dispatch({type:SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE,payload:""})
    dispatch({ type: DATEPICKER_ACTION_TYPE.START_DATE, payload: '' });
    dispatch({ type: DATEPICKER_ACTION_TYPE.END_DATE, payload: '' });
    dispatch({type:FINE_FILTER_ACTION_TYPE.GET_FINE_CATEGORY,payload:""})
    }
  }