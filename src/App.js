import "./scss/style.scss";

import React, { useMemo } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import useToken from "./hooks/useToken";
import Login from "./views/pages/login/Login";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const PrivateRoute = ({ component, authen, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authen === true ? (
          <Dashboard {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const App = () => {
  const { token } = useToken();
  const isAuth = useMemo(() => token?.id !== undefined, [token?.id]);

  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={() => <Login />}
          />
          <PrivateRoute authen={isAuth} path="/" component={Dashboard} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
