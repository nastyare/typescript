import React from "react";

interface AddButtonProps {
	onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
	<button className="add-button" onClick={onClick} />
);

export default AddButton;
