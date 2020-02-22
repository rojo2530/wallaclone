import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import api from '../../utils/api';
import './navbar.css';

const { logout } = api();

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
      lang: 'es',
    };
    this.toggleBurguer = this.toggleBurguer.bind(this);
    this.logout = this.logout.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.setState({
      lang: this.props.i18n.language.split('-')[0],
    });
  }

  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer,
    });
  }

  logout(event) {
    event.preventDefault();
    //Dejamos el campo de user a un objecto vacio en el estado de redux
    this.props.setUser({});
    logout()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  login(event) {
    event.preventDefault();
    this.props.history.push('/signin');
  }

  changeLang() {
    this.setState(
      prevState => ({
        lang: prevState.lang === 'es' ? 'en' : 'es',
      }),
      () => this.props.i18n.changeLanguage(this.state.lang),
    );
  }

  render() {
    const { activeBurguer, lang } = this.state;
    const { t, isAuth } = this.props;
    const languagesFlag = {
      en: 'us',
      es: 'es',
    };
    return (
      <>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item " href="/">
              <span role="img" aria-label="Movies" className="bd-emoji">
                🛒
              </span>{' '}
              &nbsp;<span className="title-logo">WallaKeep</span>
            </a>
            <div
              className={`navbar-burger burger ${
                activeBurguer === true ? 'is-active' : null
              }`}
              onClick={this.toggleBurguer}
              data-target="navMenubd-example"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div
            id="navMenubd-example"
            className={`navbar-menu ${
              activeBurguer === true ? 'is-active' : null
            }`}
          >
            <div className="navbar-start">
              {isAuth && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-grey has-text-weight-bold">
                    <strong className="has-text-grey">{t('Private')}</strong>
                  </a>
                  <div className="navbar-dropdown ">
                    <hr className="navbar-divider" />
                    <div className="navbar-item">
                      <div>
                        <p className="is-size-6-desktop">
                          <strong className="has-text-info">Usuario</strong>
                        </p>
                      </div>
                    </div>

                    <hr className="navbar-divider" />
                    <div className="navbar-item">
                      <div>
                        <p className="is-size-6-desktop">
                          <strong className="has-text-info">{t('Adverts')}</strong>
                        </p>
                      </div>
                    </div>
                    <Link
                      className="navbar-item is-active"
                      to={`/private/myadverts`}
                    >
                    {t('My Adverts')}
                    </Link>
                    <Link className="navbar-item is-active" to="/advert/create">
                      {t('Create new Advert')}
                    </Link>
                  </div>
                </div>
              )}

              <Link className="navbar-item has-text-grey has-text-weight-bold	" to="/">
                <span role="img" aria-label="Home" className="bd-emoji">
                  🏠
                </span>{' '}
                &nbsp;{t('Home')}
              </Link>
              
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={this.changeLang}
                  className="is-dark has-text-weight-bold is-normal button"
                >
                  <span
                    className={`flag-icon flag-icon-${languagesFlag[lang]}`}
                  ></span>
                </button>
                {isAuth ? (
                  <button
                    onClick={this.logout}
                    className="is-dark has-text-weight-bold is-normal button"
                  >
                    {t('SignOut')}
                  </button>
                ) : (
                  <button
                    onClick={this.login}
                    className="is-dark has-text-weight-bold is-normal button"
                  >
                    {t('SignIn')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default withTranslation()(Navbar);
