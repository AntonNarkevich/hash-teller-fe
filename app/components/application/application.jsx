'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { GlobalNavigation } from '../global-navigation/global-navigation.jsx';
import { GlobalFooter } from '../global-footer/global-footer.jsx';
import { SignIn } from '../signin/signin.jsx';
import { UploadForm } from '../upload-form/upload-form.jsx';
import { HeroUnit } from '../hero-unit/hero-unit.jsx';
import { TagsOutput } from '../tags-output/tags-output.jsx';

import { LabelsSelector } from '../labels-selector/labels-selector.jsx';

import './application.less';

let Application = ({ user, tags }) => {
	return (
		<div className="container">
			<GlobalNavigation />

			<div className="jumbotron jumbotron-fluid content-wrap">
				<div className="col-md-8 offset-md-2">
					<HeroUnit />

					<SignIn className={user.isSignedIn ? 'hidden-xl-down' : ''} />

					{user.isSignedIn &&
						<div className="row">
							<UploadForm />

							<LabelsSelector />

							{!!(tags && tags.length) && <TagsOutput tags={tags} />}
						</div>}
				</div>
			</div>

			<GlobalFooter
				contactEmail="antonio.narkevich@gmail.com"
				contactName="Antonio Narkevich"
			/>
		</div>
	);
};

Application = connect(state => {
	return {
		user: state.user,
		tags: get(state, 'tagsData.tags')
	};
})(Application);

export { Application };
