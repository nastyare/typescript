import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOutsideClick from "../hooks/useOutsideClick";
import { copyTask } from "../redux/tasksSlice";

interface ShareModalProps {
	onClose: () => void;
	title: string;
	fullDescription: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
	onClose,
	title,
	fullDescription,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const images = [
		{ src: "../src/assets/images/copy.svg", alt: "Copy", class: "copy" },
		{
			src: "../src/assets/images/telegram.svg",
			alt: "Telegram",
			class: "telegram",
		},
		{ src: "../src/assets/images/vk.svg", alt: "VK", class: "vk" },
		{
			src: "../src/assets/images/whatsapp.svg",
			alt: "WhatsApp",
			class: "whatsapp",
		},
		{
			src: "../src/assets/images/facebook.svg",
			alt: "Facebook",
			class: "facebook",
		},
	];

	useOutsideClick(modalRef, onClose);

	return (
		<div className="share-section background">
			<div className="share-window" ref={modalRef}>
				<ul className="menu">
					{images.map((image) => (
						<li key={image.alt}>
							<img
								className={image.class}
								src={image.src}
								alt={image.alt}
								onClick={
									image.class === "copy"
										? () => dispatch(copyTask({ title, fullDescription }))
										: undefined
								}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ShareModal;
