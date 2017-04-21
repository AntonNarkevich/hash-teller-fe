'use strict';

import React from 'react';
import {ImagePreview} from './image-preview/image-preview.jsx'
import {LoadingBar} from './loading-bar/loading-bar.jsx'
import {connect} from 'react-redux';
import {get} from 'lodash';
import * as actionCreators from '../../action-creators.js';
import './upload-form.less';
import Avatar from 'material-ui/Avatar';
import {themeColor} from '../../constants.js';

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
			const {file, loadingProgress} = this.props;

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
			if (this.props.labels &&this.props.labels.length) {
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
						<Avatar className="col"
								backgroundColor={this.props.percent === 100 ? themeColor : null}>1/2</Avatar>
					</div>
				</div>

				<div className="row align-items-center mb-3">
					<div className="col-md-4">
						<ImagePreview previewImageSrc={this.props.previewImageSrc || 'img/image-placeholder.png'}/>
					</div>

					<div className="col-md-8">
						<LoadingBar percent={this.props.percent} label={getLoadingBarLabel()}/>

						<form className="form-inline">
							<input type="file" className="form-control-file col-md-7"
								   accept='image/*'
								   onChange={previewImage}/>
							<button type="button" className="btn btn-secondary col"
									disabled={!this.props.file || (this.props.percent > 0 && this.props.percent < 100) || this.props.tagsLoadingProgress} onClick={startUpload}>
								Start!
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
			previewImageSrc: get(state, 'upload.previewImageSrc'),
			tagsLoadingProgress: get(state, 'upload.tagsLoadingProgress'),
			file: get(state, 'upload.file'),
			percent: get(state, 'upload.percent'),
			labels: state.labels
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
			labelsLoaded: rekognitionData => {
				dispatch(actionCreators.labelsLoaded(rekognitionData))
			}
		}
	}
)(UploadForm);

export {UploadForm};
