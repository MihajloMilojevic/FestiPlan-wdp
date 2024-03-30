import {createContext, useContext, useState, useEffect} from "react";
import APIs from "../api/API";
import static_data from "../organizatori_festivala_engleski.json"

const AppContext = createContext();

export default function AppContextProvider({children }) {
	const [searchText, setSearchText] = useState("");
	const [data, setData] = useState(APIs.parseData(static_data));
	console.log(data)
	return (
		<AppContext.Provider
			value={{
				searchText, setSearchText,
				data, setData
			}}
		>	
			{children}
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}