const LOAD_SHOW_USER_STORIES = 'LOAD_SHOW_USER_STORIES';
const LOAD_SHOW_USER_STORIES_SUCCESS = 'LOAD_SHOW_USER_STORIES_SUCCESS';
const LOAD_SHOW_USER_STORIES_FAIL = 'LOAD_SHOW_USER_STORIES_FAIL';
const LOAD_NEXT_SHOW_USER_STORIES = 'LOAD_NEXT_SHOW_USER_STORIES';
const LOAD_NEXT_SHOW_USER_STORIES_SUCCESS = 'LOAD_NEXT_SHOW_USER_STORIES_SUCCESS';
const LOAD_NEXT_SHOW_USER_STORIES_FAIL = 'LOAD_NEXT_SHOW_USER_STORIES_FAIL';
const CREATE_STORY = 'CREATE_STORY';
const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';
const CLEAR_PAGINATION = 'CLEAR_PAGINATION';
const LIKE_STORY = 'LIKE_STORY';
const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
const LIKE_STORY_FAIL = 'LIKE_STORY_FAIL';
const RELOG_STORY = 'RELOG_STORY';
const RELOG_STORY_SUCCESS = 'RELOG_STORY_SUCCESS';
const RELOG_STORY_FAIL = 'RELOG_STORY_FAIL';

const initialState = {
  isAuthenticated: false,
  loaded: false,
  storiesArr: [],
  over: false,
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_SHOW_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        storiesArr: action.result.data,
      };
    case LOAD_SHOW_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: []
      };

    case LOAD_NEXT_SHOW_USER_STORIES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_SHOW_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: action.result.status === 'success' && true,       // or just true
        over: action.result.data.length === 0 && true,
        storiesArr: [...state.storiesArr, ...action.result.data],
      };
    case LOAD_NEXT_SHOW_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        storiesArr: [],
        over: true
      };

    case CREATE_STORY:
      return {
        ...state,
        creating: true
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_STORY_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case CLEAR_PAGINATION: {
      return {
        ...state,
        over: false,
      };
    }

    case LIKE_STORY: {
      return {
        ...state,
        liking: true
      };
    }
    case LIKE_STORY_SUCCESS: {
      const likedStory = state.storiesArr.map((story) => {
        if (story.id === action.story_id) {
          return {
            ...story,
            likes: action.result.data
          };
        }
        return {
          ...story
        };
      });
      return {
        ...state,
        liking: false,
        storiesArr: likedStory
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case RELOG_STORY: {
      return {
        ...state,
        reloging: true,
      };
    }
    case RELOG_STORY_SUCCESS: {
      return {
        ...state,
        reloging: false,
      };
    }
    case RELOG_STORY_FAIL: {
      return {
        ...state,
        reloging: false,
      };
    }


    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.story && globalState.story.loaded;
}

export function load(user_slug) {
  return {
    types: [LOAD_SHOW_USER_STORIES, LOAD_SHOW_USER_STORIES_SUCCESS, LOAD_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`)
  };
}

export function loadNext(user_slug, page) {
  return {
    types: [LOAD_NEXT_SHOW_USER_STORIES, LOAD_NEXT_SHOW_USER_STORIES_SUCCESS, LOAD_NEXT_SHOW_USER_STORIES_FAIL],
    promise: (client) => client.get(`/users/${user_slug}/stories`, { params: page })
  };
}

export function create(description, books) {
  return {
    types: [CREATE_STORY, CREATE_STORY_SUCCESS, CREATE_STORY_FAIL],
    promise: (client) => client.post('/stories', { data: { description, books }})
  };
}

export function like(story_id) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    story_id,
    promise: (client) => client.post('/like/story', { data: { story_id }})
  };
}

export function clearPagination() {
  return {
    type: CLEAR_PAGINATION
  };
}

export function relogStory(story_id, books) {
  return {
    types: [RELOG_STORY, RELOG_STORY_SUCCESS, RELOG_STORY_FAIL],
    promise: (client) => client.post('/story/relog', { data: { story_id, books }})
  };
}
