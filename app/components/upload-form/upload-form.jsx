'use strict';

import React, { PureComponent } from 'react';
import { ImagePreview } from './image-preview/image-preview.jsx';
import { LoadingBar } from './loading-bar/loading-bar.jsx';
import { connect } from 'react-redux';
import * as actionCreators from '../../action-creators.js';
import { loadingProgress, labelsLoaded } from '../../action-creators.js';
import './upload-form.less';
import Avatar from 'material-ui/Avatar';
import { themeColor } from '../../constants.js';

let UploadForm = class extends PureComponent {
	render() {
		const self = this;

		const previewImage = function(event) {
			let fileReader = new FileReader();
			let file = event.target.files[0];
			fileReader.readAsDataURL(file);

			fileReader.onload = oFREvent => {
				let src = oFREvent.target.result;
				self.props.previewImageChanged(src, file);
			};
		};

		const startUpload = () => {
			const { file, loadingProgress } = this.props;

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

			bucket
				.putObject(params)
				.on('httpUploadProgress', function(progress) {
					let percent = Math.ceil(progress.loaded / progress.total * 100);
					loadingProgress(percent);
				})
				.send(err => {
					if (err) {
						console.error(err);

						return;
					}

					const params = {
						Image: {
							S3Object: {
								Bucket: bucketName,
								Name: objKey
							}
						}
					};

					let rekognition = new AWS.Rekognition();
					rekognition.detectLabels(params, (err, data) => {
						if (err) {
							console.error(err);

							return;
						}

						self.props.labelsLoaded(data);
					});
				});
		};

		const getLoadingBarLabel = () => {
			if (this.props.labels && this.props.labels.size) {
				return 'Recognized';
			}

			if (this.props.percent === 100) {
				return 'Recognizing...';
			}

			return `${this.props.percent}%`;
		};

		return (
			<div className="upload-form-wrap">

				<div className="row mb-3 justify-content-center">
					<div className="d-inline-flex">
						<Avatar
							className="col"
							backgroundColor={this.props.percent === 100 ? themeColor : null}
						>
							1/2
						</Avatar>
					</div>
				</div>

				<h4 className="mb-3">Step 1: Upload a photo</h4>

				<div className="row align-items-center mb-4">
					<div className="col-md-4">
						<ImagePreview
							previewSrc={this.props.previewSrc || 'img/image-placeholder.png'}
						/>
					</div>

					<div className="col-md-8">
						<LoadingBar
							percent={this.props.percent}
							label={getLoadingBarLabel()}
						/>

						<form className="form-inline">
							<input
								type="file"
								className="form-control-file col-md-7"
								accept="image/*"
								onChange={previewImage}
							/>
							<button
								type="button"
								className="btn btn-secondary col"
								disabled={
									!this.props.file ||
										(this.props.percent > 0 && this.props.percent < 100) ||
										this.props.tagsLoadingProgress
								}
								onClick={startUpload}
							>
								Start
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
};

UploadForm = connect(
	state => {
		return {
			previewSrc: state.getIn(['imageData', 'previewSrc']),
			tagsLoadingProgress: state.getIn(['tagsData', 'tagsLoadingProgress']),
			file: state.getIn(['imageData', 'file']),
			percent: state.getIn(['imageData', 'uploadPercent']),
			labels: state.get('labels')
		};
	},
	{
		previewImageChanged: actionCreators.fileSelected,
		loadingProgress,
		labelsLoaded
	}
)(UploadForm);

export { UploadForm };
