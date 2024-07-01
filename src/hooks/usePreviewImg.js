import { useState } from "react";
import useShowToast from "./useShowToast";
import { maxFileSizeInBytes } from "../assets/constants";

const usePreviewImg = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const showToast = useShowToast();
	// const maxFileSizeInBytes = 5 * 1024 * 1024; // 5MB

	const handleImageChange = (e, profile) => {
		const file = e.target.files[0];
		// console.log(file.type)
		if (!profile && file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
			if (file.size > maxFileSizeInBytes) {
				showToast("", "File size must be less than 5MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else if (profile && file && file.type.startsWith("image/")){
			if (file.size > maxFileSizeInBytes) {
				showToast("", "File size must be less than 5MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("", "Please select an image or video file", "error");
			setSelectedFile(null);
		}
	};

	return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
