import React, {Component} from 'react';
import {connect} from 'react-redux';
import {default as Web3} from 'web3';
import TokensMenu from './TokensMenu';
import AddToken from './AddToken';
import './index.scss';

let savePositionTop;

@connect((state) => ({
  authorizedUser: state.user.authorizedUser,
}), {})

export default class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: null,
      signature: null,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.saveScroll = this.saveScroll.bind(this);
    this.test = this.test.bind(this);
  }

  test() {
    const privateKey = '6015d764ec8d2f209e335ed2b83f23aa4919a8594a37e5173e441848ec872a1e';
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    this.setState({signature: web3.eth.accounts.sign(this.msg.value, this.key.value)});
    // console.log(web3.eth.accounts.sign(data, privateKey));
    // web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), "0x46897638b09B3a3ac21Da64B8FA81aD7d07B143F", "12345678")
    //   .then(console.log);

    // web3.eth.sign("Hello world", "0x46897638b09B3a3ac21Da64B8FA81aD7d07B143F")
    //   .then(console.log);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.saveScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const scrollTop = e.srcElement.body.scrollTop;
    savePositionTop = scrollTop;
    this.setState({scrollTop});
  }

  saveScroll() {
    // console.log(`saveScroll:${savePositionTop}`);
    this.setState({scrollTop: savePositionTop});
  }

  render() {
    const {scrollTop, signature} = this.state;

    const chooseNav = () => {
      let Nav;
      let sidebar;
      if (scrollTop <= 275 || !scrollTop) {
        Nav = 'tokens contents';
        sidebar = 'sidebar-default';
      } else {
        Nav = 'tokens contents contents-fixed';
        sidebar = 'sidebar-fixed';
      }
      const result = {posTop: Nav, sidebar};
      return result;
    };

    const navigation = chooseNav();
    return (
      <div className={navigation.posTop}>
        <TokensMenu
          sidebar={navigation.sidebar}
        />

        <div className="common-lists tokens-lists">
          <div>
            <textarea ref={c => this.msg = c} name="eth" id="" cols="30" rows="5" placeholder="Message..."
                      style={{width: '500px'}}/>
            <br/>
            <input ref={c => this.key = c} type="text" placeholder="Key..." style={{width: '500px'}}/>
            <br/>
            <button onClick={() => this.test()}>Sign</button>
            <br/>
            {signature &&
            <div>
              Result:
              <ul>
                <li>{`message: ${signature.message}`}</li>
                <li>{`messageHash: ${signature.messageHash}`}</li>
                <li>{`r: ${signature.r}`}</li>
                <li>{`s: ${signature.s}`}</li>
                <li>{`signature: ${signature.signature}`}</li>
              </ul>
            </div>
            }
          </div>

          {/*<AddToken*/}
          {/*authorizedUser={this.props.authorizedUser}*/}
          {/*/>*/}

          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
          {/*<div className="token">*/}
          {/*<a href=""><i></i></a>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}
