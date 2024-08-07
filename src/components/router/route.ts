import { ReactNode } from 'react';
import useNavigation from './use-navigation';

function Route({ path, children }:{path: string; children: ReactNode }) {

  const router = useNavigation();
  if (!router) { throw new Error("router must not null") }

  const { currentPath } = router;

  if (path === currentPath) {
    return children;
  }

  return null;
}

export default Route;
