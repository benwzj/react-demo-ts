import { ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';
import useNavigation from './use-navigation';

type LinkProp = {
  to: string;
  children: ReactNode;
  className: string;
  activeClassName: string;
}

function Link({ to, children, className, activeClassName }: LinkProp) {

  const router = useNavigation();
  if (!router) { throw new Error("router must not null") }

  const { navigate, currentPath } = router;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };

  return (
    <>
      <a 
        className={
          classNames(
            className,
            currentPath===to && activeClassName
          )} 
        href={to} 
        onClick={handleClick}
      >
        {children}
      </a>
    </>
  );
}

export default Link;