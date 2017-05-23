import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';

class Post extends Component {
  render() {
    const { fullName, slug, avatar } = this.props.user;
    const created = this.props.created;
    const post = this.props.post;
    const images = this.props.images;
    return (
      <div className="post">

        {/* ===========
            Post Header
            =========== */}
        <div className="post-header">

          <div className="wrap-post-user-avatar">
            <Link to={`/${slug}`}><img className="post-user-avatar" src={avatar} /></Link>
          </div>

          <div className="wrap-post-user-info">
            <div className="post-user-name">
              <Link to={`/${slug}`}>{fullName}</Link>
            </div>
            <div className="post-details">
              <div className="post-details-date">{created}</div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-loud-icon"><span></span></div>
              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-visibility">
                <div className="post-details-visibility-icon">
                  <span></span>
                </div>
                <div className="post-details-visibility-menu">
                  {/* <i className="caret"></i> */}
                  <ButtonToolbar>
                    <DropdownButton className="profileMenu-btn" title={''} id={3} pullRight>
                      <Link>Public</Link>
                      <Link>Only me</Link>
                      <Link>Custom</Link>
                      <Link>Reset as per visibility of books</Link>
                      <span className="divider"></span>
                      <Link>History of Story Visibility</Link>
                    </DropdownButton>
                  </ButtonToolbar>
                </div>
              </div>


              <div className="post-delimiter"><span> · </span></div>
              <div className="post-details-location">Wallbook</div>
            </div>
          </div>

          <div className="wrap-post-story-dropdown">
            <ButtonToolbar>
              <DropdownButton className="profileMenu-btn" title={''} id={4} noCaret pullRight >
                <Link>Pin story</Link>
                <Link>Story Details</Link>
                <Link>Delete Story</Link>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </div>

        {/* ===========
            Post Content
            =========== */}
        <div className="post-content">
          <div className="wrap-post-content">

            <div
              className="post-content-type-text"
              dangerouslySetInnerHTML={{__html: post}}
            />


            {/*<div className="post-content-type-text">
              <p>Математический горизонт, в первом приближении, вызывает перигей. Движение, несмотря на внешние воздействия, последовательно. В связи с этим нужно подчеркнуть, что высота вращает первоначальный популяционный индекс. Это можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек, где юлианская дата многопланово колеблет ионный хвост. Конечно, нельзя не принять во внимание тот факт, что натуральный логарифм прекрасно притягивает межпланетный Южный Треугольник.</p>
              <p>Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако соединение выслеживает вращательный большой круг небесной сферы. Часовой угол иллюстрирует натуральный логарифм, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы. Звезда оценивает далекий Млечный Путь, а время ожидания ответа составило бы 80 миллиардов лет.</p>
            </div> */}
            {/*{ images && images.map}*/}
            { images &&
            <div className="post-content-type-image">
              <img src={images[0]}/>
            </div>
            }


            {/*<div className="post-content-type-link">
              <a href="#">
                <div className="link-preview-image">
                  <img src="http://devianmbanks.validbook.org/cdn/stories-images/706/498.jpg" alt="" />
                </div>
                <div className="wrap-link-preview">
                  <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                  <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                  <div className="link-preview-url">unsplash.com</div>
                </div>
              </a>
            </div>

            <div className="post-content-type-link-short">
              <a href="#">
                <div className="wrap-content-type-link-short">
                  <div className="link-preview-image-short">
                    <img src="http://validbook.org/cdn/stories-images/657/168.jpg" alt="" />
                  </div>
                  <div className="wrap-link-preview-short">
                    <div className="link-preview-title">Photo by Alberto Restifo | Unsplash</div>
                    <div className="link-preview-description">A free high-resolution photo of snow, mountain, cold, frozen and blue by Alberto Restifo, taken with an Sony DSLR-A900</div>
                    <div className="link-preview-url">unsplash.com</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="post-content-type-gallery">
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/AEI66HEQ25.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/TXHI5TTAYX.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/P84KG21CDH.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/DYNEU4SJQ5.jpg" alt/>
              </div>
              <div className="content-gallery-image">
                <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/280h/FYZBN8FDKT.jpg" alt/>
              </div>
            </div>*/}

          </div>
        </div>

        {/* ===========
            Post Footer
            =========== */}
        <div className="post-footer">
          <div className="post-like">
            <a href="">
              <i className="post-action-icon"></i>
              <span>Kudos</span>
            </a>
          </div>
          <div className="post-comment">
            <a href="">
              <i className="post-action-icon"></i>
              <span>Comment</span>
            </a>
          </div>
          <div className="post-log">
            <a href="#">
              <i className="post-action-icon"></i>
              <span>Log</span>
            </a>
          </div>
          <div className="post-share">
            <a href="">
              <i className="post-action-icon"></i>
              <span>Share</span>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object,
  post: PropTypes.string,
  created: PropTypes.string,
  images: PropTypes.array
};

export default Post;
