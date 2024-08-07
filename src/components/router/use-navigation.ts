import { useContext } from 'react';
import NavigationContext from './navigation-context';

function useNavigation() {
  return useContext(NavigationContext);
}

export default useNavigation;
