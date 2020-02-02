import React from 'react';
import SelectMultiple from '../SelectMultiple/';
import Navbar from '../Navbar/';
import Footer from '../Footer';
import { notification } from 'antd';
import { FaAdversal, FaUser, FaRegFileWord, FaEuroSign, FaImage } from 'react-icons/fa';
import CaptureError from '../CaptureError';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    type: 'success',
    style: { backgroundColor: 'green' }
  });
}

class ManageAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {
        name: '',
        description: '',
        tags: [],
        price: '',
        type: 'sell',
        photo: ''
      },
      edit: false,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.isInvalidForm = this.isInvalidForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

 async onSubmit(event) {
    event.preventDefault();
    if (this.state.edit) {
      await this.props.editAdvert(this.state.advert._id,this.state.advert);
      openNotification('Advert update with sucess', `The advert was updated correctly`);
      return;
    }
    await this.props.newAdvert(this.state.advert);
    this.setState({   //Una vez creamos el anuncio dejamos el formulario en blanco
      advert: {
        name: '',
        description: '',
        tags: [],
        price: '',
        type: 'sell',
        photo: ''
      },
    });
    openNotification('Advert created with success', `The advert was created correctly at`);
  }

  async componentDidMount() {
    if (this.props.history.location.pathname.includes('/advert/edit')) {
      const { id } = this.props.match.params;
      await this.props.loadAdvert(id);
      this.setState({
        advert: this.props.advert,
        edit: true
      })
    }
  }

  onChangeField(event) {
    const { name, value } = event.target;
    this.setState({
      advert: {
        ...this.state.advert,
        [name]: value
      }
    });
  }

  onChangeTag(value) {
    this.setState({
      advert: {
        ...this.state.advert,
        tags: [...value]
      }
    })
  }

  isInvalidForm() {
    const { advert } = this.state;
    return advert.name.trim().length <= 3 ||
      advert.description.trim().length <= 3 ||
      advert.price < 1 ||
      advert.photo.trim().length <= 3 ||
      advert.type.trim().length < 3 ||
      advert.tags.length < 1
  }

  render() {
    const { advert, edit } = this.state;
    const { isFetching, error, t } = this.props;
    
    if (isFetching) {
      return null;
    }
    if (!advert) {
      return null;
    }
    if (error) {
      return <CaptureError message="Error fecthing Adverts" error={error.message} />
    }
    return (
      <>
        <Navbar />
        <section className="hero" style={{ marginTop: '50px' }}>
          <div className="hero-body">
            <div className="container">
              <div className="column is-4 is-offset-4 box">
                <h1 className="avatar has-text-centered section"><FaAdversal size={52} /></h1>
                <div className="login-form">
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <label className="label">{t("Name")}</label>
                      <div className="control has-icons-left">
                        <input name="name" className="input" value={advert.name} onChange={this.onChangeField} type="text" placeholder="Name..." />
                        <span className="icon is-small is-left"><FaUser /></span>
                      </div>
                      <p className="help">The name is invalid, is too short</p>
                    </div>
                    <div className="field">
                      <label className="label">{t("Description")}</label>
                      <div className="control has-icons-left">
                        <input name="description" className="input" type="text" value={advert.description} onChange={this.onChangeField} placeholder="Description  .." />
                        <span className="icon is-small is-left"><FaRegFileWord /></span>
                      </div>
                      <p className="help">The description is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">{t("Price")}</label>
                      <div className="control has-icons-left">
                        <input name="price" className="input" type="number" value={advert.price} onChange={this.onChangeField} placeholder="Price.." />
                        <span className="icon is-small is-left"><FaEuroSign /></span>
                      </div>
                      <p className="help">The price is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">{t("Photo")}</label>
                      <div className="control has-icons-left">
                        <input name="photo" className="input" type="text" value={advert.photo} onChange={this.onChangeField} placeholder="Photo..." />
                        <span className="icon is-small is-left"><FaImage /></span>
                      </div>
                      <p className="help">The description is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">{t("Tags")}</label>
                      <div className="control has-icons-left">
                        <SelectMultiple name='tags' value={advert.tags} onChange={this.onChangeTag} />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">{t("Type")}</label>
                      <div className="control has-icons-left">
                        <div className="select is-fullwidth">
                          <select name='type' value={advert.type} onChange={this.onChangeField}>
                            <option value='buy'>{t("buy")}</option>
                            <option value='sell'>{t("sell")}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <p className="control">
                        <button className="button is-dark is-medium is-fullwidth is-disabled" disabled={this.isInvalidForm()}>{edit === true ? t("Update") : t("Create")}</button>
                      </p>
                    </div>
                  </form>
                </div>
                <hr />
                <div className="forgot-password">
                  <p className="has-text-centered">Remember, the fields can not be empty</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

ManageAdvert.propTypes = {
  advert: PropTypes.object,
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  loadAdvert: PropTypes.func.isRequired,
  newAdvert: PropTypes.func.isRequired,
  editAdvert: PropTypes.func.isRequired,
}

export default withTranslation()(ManageAdvert);