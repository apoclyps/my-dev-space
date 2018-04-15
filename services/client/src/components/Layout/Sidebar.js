import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {
  MdDashboard,
  MdWidgets,
  MdWeb,
  MdInsertChart,
} from 'react-icons/lib/md';
import FaGithub from 'react-icons/lib/fa/github';

import SourceLink from 'components/SourceLink';

const sidebarBackground = {
  backgroundImage: 'url("/img/sidebar/sidebar-4.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/events', name: 'events', exact: false, Icon: MdInsertChart },
  { to: '/projects', name: 'projects', exact: false, Icon: MdWidgets },
  { to: '/developers', name: 'developers', exact: false, Icon: MdWeb },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image="/img/sidebar/sidebar-4.jpg">
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <span className="text-white">
                NI Dev Net <FaGithub />
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} size="1.5rem" />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
