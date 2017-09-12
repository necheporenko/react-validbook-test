const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
const CREATE_DOCUMENT_FAIL = 'CREATE_DOCUMENT_FAIL';
const GET_BOX_TREE = 'GET_BOX_TREE';
const GET_BOX_TREE_SUCCESS = 'GET_BOX_TREE_SUCCESS';
const GET_BOX_TREE_FAIL = 'GET_BOX_TREE_FAIL';
const GET_BOX = 'GET_BOX';
const GET_BOX_SUCCESS = 'GET_BOX_SUCCESS';
const GET_BOX_FAIL = 'GET_BOX_FAIL';
const CREATE_BOX = 'CREATE_BOX';
const CREATE_BOX_SUCCESS = 'CREATE_BOX_SUCCESS';
const CREATE_BOX_FAIL = 'CREATE_BOX_FAIL';

const initialState = {
  documents: [],
  boxes: [],
  box: {},
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOX_TREE:
      return {
        ...state,
      };
    case GET_BOX_TREE_SUCCESS:
      return {
        ...state,
        boxes: action.result.data,
      };
    case GET_BOX_TREE_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case GET_BOX:
      return {
        ...state,
      };
    case GET_BOX_SUCCESS:
      return {
        ...state,
        box: action.result.data,
      };
    case GET_BOX_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case CREATE_BOX:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOX_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_BOX_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    case CREATE_DOCUMENT:
      return {
        ...state,
        creating: true
      };
    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_DOCUMENT_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error,
      };

    default:
      return state;
  }
}


export function createDocument(name, parent_slug) {
  return {
    types: [CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAIL],
    promise: (client) => client.post('/documents', {data: {name, parent_slug}})
  };
}

export function createBox(name, parent_slug) {
  return {
    types: [CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAIL],
    promise: (client) => client.post('/boxes', {data: {name, parent_slug}})
  };
}

export function load(user_slug) {
  return {
    types: [GET_BOX_TREE, GET_BOX_TREE_SUCCESS, GET_BOX_TREE_FAIL],
    promise: (client) => client.get('/boxes', {params: {user_slug}}),
  };
}

export function getBox(box_slug) {
  return {
    types: [GET_BOX, GET_BOX_SUCCESS, GET_BOX_FAIL],
    promise: (client) => client.get(`/boxes/${box_slug}`),
  };
}
