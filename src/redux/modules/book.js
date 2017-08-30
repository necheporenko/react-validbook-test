const LOAD_BOOKTREE = 'LOAD_BOOKTREE';
const LOAD_BOOKTREE_SUCCESS = 'LOAD_BOOKTREE_SUCCESS';
const LOAD_BOOKTREE_FAIL = 'LOAD_BOOKTREE_FAIL';
const SHOW_BOOK = 'SHOW_BOOK';
const SHOW_BOOK_SUCCESS = 'SHOW_BOOK_SUCCESS';
const SHOW_BOOK_FAIL = 'SHOW_BOOK_FAIL';
const SHOW_NEXT_BOOK = 'SHOW_NEXT_BOOK';
const SHOW_NEXT_BOOK_SUCCESS = 'SHOW_NEXT_BOOK_SUCCESS';
const SHOW_NEXT_BOOK_FAIL = 'SHOW_NEXT_BOOK_FAIL';
const CREATE_BOOK = 'CREATE_BOOK';
const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
const CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL';
const EDIT_BOOK = 'EDIT_BOOK';
const EDIT_BOOK_SUCCESS = 'EDIT_BOOK_SUCCESS';
const EDIT_BOOK_FAIL = 'EDIT_BOOK_FAIL';
const MOVE_BOOK = 'MOVE_BOOK';
const MOVE_BOOK_SUCCESS = 'MOVE_BOOK_SUCCESS';
const MOVE_BOOK_FAIL = 'MOVE_BOOK_FAIL';
const GET_ARR_CHECKBOX = 'GET_ARR_CHECKBOX';
const LIKE_STORY = 'LIKE_STORY';
const LIKE_STORY_SUCCESS = 'LIKE_STORY_SUCCESS';
const LIKE_STORY_FAIL = 'LIKE_STORY_FAIL';
const UPLOAD_BOOK_COVER = 'UPLOAD_BOOK_COVER';
const UPLOAD_BOOK_COVER_SUCCESS = 'UPLOAD_BOOK_COVER_SUCCESS';
const UPLOAD_BOOK_COVER_FAIL = 'UPLOAD_BOOK_COVER_FAIL';
const CLEAR_BOOKSTORIES = 'CLEAR_BOOKSTORIES';
const CLEAR_BOOKTREE = 'CLEAR_BOOKTREE';
// const SAVE_CURRENT_BOOK_SLUG = 'SAVE_CURRENT_BOOK_SLUG';

const initialState = {
  bookTreeArr: [],
  bookStories: [],
  arrCheckbox: [],
  loaded: {
    loadedBookTree: false,
    loadedBookStories: false,
  },
  pagination: 1,
  uploading: false,
  bookPage: {},
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKTREE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOKTREE_SUCCESS:
      let loaded = Object.assign({}, state.loaded, {
        loadedBookTree: true,
      });

      return {
        ...state,
        loading: false,
        loaded,
        bookTreeArr: action.result.data,
        pagination: 1,
        over: false,
      };
    case LOAD_BOOKTREE_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedBookTree: false,
      });

      return {
        ...state,
        loading: false,
        error: action.error,
        loaded,
        bookTreeArr: []
      };

    case SHOW_BOOK:
      return {
        ...state,
        loading: {
          loadingBookStories: true
        },
        // bookStories: [],
      };
    case SHOW_BOOK_SUCCESS:
      loaded = Object.assign({}, state.loaded, {
        loadedBookStories: true,
      });

      return {
        ...state,
        loaded,
        // book_slug: action.book_slug,
        bookPage: {
          name: action.result.data.name,
          description: action.result.data.description,
        },
        book_slug: action.book_slug,
        bookStories: action.result.data.stories,
        bookSettings: action.result.data.settings,
      };
    case SHOW_BOOK_FAIL:
      loaded = Object.assign({}, state.loaded, {
        loadedBookStories: false,
      });

      return {
        ...state,
        loaded,
        error: action.error,
        bookStories: []
      };

    case SHOW_NEXT_BOOK:
      return {
        ...state
      };
    case SHOW_NEXT_BOOK_SUCCESS:
      return {
        ...state,
        over: action.result.data.stories.length === 0 && true,
        bookStories: [...state.bookStories, ...action.result.data.stories],
        pagination: action.page + 1
      };
    case SHOW_NEXT_BOOK_FAIL:
      return {
        ...state
      };

    case CREATE_BOOK:
      return {
        ...state,
        creating: true
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
      };
    case CREATE_BOOK_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
      };

    case EDIT_BOOK:
      return {
        ...state,
        editing: true
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        editing: false,
        edited: true,
      };
    case EDIT_BOOK_FAIL:
      return {
        ...state,
        editing: false,
        edited: false,
      };

    case MOVE_BOOK:
      return {
        ...state,
        moving: true,
      };
    case MOVE_BOOK_SUCCESS:
      return {
        ...state,
        moving: false,
        moved: true,
      };
    case MOVE_BOOK_FAIL:
      return {
        ...state,
        moving: false,
        moved: false,
      };

    case GET_ARR_CHECKBOX:
      const newArrCheckbox = action.checkbox.slice();
      return {
        ...state,
        arrCheckbox: newArrCheckbox
      };

    case LIKE_STORY: {
      return {
        ...state,
        liking: true
      };
    }
    case LIKE_STORY_SUCCESS: {
      const likedStory = state.bookStories.map((story) => {
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
        bookStories: likedStory
      };
    }
    case LIKE_STORY_FAIL: {
      return {
        ...state,
        liking: false,
        error: action.error,
      };
    }

    case UPLOAD_BOOK_COVER:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_BOOK_COVER_SUCCESS:
      return {
        ...state,
        uploading: false,
        bookCover: action.result.data.url,
      };
    case UPLOAD_BOOK_COVER_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error,
      };

    case CLEAR_BOOKSTORIES:
      return {
        ...state,
        bookStories: []
      };

    case CLEAR_BOOKTREE:
      loaded = Object.assign({}, state.loaded, {
        loadedBookTree: false,
      });

      return {
        ...state,
        bookTreeArr: [],
        loaded
      };

    default:
      return state;
  }
}

export function getBookSlug(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  return path.substring(path.indexOf('/books/') + 7);           //get book slug after '/books/'
}

export function clearBookStories() {
  return {
    type: CLEAR_BOOKSTORIES
  };
}

export function clearBookTree() {
  return {
    type: CLEAR_BOOKTREE
  };
}

export function load(user_slug) {
  return {
    types: [LOAD_BOOKTREE, LOAD_BOOKTREE_SUCCESS, LOAD_BOOKTREE_FAIL],
    promise: (client) => client.get('/books', { params: { user_slug }}),
  };
}

export function show(slug) {
  const book_slug = slug || '';
  return {
    types: [SHOW_BOOK, SHOW_BOOK_SUCCESS, SHOW_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { page: 1 }}),
    book_slug
  };
}

export function next(slug, page) {
  const book_slug = slug || '';
  return {
    types: [SHOW_NEXT_BOOK, SHOW_NEXT_BOOK_SUCCESS, SHOW_NEXT_BOOK_FAIL],
    promise: (client) => client.get(`/books/${book_slug}`, { params: { page }}),
    page,
    book_slug
  };
}

export function create(name, parent_slug) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.post('/books', { data: { name, parent_slug }})
  };
}

export function edit(book_slug, name, description) {
  return {
    types: [CREATE_BOOK, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAIL],
    promise: (client) => client.patch('/book', { data: { book_slug, name, description }})
  };
}

export function move(book_slug, book_parent_slug, book_before_slug) {
  return {
    types: [MOVE_BOOK, MOVE_BOOK_SUCCESS, MOVE_BOOK_FAIL],
    promise: (client) => client.post('/book/move', { data: { book_slug, book_parent_slug, book_before_slug }})
  };
}

export function getCheckboxOfBook(checkbox) {
  return {
    type: GET_ARR_CHECKBOX,
    checkbox
  };
}

export function like(story_id) {
  return {
    types: [LIKE_STORY, LIKE_STORY_SUCCESS, LIKE_STORY_FAIL],
    story_id,
    promise: (client) => client.post('/like/story', { data: { story_id }})
  };
}

export function upload(img) {
  return {
    types: [UPLOAD_BOOK_COVER, UPLOAD_BOOK_COVER_SUCCESS, UPLOAD_BOOK_COVER_FAIL],
    promise: (client) => client.post('/upload/book-cover', { data: { img }})
  };
}