import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import GlobalStyles from './styles/global';

ReactDOM.render(
<Fragment>
  <GlobalStyles />
  <Main />
</Fragment>,
document.getElementById('root'));

