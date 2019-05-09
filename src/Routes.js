import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import ROUTES from './constants/routes';
// Helpers
import { APP_TOKEN } from './api/Constants';
// Utils
import PageLoader from './modules/common/PageLoader';
import Navigation from './modules/common/navigation/Navigation';

// Routes
const AuthLayout = lazy(() => import('./modules/auth/layout/MainLayout'));
const LoginPage = lazy(() => import('./modules/public/login/LoginPage'));
const GalleryPage = lazy(() => import('./modules/public/gallery/GalleryPage'));
const ContactPage = lazy(() => import('./modules/public/contact/ContactPage'));
const LocalizationPage = lazy(() => import('./modules/public/localization/LocalizationPage'));
const HomePage = lazy(() => import('./modules/public/home/HomePage'));
const NoMatchPage = lazy(() => import('./modules/not-found/NoMatchPage'));

const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Navigation />
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
        <Route
          exact
          path={ROUTES.HOME}
          render={props => {
            return <HomePage {...props} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return APP_TOKEN.notEmpty ? <Redirect to="/auth" /> : <LoginPage {...props} />;
          }}
        />
        <Route
          exact
          path={ROUTES.GALLERY}
          render={props => {
            return <GalleryPage {...props} />;
          }}
        />
        <Route
          exact
          path={ROUTES.CONTACT}
          render={props => {
            return <ContactPage {...props} />;
          }}
        />
        <Route
          exact
          path={ROUTES.LOCALIZATION}
          render={props => {
            return <LocalizationPage {...props} />;
          }}
        />
        <Route
          path="/auth"
          render={props => {
            // return APP_TOKEN.notEmpty ? <AuthLayout {...props} /> : <Redirect to="/login" />;
            return <AuthLayout {...props} />;
          }}
        />
        <Route component={NoMatchPage} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  location: PropTypes.object, // React Router Passed Props
};

export default Routes;
