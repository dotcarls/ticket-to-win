import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import RouteAdd from '../components/ticket-to-win/RouteAdd';
import Routes from '../components/ticket-to-win/Routes';

storiesOf('Ticket To Win', module)
  .add('RouteAdd', () => (
    <RouteAdd />
  ))
  .add('Routes', () => (
    <Routes />
  ));
