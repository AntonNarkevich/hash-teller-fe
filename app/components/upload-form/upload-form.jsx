'use strict';

import React from 'react';
import {ImagePreview} from './image-preview/image-preview.jsx'
import {LoadingBar} from './loading-bar/loading-bar.jsx'
import {connect} from 'react-redux';
import {get} from 'lodash';
import * as actionCreators from '../../action-creators.js';
import './upload-form.less';

let UploadForm = class extends React.Component {
	render() {
		const self = this;

		const previewImage = function (event) {
			let fileReader = new FileReader();
			let file = event.target.files[0];
			fileReader.readAsDataURL(file);

			fileReader.onload = oFREvent => {
				let src = oFREvent.target.result;
				self.props.previewImageChanged(src, file);
			};
		};

		const startUpload = () => {
			const {file, loadingProgress, tagsLoaded} = this.props;

			const bucketName = 'instagram-hastag-generator';
			let bucket = new AWS.S3({
				params: {
					Bucket: bucketName
				}
			});

			let objKey = file.name;
			let params = {
				Key: objKey,
				ContentType: file.type,
				Body: file,
				ACL: 'public-read'
			};

			bucket.putObject(params).on('httpUploadProgress', function (progress) {
				let percent = Math.ceil((progress.loaded / progress.total) * 100);
				loadingProgress(percent);
			}).send((err) => {
				if (err) {
					console.error(err);

					return;
				}

				let lambda = new AWS.Lambda();
				lambda.invoke({
					FunctionName: 'generate-tags-service-dev-generateTags',
					Payload: JSON.stringify({s3Key: objKey})
				}, (err, data) => {
					if (err) {
						console.error(err);

						return;
					}

					let tags = JSON.parse(JSON.parse(data.Payload));
					tagsLoaded(tags);
				});
			});
		};

		return (
			<div className="upload-form-wrap row align-items-center mb-4">
				<div className="col-md-4">
					<ImagePreview previewImageSrc={this.props.previewImageSrc || 'img/image-placeholder.png'}/>
				</div>

				<div className="col-md-8">
					<LoadingBar percent={this.props.percent} />

					<form className="form-inline">
						<input type="file" className="form-control-file col-md-7"
							   onChange={previewImage}/>
						<button type="button" className="btn btn-secondary col"
								disabled={!this.props.file} onClick={startUpload}>
							Tell me tags!
						</button>
					</form>
				</div>
			</div>
		);
	}
};

UploadForm = connect(
	state => {
		return {
			previewImageSrc: get(state, 'upload.previewImageSrc'),
			file: get(state, 'upload.file'),
			percent: get(state, 'upload.percent')
		}
	},
	dispatch => {
		return {
			previewImageChanged: (src, file) => {
				dispatch(actionCreators.fileSelected(src, file))
			},
			loadingProgress: percent => {
				dispatch(actionCreators.loadingProgress(percent))
			},
			tagsLoaded: tags => {
				dispatch(actionCreators.tagsLoaded(tags))
			}
		}
	}
)(UploadForm);

export {UploadForm};
