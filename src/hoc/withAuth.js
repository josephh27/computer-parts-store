
import { useAuth, useAuthNot } from './../customHooks/useAuth';
import { useLocation, useNavigate, useParams } from "react-router-dom";
  
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }

    return ComponentWithRouterProp;
}

// const WithAuth = props => useAuth(props) && props.children;
// export default withRouter(WithAuth);
export const WithAuth = (props) => {
  return useAuth(props) && props.children
};

export const  WithoutAuth = (props) => {
  return !useAuthNot(props) && props.children
};

// export const WithoutAuth = withRouter(WithAuthContainer);
// export const WithAuth = withRouter(WithoutAuthContainer);

