import React from 'react';
import { render } from 'react-dom';
import './assets/styles/index.scss';

const Application: React.FunctionComponent = () => {
  return <h1>Application</h1>;
};

render(<Application />, document.getElementById('root'));
