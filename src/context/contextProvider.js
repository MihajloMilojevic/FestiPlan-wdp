import {createContext, useContext, useState, useEffect} from "react";

const AppContext = createContext();

export default function AppContextProvider({children }) {

	return (
		<AppContext.Provider
			value={{}}
		>	
			{children}
		</AppContext.Provider>	
	)
}

export function useAppContext() {
	return useContext(AppContext)
}