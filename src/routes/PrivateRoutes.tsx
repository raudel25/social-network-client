import { FunctionComponent, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

type Props = {
  component: React.ComponentType<any>;
};

const PrivateRoutes: FunctionComponent<Props> = ({ component: Component }) => {
  const { user } = useContext(UserContext);

  const canAccess = user != null;

  return canAccess ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace></Navigate>
  );
};

export default PrivateRoutes;
