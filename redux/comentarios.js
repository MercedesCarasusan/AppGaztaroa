import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      let id = state.comentarios.length;
      const nuevoComentario = {
        ...action.payload,
        id: id
      };

      return {
        ...state,
        comentarios: state.comentarios.concat(nuevoComentario)
      };


    default:
      return state;
  }
};