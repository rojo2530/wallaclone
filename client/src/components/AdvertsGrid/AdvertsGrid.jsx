import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import { withTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import Confirm from '../Confirm';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

function AdvertsGrid({ adverts, t, myadverts, onDelete }) {
  return (
    <>
      {adverts.length === 0 ? (
        <p style={styles.content}>No Results Found!!</p>
      ) : (
        <div className="columns is-multiline cards-group grid-cards-container">
          {adverts.map(advert => (
            <div key={advert._id} className="column is-6-tablet is-3-desktop">
              <div className="card has-equal-height">
                <div className="image has-spacing image is-3by2">
                  hola
                  <img
                    src={
                      advert.photo.startsWith('/images')
                        ? `http://localhost:7000${advert.photo}`
                        : `${advert.photo}`
                    }
                    alt="Placeholder"
                  />
                </div>
                <div className="card-content has-equal-height">
                  <div className="content">
                    <h4 className="title has-small-spacing-bottom">
                      {advert.name}
                    </h4>
                    <div className="has-spacing-bottom">
                      {advert.tags.map(tag => (
                        <span
                          key={tag}
                          className="tag has-small-spacing-top is-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="buttons">
                      <a className="button is-link has-icons-left" href="#">
                        <span className="icon">
                          <FaShoppingCart />
                        </span>
                        <span>{advert.price}€</span>
                      </a>
                    </p>
                    <h6 className="vc">{advert.type}</h6>
                    <Moment format="DD/MM/YYYY HH:mm">
                      {advert.createdAt}
                    </Moment>
                    <Link to={`/adverts/${advert.user}`}>{advert.user}</Link>
                    <TwitterShareButton
                      url={`http://localhost:3000/advert/detail/${advert.name.replace(
                        /\s+/g,
                        '-',
                      )}/${advert._id}`}
                      title={advert.name}
                    >
                      <TwitterIcon size={32} />
                    </TwitterShareButton>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link
                    to={`/advert/detail/${advert.name.replace(/\s+/g, '-')}/${
                      advert._id
                    }`}
                    className="card-footer-item"
                  >
                    {t('Detail')}
                  </Link>
                  {myadverts && (
                    <>
                      <Link
                        to={`/advert/edit/${advert._id}`}
                        className="card-footer-item"
                      >
                        {t('Edit')}
                      </Link>
                      <Confirm id={advert._id} />
                    </>
                  )}
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

AdvertsGrid.propTypes = {
  adverts: PropTypes.array.isRequired,
};

export default withTranslation()(AdvertsGrid);
