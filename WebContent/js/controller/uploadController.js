myApp
		.controller(
				"uploadController",
				function($scope) {
					$scope.imageUrl="https://s3-us-west-2.amazonaws.com/govindmediastore/";
					$scope.test = "TTTTTTTTTTTT"
					$scope.sizeLimit = 10585760; // 10MB in Bytes
					 $scope.uploadProgress = 0;
					$scope.imageType=['gif','png','jpg','jpeg'];
					
					$scope.fileName="media/RXMP8J2l-Govind.jpg";
					$scope.upload = function() {

						AWS.config
								.update({
									accessKeyId : "XXXXXXXXXXXXXXXXX",
									secretAccessKey : "XXXXXXXXXXXXXXXXXXX"
								});
						AWS.config.region = 'us-east-1';
						var bucket = new AWS.S3({
							params : {
								Bucket : "govindmediastore"
							}
						});
						
						var fileExtension=$scope.file.name;
						fileExtension=fileExtension.split('.').pop().toLowerCase();
						console.log(fileExtension)
						var flag=false;
						for(var i=0;i<$scope.imageType.length;i++){
							if($scope.imageType[i]===fileExtension)
								{
								flag=true
								break;
								}
								
						}
						if(!flag)
							{
							toastr.error('file type not allow')
							return
							}
							
						if ($scope.file) {
							// Perform File Size Check First
							var fileSize = Math
									.round(parseInt($scope.file.size));
							if (fileSize > $scope.sizeLimit) {
								toastr.error(
										'Sorry, your attachment is too big. <br/> Maximum '
												+ $scope.fileSizeLabel()
												+ ' file attachment allowed',
										'File Too Large');
								return false;
							}
							// Prepend Unique String To Prevent Overwrites
							var uniqueFileName = "media/"+$scope.uniqueString() + '-'
									+ $scope.file.name;

							var params = {
								Key : uniqueFileName,
								ContentType : $scope.file.type,
								Body : $scope.file,
								ServerSideEncryption : 'AES256'
							};

							bucket
									.putObject(params, function(err, data) {
										if (err) {
											toastr.error(err.message,err.code);
											// alert(err.message, err.code)
											return false;
										} else {
											// Upload Successfully Finished
											 toastr.success('File Uploaded Successfully', 'Done');
											 $scope.image=$scope.imageUrl+uniqueFileName;		
											//alert('File Uploaded Successfully')
											// Reset The Progress Bar
											setTimeout(function() {
												$scope.uploadProgress = 0;
												$scope.$digest();
											}, 4000);
										}
									})
									.on(
											'httpUploadProgress',
											function(progress) {
												$scope.uploadProgress = Math
														.round(progress.loaded
																/ progress.total
																* 100);
												$scope.$digest();
											});
						} else {
							// No File Selected
							// alert('Please select a file to upload')
							 toastr.error('Please select a file to upload');
						}
					}

					$scope.fileSizeLabel = function() {
						// Convert Bytes To MB
						return Math.round($scope.sizeLimit / 1024 / 1024)
								+ 'MB';
					};

					$scope.uniqueString = function() {
						var text = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

						for (var i = 0; i < 8; i++) {
							text += possible.charAt(Math.floor(Math.random()
									* possible.length));
						}
						return text;
					}
					
					
					$scope.deleteMedia=function(){
				
						var params = {
								Key : $scope.fileName
								
							};
						
						bucket
						.deleteObject(params, function(err, data) {
							if (err) {
								toastr.error(err.message,err.code);
								return false;
							} else {
								 toastr.success('File Delete Successfully', 'Done');
								 $scope.image=$scope.imageUrl+uniqueFileName;		
								setTimeout(function() {
									$scope.uploadProgress = 0;
									$scope.$digest();
								}, 4000);
							}
						})
						.on(
								'httpUploadProgress',
								function(progress) {
									$scope.uploadProgress = Math
											.round(progress.loaded
													/ progress.total
													* 100);
									$scope.$digest();
								});
				
					}
					
				});