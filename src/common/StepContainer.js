import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
	layout: {
		backgroundColor: theme.palette.white,
		width: 800,
		margin: 'auto',
		padding: 40,
		textAlign: 'left'
	}
});

const StepContainer = ({ classes, children }) => (
	<Card className={classes.layout}>
		<CardContent>
			{children}
		</CardContent>
	</Card>
);

StepContainer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
};

export default withStyles(styles)(StepContainer);