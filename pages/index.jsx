import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';
import axios from 'axios';

const index = () => {
	const [ images, setImages ] = useState([
		{
			public_id: 'i8clkmxwmjjtrhcron4d',
		},
		{ public_id: 'kx9afj0mjie3xgwrh3qn' },
	]);

	const onDrop = useCallback((files) => {
		const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`;

		files.forEach(async (file) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET); // unsigned upload at cloudinary
			const res = await axios.post(url, formData);
			setImages((old) => [ ...old, res.data ]);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

	return (
		<div>
			<div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : null}`}>
				<input {...getInputProps()} />
				Drop Zone
			</div>
			<ul>
				{images &&
					images.map((img) => (
						<li key={img.public_id}>
							<Image
								cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
								public_id={img.public_id}
								width={300}
							/>
						</li>
					))}
			</ul>
		</div>
	);
};

export default index;
