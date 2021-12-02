import "./scss/style.scss";

import React, { useEffect, useMemo } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import useToken from "./hooks/useToken";
import { useDispatch } from "react-redux";
import { setUserToken } from "./redux/slice/userSlice";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
// const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

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
  const { token, setToken } = useToken();
  const isAuth = useMemo(() => token?.id !== undefined, [token?.id]);
  const dispatch = useDispatch();
  console.log("isatuh", token?.id);

  useEffect(() => {
    if (token?.id !== "") {
      const userInfor = {
        id: token?.id,
        token: token?.token,
        authorities: token?.authorities,
        username: token?.username,
        email: token?.email,
      };
      dispatch(setUserToken(userInfor));
    }
  }, [
    dispatch,
    token?.authorities,
    token?.email,
    token?.id,
    token?.token,
    token?.username,
  ]);

  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          {!isAuth ? (
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
          ) : null}
          <PrivateRoute authen={isAuth} path="/" component={Dashboard} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
