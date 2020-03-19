import React from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
import { withStyles } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.border}`,
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  noDivider: {
    borderTop: 'none'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
});

const PortletFooter = props => {
  const { classes, className, noDivider, alignRight, children, ...rest } = props;

  const rootClassName = classNames({
      [classes.root]: true,
      [classes.alignRight]: alignRight,
      [classes.noDivider]: noDivider
    },
    className
  );

  return (
    <div
      {...rest}
      className={rootClassName}
    >
      {children}
    </div>
  );
};

PortletFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noDivider: PropTypes.bool
};

export default withStyles(styles)(PortletFooter);
