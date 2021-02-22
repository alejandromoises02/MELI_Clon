import React from 'react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { render, configure } from 'enzyme';


configure({adapter: new Adapter()});
it('renders without crashing', ()=>{
  render(
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  );
});

