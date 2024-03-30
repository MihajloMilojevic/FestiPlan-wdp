import {createContext, useContext, useState, useEffect} from "react";
import APIs from "../api/API";
import static_data from "../organizatori_festivala_engleski.json"

const AppContext = createContext();

export default function AppContextProvider({children }) {
	const [searchText, setSearchText] = useState("");
	const [data, setData] = useState(APIs.parseData(static_data));
	const [navHeight, setNavHeight] = useState(0);

	return (
		<AppContext.Provider
			value={{
				searchText, setSearchText,
				data, setData,
				navHeight, setNavHeight
			}}
		>	
			{children}
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}