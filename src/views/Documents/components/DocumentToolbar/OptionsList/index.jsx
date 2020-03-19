import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, ListItemSecondaryAction, Radio } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';

import styles from './styles';

class OptionsList extends Component {

	render() {
		const { className, classes, searchOptions, onSelect, filterSelected } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<List dense className={classes.listOptionsFilter}>
					{searchOptions.map((option, key) => {
						const labelId = `checkbox-list-secondary-label-${key}`;
						return (
							<ListItem
								onClick={() => onSelect(option)}
								key={key}
								button
								dense
							>
								<ListItemText id={labelId} primary={option.label} />
								<ListItemSecondaryAction>
									<Radio
										edge="end"
										name={option.label}
										onChange={() => onSelect(option)}
										checked={filterSelected.value === option.value ? true : false}
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</div>
		);
	}
}

OptionsList.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	notifications: PropTypes.array.isRequired,
	onSelect: PropTypes.func
};

OptionsList.defaultProps = {
	notifications: [],
	onSelect: () => { }
};

export default withStyles(styles)(OptionsList);
