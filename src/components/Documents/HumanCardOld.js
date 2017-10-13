import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import {getUser} from '../../redux/modules/user';
import {getHumanCard} from '../../redux/modules/document';
import './human-card.scss';

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
  requestedUser: state.user.requestedUser,
  path: state.routing.locationBeforeTransitions.pathname,
  box: state.document.box,
  humanCard: state.document.humanCard,
}), {
  getUser,
  getHumanCard
})

export default class HumanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const {path} = this.props;
    const humanCardSlug = path.substring(path.indexOf('/human-card/') + 12);
    this.props.getHumanCard(humanCardSlug);
  }

  render() {
    const {humanCard} = this.props;
    
    return (
      <div className="human-card markdown-human-card">
        <ReactMarkdown source={humanCard.markdown}/>
        {/*<ReactMarkdown source={test}/>*/}
      </div>
    );
  }
}

HumanCard.propTypes = {
  path: PropTypes.string,
  getHumanCard: PropTypes.func,
  humanCard: PropTypes.object,
};