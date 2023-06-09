import classnames from 'classnames';

import Body from './components/Body';
import BusinessHeader from './components/BusinessHeader';
import Header from './components/Header';
import MainBody from './components/MainBody';
import MainHeader from './components/MainHeader';
import PaddingZeroBody from './components/PaddingZeroBody';

const Container = ({ children, className }) => {
  return (
    <div
      id="cherry-container"
      className={classnames(className, 'h-full', 'w-full')}
    >
      {children}
    </div>
  );
};

Container.Header = Header;
Container.MainHeader = MainHeader;
Container.BusinessHeader = BusinessHeader;
Container.Body = Body;
Container.MainBody = MainBody;
Container.PaddingZeroBody = PaddingZeroBody;

export default Container;
