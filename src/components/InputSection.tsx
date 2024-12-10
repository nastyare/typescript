import React from "react";

interface InputSectionProps {
	title: string;
	description: string;
	setTitle: (value: string) => void;
	setDescription: (value: string) => void;
	handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
	title,
	description,
	setTitle,
	setDescription,
	handleKeyPress,
}) => (
	<div className="input-section">
		<input
			type="text"
			name="title-field"
			className="title input-element"
			placeholder="Title..."
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		/>
		<input
			type="text"
			name="description-field"
			className="description input-element"
			placeholder="About..."
			value={description}
			onChange={(e) => setDescription(e.target.value)}
			onKeyDown={handleKeyPress}
		/>
	</div>
);

export default InputSection;
