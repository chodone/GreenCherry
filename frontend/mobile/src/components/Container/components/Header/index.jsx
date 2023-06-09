import React from 'react';

import cs from 'classnames';

const Header = ({ children, className }) => {
  return <div className={cs('h-16 px-6', className)}>{children}</div>;
};

export default Header;
