import { useEffect } from "react";

type UseOutsideClickRef = React.RefObject<HTMLElement>;
type UseOutsideClickHandler = () => void;

const useOutsideClick = (
	ref: UseOutsideClickRef,
	onClose: UseOutsideClickHandler
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, onClose]);
};

export default useOutsideClick;
