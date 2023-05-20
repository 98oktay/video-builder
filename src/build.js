import React from 'react';
import ReactDOM from 'react-dom/server';
import Composition from './Composition';

const markup = ReactDOM.renderToStaticMarkup(<Composition />);
console.log(markup);


