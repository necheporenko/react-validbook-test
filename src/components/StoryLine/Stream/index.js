import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Sbox from './Sbox';
import Post from './Post';
import './index.scss';

let page;

@connect((state) => ({
  over: state.story.over,
  slug: state.sign.activeUser.slug,
}), {})

class Stream extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    console.log(page);
    page = 1;
    console.log(page);
  }

  load() {
    page++;
    if (!this.props.over) {
      console.log(this.props.slug);
      this.props.loadNextStories(this.props.slug, page);
    }
  }

  render() {
    const { storiesArr, user, activeUser } = this.props;
    // const loader = <div className="loader">Loading ...</div>;

    return (
      <div className="stream">
        {user.id === activeUser.id &&
          <Sbox
            user={this.props.user}
            createStory={this.props.createStory}
            loadStories={this.props.loadStories}
          />
        }

        <InfiniteScroll
          loadMore={this.load}
          hasMore={true}
          threshold={50}
          // loader={loader}
        >
          {storiesArr && storiesArr.map((story) => (
            <Post
              key={story.id}
              post={story.text}
              user={story.user}
              created={story.created}
              images={story.images}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

Stream.propTypes = {
  user: PropTypes.object,
  createStory: PropTypes.func,                //story
  storiesArr: PropTypes.array,
  loadStories: PropTypes.func,
  loadNextStories: PropTypes.func,
  over: PropTypes.bool,
  activeUser: PropTypes.object,
};

export default Stream;
