import { FC, useContext } from "react";
import Routes from "common/Routes";
import AuthType from "common/AuthType";
import AuthContext from "contexts/AuthContext/AuthContext";

// App Components
import SignInPage from "pages/SignInPage/SignInPage";
import SignUpPage from "pages/SignUpPage/SignUpPage";
import ApplicationsPage from "pages/ApplicationsPage/ApplicationsPage";
import ApplicantSignInPage from "pages/ApplicantSignInPage/ApplicantSignInPage";
import ApplicantAuthVerifyPage from "pages/ApplicantAuthVerifyPage/ApplicantAuthVerifyPage";
import ApplicantPage from "pages/ApplicantPage/ApplicantPage";
import LoadingPage from "pages/LoadingPage/LoadingPage";
import GuardedRoute from "components/GuardedRoute";

// Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppRouter: FC = () => {
  const auth = useContext(AuthContext);

  const defaultPage = (): FC => {
    if (auth.loading) {
      return LoadingPage;
    }

    switch (auth.type) {
      case AuthType.applicant: {
        return ApplicantPage;
      }
      case AuthType.landlord: {
        return ApplicationsPage;
      }
      default: {
        return SignInPage;
      }
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path={Routes.default} component={defaultPage()} />
        <GuardedRoute
          path={Routes.signIn}
          component={SignInPage}
          authType={auth.type}
          allowed={[AuthType.none, AuthType.email_unverified]}
        />
        <GuardedRoute
          path={Routes.signUp}
          component={SignUpPage}
          authType={auth.type}
          allowed={[AuthType.none, AuthType.email_unverified]}
        />
        <GuardedRoute
          path={Routes.applications}
          component={ApplicationsPage}
          authType={auth.type}
          allowed={[AuthType.landlord]}
        />
        <GuardedRoute
          path={Routes.applicantSignIn}
          component={ApplicantSignInPage}
          authType={auth.type}
          allowed={[AuthType.none, AuthType.email_unverified]}
        />
        <GuardedRoute
          path={Routes.applicantAuthVerify}
          component={ApplicantAuthVerifyPage}
          authType={auth.type}
          allowed={[AuthType.none, AuthType.email_unverified]}
        />
        <GuardedRoute
          path={Routes.applicant}
          component={ApplicantPage}
          authType={auth.type}
          allowed={[AuthType.applicant]}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
