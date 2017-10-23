import {Map} from 'immutable'
import reducer from 'redux-describe'

const merge = (state = Map(), action) => state.merge(action.payload.entities)
const remove = (state = Map(), action) => state.remove(action.payload.id)
const add = (state = Map(), action) =>
  state.set(action.payload.id, action.payload.entity)

const blogPostsById =
  reducer(Map())
    .on('LOAD_BLOG_POSTS_SUCCESS').does(merge)
    .on('REMOVE_BLOG_POST').does(remove)
    .on('ADD_BLOG_POST').does(add)
    .build()

const commentsById =
  reducer(Map())
    .on('LOAD_COMMENTS_SUCCESS').does(merge)
    .on('REMOVE_COMMENT').does(remove)
    .on('ADD_COMMENT').does(add)
    .build()

export default combineReducers({
  blogPostsById,
  commentsById,
})
