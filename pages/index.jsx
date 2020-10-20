import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const index = () => {
	const onDrop = useCallback((files) => {
		console.log(files);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

	return (
		<div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : null}`}>
			<input {...getInputProps()} />
			Drop Zone
		</div>
	);
};

export default index;
