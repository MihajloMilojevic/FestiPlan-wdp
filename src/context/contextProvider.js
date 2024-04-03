import {createContext, useContext, useState, useEffect} from "react";
import APIs from "../api/API";
import static_data from "../organizatori_festivala_engleski.json"
import { Modal } from "../components/common";

const AppContext = createContext();

export default function AppContextProvider({children }) {
	const [searchText, setSearchText] = useState("");
	const [data, setData] = useState(APIs.parseData(static_data));
	const [navHeight, setNavHeight] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [modalUseDefaultStyles, setModalUseDefaultStyles] = useState(true);
	const [modalContentWrapperStyles, setModalContentWrapperStyles] = useState({});
	const [modalContentWrapperClassName, setModalContentWrapperClassName] = useState("");

	const modal ={
		open: (content, {useDefaultStyles, contentWrapperStyles, contentWrapperClassName} = {}) => {
			setModalUseDefaultStyles(useDefaultStyles ?? true);
			setModalContentWrapperClassName(contentWrapperClassName ?? "");
			setModalContentWrapperStyles(contentWrapperStyles ?? {});
			setModalContent(content);
			setIsModalOpen(true);
		},
		close: () => {
			setIsModalOpen(false);
		}
	
	}
	return (
		<AppContext.Provider
			value={{
				searchText, setSearchText,
				data, setData,
				navHeight, setNavHeight,
				modal
			}}
		>	
			{children}
			<Modal 
				isOpen={isModalOpen} 
				useDefaultStyles={modalUseDefaultStyles}
				contentWrapperStyles={modalContentWrapperStyles}
				contentWrapperClassName={modalContentWrapperClassName}
			>
				{modalContent}
			</Modal>
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}