import {createContext, useContext, useState, useEffect} from "react";

const AppContext = createContext();

export default function AppContextProvider({children }) {
	const [searchText, setSearchText] = useState("");
	return (
		<AppContext.Provider
			value={{
				searchText, setSearchText
			}}
		>	
			{children}
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}