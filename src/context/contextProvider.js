import {createContext, useContext, useState, useEffect} from "react";
import APIs from "../api/API";
import static_data from "../organizatori_festivala_engleski.json"
import { Modal } from "../components/common";
import { User } from "../models";
import { Toaster } from 'react-hot-toast';

const AppContext = createContext();

export default function AppContextProvider({children }) {
	const [searchText, setSearchText] = useState("");
	const [user, setUser] = useState(null);
	const [data, setData] = useState(APIs.parseData(static_data));
	const [navHeight, setNavHeight] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [modalUseDefaultStyles, setModalUseDefaultStyles] = useState(true);
	const [modalContentWrapperStyles, setModalContentWrapperStyles] = useState({});
	const [modalContentWrapperClassName, setModalContentWrapperClassName] = useState("");

	useEffect(() => {
		const inSessionData = sessionStorage.getItem("user");
		console.log(inSessionData)
		if(!inSessionData) {
			return;
		}
		console.log(inSessionData)
		const data = JSON.parse(inSessionData);
		setUser(new User(...data))
	}, [])

	useEffect(() => {
		if(user)
			sessionStorage.setItem("user", JSON.stringify([user.id, user.username, user.password, user.name, user.surname, user.email, user.dateOfBirth, user.address, user.phone, user.profession]))
		else 
			sessionStorage.removeItem("user")
	}, [user])

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
			setModalContent(null);
		}
	
	}
	return (
		<AppContext.Provider
			value={{
				searchText, setSearchText,
				data, setData,
				navHeight, setNavHeight,
				modal,
				user, setUser
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
			<Toaster
				containerStyle={{
					zIndex: 99999999
				}}
				position="top-center"
				reverseOrder={false}
			/>
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}