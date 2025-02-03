import Loader from "@/components/UI/loader";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const GlobalLoader: React.FC = () => {
	const isMutating = useIsMutating();
	const isFetching = useIsFetching();

	return isFetching || isMutating ? (
		<div className="fixed top-layout right-layout z-50000">
			<Loader />
		</div>
	) : null;
};

export default GlobalLoader;
