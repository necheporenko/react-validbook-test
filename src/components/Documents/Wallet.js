import React, { Component } from 'react';
import DocumentsMenu from './DocumentsMenu';
import AddToken from './AddToken';
import './index.scss';

const doc = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class TokensPublic extends Component {
  render() {
    return (
      <div className="tokens contents">
        <DocumentsMenu/>

        <div className="common-lists tokens-lists">
          {/*<AddToken />*/}
          <h1>Wallet</h1>
          <br/>

          {/*{doc.map((document, index) => (*/}
          {/*<div key={index} className="token">*/}
          {/*<a href="">*/}
          {/*<div>*/}
          {/*<i className="doc-icon"/>*/}
          {/*<p>Document 1</p>*/}
          {/*<div className="doc-sign">*/}
          {/*<i/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</a>*/}
          {/*</div>*/}
          {/*))}*/}


        </div>
      </div>
    );
  }
}

export default TokensPublic;