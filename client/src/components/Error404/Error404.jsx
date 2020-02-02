import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/';

export default function () {
  return (
    <>
      <Navbar />
      <div className="container is-fluid" id="content" style={{ marginTop: '50px' }}>
        <section data-section-id="1" data-component-id="15a7_16_01_awz" data-category="http-codes" className="section">
          <div className="container has-text-centered">
            <div className="columns is-centered">
              <div className="column is-7">
                <h1 className="title is-1" data-config-id="header">404</h1>
                <p className="subtitle is-3" data-config-id="subheader">Page not found</p>
                <p data-config-id="paragraph"> As well as funds, willing VC-s, client-centered approach, basic UX skills, proper level of nutrients, girlfriends and most of our dignity.</p>
              </div>
            </div><Link className="button is-dark" to="/" data-config-id="primary-action">Back to homepage</Link>
          </div>
        </section>
      </div>
    </>
  )
}