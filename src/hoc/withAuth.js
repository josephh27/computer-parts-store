
import { useAuth, useAuthNot } from './../customHooks/useAuth';
  
// const WithAuth = props => useAuth(props) && props.children;
// export default withRouter(WithAuth);
export const WithAuth = (props) => {
  return useAuth(props) && props.children
};

export const  WithoutAuth = (props) => {
  return !useAuthNot(props) && props.children
};
