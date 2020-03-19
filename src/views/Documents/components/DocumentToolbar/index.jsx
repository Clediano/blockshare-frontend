import React, { Component } from 'react';
import { withStyles, Grid, Paper, InputBase, IconButton, Popover, Tooltip } from '@material-ui/core';
import styles from './styles';
import { Search, Menu } from '@material-ui/icons';
import OptionsList from './OptionsList';

const searchOptions = [
	{ label: 'Transação', value: 'txid', inputLabel: "pela transação..." }
];

class DocumentToolbar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			popoverEl: null,
			valueInputBase: '',
			filterSelected: searchOptions[0]
		}
	}

	handleCloseSearchFilter = () => {
		this.setState({ popoverEl: null })
	}

	onSelectFilterOption = option => {
		this.setState({ filterSelected: option });
		this.handleCloseSearchFilter();
	}

	handleMenuOpen = event => {
		this.setState({ popoverEl: event.currentTarget })
	}

	searchDocumentsWithFilter = () => {
		const { filterSelected, valueInputBase } = this.state;

		this.props.searchDocuments(filterSelected, valueInputBase);
	}

	handleChangeInputBase = e => {
		this.setState({ valueInputBase: e.target.value })
	}

	render() {
		const { classes } = this.props;
		const { popoverEl, filterSelected, valueInputBase } = this.state;

		return (
			<Grid container direction="row" justify="center" alignItems="center">
				<Paper className={classes.root}>
					<IconButton
						onClick={this.handleMenuOpen}
						className={classes.iconButton}
						aria-label="menu"
					>
						<Menu />
					</IconButton>
					<InputBase
						className={classes.input}
						placeholder={`Pesquisar documento ${filterSelected.inputLabel}`}
						onChange={this.handleChangeInputBase}
						value={valueInputBase}
					/>
					<Tooltip title="Clique para efetuar a pesquisa">
						<IconButton
							className={classes.iconButton}
							aria-label="search"
							onClick={this.searchDocumentsWithFilter}
						>
							<Search />
						</IconButton>
					</Tooltip>
				</Paper>
				<Popover
					open={Boolean(popoverEl)}
					anchorEl={popoverEl}
					onClose={this.handleCloseSearchFilter}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				>
					<OptionsList
						searchOptions={searchOptions}
						onSelect={this.onSelectFilterOption}
						filterSelected={filterSelected}
					/>
				</Popover>
			</Grid>
		);
	}
};

export default withStyles(styles)(DocumentToolbar);
