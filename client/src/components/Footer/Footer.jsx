import React from 'react';
import { withTranslation } from 'react-i18next';

function Footer({ t }) {
  return (
   <footer className="footer" style={{backgroundColor: '#1A202C'}}>
      <div className="container has-no-background">
        <div className="content has-text-centered">
        <p>
					{t("Design by")} <a href="https://www.linkedin.com/in/josecantosgalvan/">Jose Cantos</a>.
				</p>
        <p>
					<a title="Hecho con Bulma" aria-label="Hecho con Bulma" rel="noopener nofollow" href="https://bulma.io">
						<img src="/made-with-bulma.png" alt="Made with Bulma" width="128" height="24" aria-hidden="true" />
					</a>
				</p>
        </div>
      </div>
    </footer>
  )
}

export default withTranslation()(Footer);