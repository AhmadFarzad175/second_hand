// components/Can.js

import { getUser } from "./AuthRepository";

const Can = ({ permission, children }) => {
  const user = getUser();
  const permissions = user?.permissions || [];
  return permissions.includes(permission) ? children : null;
};

export default Can;
