import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import api from '../../utils/api';

const { logout } = api();

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
      lang: "es",
    }
    this.toggleBurguer = this.toggleBurguer.bind(this);
    this.logout = this.logout.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log('Lenguaje: ', this.props.i18n.language);
     this.setState({
       lang: this.props.i18n.language.split('-')[0]
     })
  }
 
  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer
    })
  }

  logout(event) {
    event.preventDefault();
    //Dejamos el campo de user a un objecto vacio en el estado de redux
    this.props.setUser({});
    logout().then(res => console.log(res))
      .catch(err => console.log(err));
  }
  login(event) {
    event.preventDefault();
    this.props.history.push('/signin');
  }

  changeLang() {
    this.setState(prevState => ({
      lang: prevState.lang === 'es' ? 'en' : 'es'
    }), () =>this.props.i18n.changeLanguage(this.state.lang));
    
  }

  render() {
    const { activeBurguer, lang } = this.state;
    const { t, i18n, isAuth } = this.props;
    const languagesFlag = {
      en: "us",
      es: "es",
      
    }
    console.log(this.state)
    return (
      <>
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item " href="/">
              <span role="img" aria-label="Movies" className="bd-emoji">🛒</span> &nbsp;<span className="title-logo">WallaKeep</span>
            </a>
            <div className={`navbar-burger burger ${activeBurguer === true ? 'is-active' : null}`} onClick={this.toggleBurguer} data-target="navMenubd-example">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenubd-example" className={`navbar-menu ${activeBurguer === true ? 'is-active' : null}`}>
            <div className="navbar-start">
              <Link className="navbar-item " to='/'><span role="img" aria-label="Home" className="bd-emoji">🏠</span> &nbsp;{t("Home")}</Link>
              <Link className="navbar-item " to='/advert/create'><span role="img" aria-label="Profile" className="bd-emoji">📦</span> &nbsp;{t("Create Advert")}</Link>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={this.changeLang} className="is-dark has-text-weight-bold is-normal button"><span className={`flag-icon flag-icon-${languagesFlag[lang]}`}></span></button>
                { isAuth ? (
                  <button onClick={this.logout} className="is-dark has-text-weight-bold is-normal button">{t("LogOut")}</button>


                ): (
                  <button onClick={this.login} className="is-dark has-text-weight-bold is-normal button">{t("Login")}</button>


                )}
                
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default withTranslation()(Navbar);