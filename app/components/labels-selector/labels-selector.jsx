'use strict';

import React from 'react';
import { themeColor } from '../../constants.js';
import { connect } from 'react-redux';
import * as actionCreators from '../../action-creators.js';
import Checkbox from 'material-ui/Checkbox';
import './labels-selector.less';
import Avatar from 'material-ui/Avatar';

let LabelsSelector = ({
	labels,
	tags,
	labelSelectionToggled,
	tagsLoaded,
	tagsLoadingStarted,
	tagsLoadingProgress
}) => {
	const getSelectedLabels = labelsList => {
		return labelsList.filter(l => l.get('isSelected'));
	};

	const getTags = labelsList => {
		if (!(labelsList && labelsList.size)) {
			throw new Error('Unable to get tags, no labels found');
		}

		let selectedProps = getSelectedLabels(labelsList);

		if (!(selectedProps && selectedProps.size)) {
			throw new Error('No labels selected');
		}

		let labelsString = selectedProps.map(l => l.get('name')).join(' ');

		let lambda = new AWS.Lambda();
		tagsLoadingStarted();
		lambda.invoke(
			{
				FunctionName: 'generate-tags-service-dev-generateTags',
				Payload: JSON.stringify({ labels: labelsString })
			},
			(err, data) => {
				if (err) {
					console.error(err);

					return;
				}

				let generatedTags = JSON.parse(JSON.parse(data.Payload));
				tagsLoaded(generatedTags);
			}
		);
	};

	return (
		<div className="mb-3">
			{!!(labels && labels.size) &&
				<div>
					<div className="row mb-3 justify-content-center">
						<div className="d-inline-flex">
							<Avatar
								className="col"
								backgroundColor={tags && tags.size ? themeColor : null}
							>
								2/2
							</Avatar>
						</div>
					</div>

					<h4 className="mb-4">
						Step 2: Check what applies and hit the button below
					</h4>

					<div className="row justify-content-between mb-2">
						{labels.map((l, index) => (
							<div className="label-wrap" key={index}>
								<Checkbox
									label={l.get('name')}
									onCheck={() =>
										labelSelectionToggled(l.get('name'), !l.get('isSelected'))}
									checked={l.get('isSelected')}
									iconStyle={{ fill: themeColor }}
								/>
							</div>
						))}
					</div>

					<div className="row">
						<div className="col-md-4 offset-md-4">
							<button
								type="button"
								className="btn btn-secondary col"
								disabled={
									!getSelectedLabels(labels).size || tagsLoadingProgress
								}
								onClick={() => getTags(labels)}
							>

								{tagsLoadingProgress &&
									<i className="icon-spin3 animate-spin" />}

								<span>Get Tags!</span>
							</button>
						</div>
					</div>

				</div>}
		</div>
	);
};

LabelsSelector = connect(
	state => ({
		labels: state.get('labels'),
		tagsLoadingProgress: state.getIn(['tagsData', 'tagsLoadingProgress']),
		tags: state.getIn(['tagsData', 'tags'])
	}),
	dispatch => ({
		labelSelectionToggled: (name, isSelected) =>
			dispatch(actionCreators.labelSelectionToggled(name, isSelected)),
		tagsLoaded: tags => dispatch(actionCreators.tagsLoaded(tags)),
		tagsLoadingStarted: () => dispatch(actionCreators.tagsLoadingStarted())
	})
)(LabelsSelector);

export { LabelsSelector };
