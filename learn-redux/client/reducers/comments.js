function comments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      // const i = action.index;
      // return [
      //   ...state.slice(0, i),
      //   {...state[i], likes: ++state[i].likes },
      //   ...state.slice(i + 1)
      // ];
      return state
    default:
      return state
  }
}

export default comments;
