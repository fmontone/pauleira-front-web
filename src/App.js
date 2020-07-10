import React, { useState, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Routes from './routes';
import history from '~/services/history';

import { ActivePageContext } from '~/contexts';
import GlobalStyles from '~/styles/global';

import NavBar from '~/components/NavBar';
import PageWrapper from '~/components/PageWrapper';
import Footer from '~/components/Footer';
import Disclaimer from '~/components/Disclaimer';

function App() {
  const [activePage, setActivePage] = useState(null);

  const providerActivePage = useMemo(() => ({ activePage, setActivePage }), [
    activePage,
    setActivePage,
  ]);

  function updateActivePage() {
    const location = window.location.pathname;
    setActivePage(location || '/');
  }

  // TRIGGERS when page history changes

  useEffect(() => {
    updateActivePage();
    window.onpopstate = () => updateActivePage();
  });

  return (
    <Router history={history}>
      <GlobalStyles />
      <ActivePageContext.Provider value={providerActivePage}>
        <PageWrapper
          isMainPage={activePage === '/'}
          style={{ overflowX: 'hidden' }}
        >
          <Helmet>
            <title>Pauleira Guitars - Cursos de Luthieria</title>
            <link rel="canonical" href="https://www.pauleira.com.br" />
          </Helmet>

          <Disclaimer status="danger" name="covid-19">
            <span>
              Devido aos problemas causados pela COVID-19 não estamos oferecendo
              cursos presenciais.
            </span>
          </Disclaimer>
          <NavBar isMainPage={activePage === '/'} />
          <Routes />
          {activePage !== '/' && <Footer />}
        </PageWrapper>
      </ActivePageContext.Provider>
    </Router>
  );
}

export default App;
