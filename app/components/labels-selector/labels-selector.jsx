'use strict';

import React from 'react';
import {themeColor} from '../../constants.js';
import {connect} from 'react-redux';
import * as actionCreators from '../../action-creators.js';
import Checkbox from 'material-ui/Checkbox';
import './labels-selector.less';
import Avatar from 'material-ui/Avatar';
import {get} from 'lodash';

//TODO: When to use function and when the class?

let LabelsSelector = ({
	labels,
	tags,
	labelSelectionToggled,
	tagsLoaded,
	tagsLoadingStarted,
	tagsLoadingProgress
}) => {

	const getSelectedLabels = (labelsArray) => {
		return labelsArray.filter(l => l.isSelected);
	};

	const getTags = (labelsArray) => {
		if (!(labelsArray && labelsArray.length)) {
			throw new Error('Unable to get tags, no labels found');
		}

		let selectedProps = getSelectedLabels(labelsArray);

		if (!(selectedProps && selectedProps.length)) {
			throw new Error('No labels selected');
		}

		let labelsString = selectedProps
			.map(l => l.name)
			.join(' ');

		let lambda = new AWS.Lambda();
		tagsLoadingStarted();
		lambda.invoke({
			FunctionName: 'generate-tags-service-dev-generateTags',
			Payload: JSON.stringify({labels: labelsString})
		}, (err, data) => {
			if (err) {
				console.error(err);

				return;
			}

			let generatedTags = JSON.parse(JSON.parse(data.Payload));
			tagsLoaded(generatedTags);
		});
	};

	return (
		<div className="mb-3">
			{!!(labels && labels.length) && (
				<div>
					<div className="row mb-3 justify-content-center">
						<div className="d-inline-flex">
							<Avatar className="col"
									backgroundColor={(tags && tags.length) ? themeColor : null}>2/2</Avatar>
						</div>
					</div>

					<h4 className="mb-3">Please check what applies to your photo:</h4>

					<div className="row justify-content-between mb-2">
						{labels.map((l, index) => (
							<div className="label-wrap" key={index}>
								<Checkbox label={l.name}
										onCheck={() => labelSelectionToggled(l.name, !l.isSelected)}
										checked={l.isSelected}
										iconStyle={{fill: themeColor}}/>
							</div>
						))}
					</div>

					<div className="row">
						<div className="col-md-4 offset-md-4">
							<button type="button" className="btn btn-secondary col"
									disabled={!getSelectedLabels(labels).length || tagsLoadingProgress}
									onClick={() => getTags(labels)}>

								{tagsLoadingProgress && (
									<i className="icon-spin3 animate-spin"></i>
								)}

								<span>Get Tags!</span>
							</button>
						</div>
					</div>

				</div>
			)}
		</div>
	);
};

LabelsSelector = connect(
	state => ({
		labels: state.labels,
		tagsLoadingProgress: get(state, 'upload.tagsLoadingProgress'),
		tags: get(state, 'upload.tags')
	}),
	dispatch => ({
		labelSelectionToggled: (name, isSelected) => dispatch(actionCreators.labelSelectionToggled(name, isSelected)),
		tagsLoaded: tags => dispatch(actionCreators.tagsLoaded(tags)),
		tagsLoadingStarted: () => dispatch(actionCreators.tagsLoadingStarted())
	})
)(LabelsSelector);

export {LabelsSelector};
