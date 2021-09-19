import { useAuth0 } from "@auth0/auth0-react";
import { Button, MenuItem } from "@material-ui/core";

export default function LoginLogout() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <MenuItem onClick={() => logout()}>
          Cerrar sesión
        </MenuItem>
      ) : (
        <MenuItem onClick={() => loginWithRedirect()}>
          Acceder
        </MenuItem>
      )}
    </div>
  );
}
