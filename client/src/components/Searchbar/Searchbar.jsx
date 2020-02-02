import React from 'react';
import SelectTag from '../SelectTag/';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

function Searchbar ({ onChangeText, handlerSubmit, name, priceMin, priceMax, tag, type, t }) {
  return (
  <>
    <div className="container" style={{maxWidth: '1140px', marginTop: '40px'}}>
      <form id="form-search" action="." onSubmit={handlerSubmit}>
        <div className="section">
          <div className="box box-search">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input className="input is-dark has-text-centered" placeholder={`${t("Search Advert")}...`}
                  value={name} name='name' onChange={onChangeText} id="search" type="search" 
                />
              </div>
            </div>
            
            <div className="field has-addons">
              <div className="control is-expanded" style={{width: '50%'}}>
                <label className="label">{t("Type")}</label>
                <div className="select is-dark width100">
                  <select name='type' className="width100" 
                    value={type}  onChange={onChangeText}
                  >
                    <option value='all'>{t("all")}</option>
                    <option value='buy'>{t("buy")}</option>
                    <option value='sell'>{t("sell")}</option>
                  </select>
                </div>
              </div>
              <div className="control is-expanded" style={{width: '50%'}}>
                <label className="label">{t("Tag")}</label>
                <SelectTag tag={tag} onChange={onChangeText}/>
              </div>
            </div>
            
            <div className="field has-addons ">
              <div className="control is-expanded">
                <label className="label">{t("Minimal Price")}</label>
                <input className="input is-dark has-text-centered" id="search" type="number"
                value={priceMin} name='priceMin' onChange={onChangeText} 
                />
              </div>
              <div className="control is-expanded ">
                <label className="label">{t("Maximal Price")}</label>
                <input className="input is-dark has-text-centered is-fullwidth" 
                value={priceMax} name='priceMax' onChange={onChangeText} id="search" type="number"
                />
              </div>
            </div>
            
            <div className="field has-addons ">
              <div className="control is-expanded">
                <button className="button is-dark is-fullwidth">{t("Search")}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}

Searchbar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  handlerSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  priceMin: PropTypes.string.isRequired,
  priceMax: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  type:PropTypes.string.isRequired
}

export default withTranslation()(Searchbar);