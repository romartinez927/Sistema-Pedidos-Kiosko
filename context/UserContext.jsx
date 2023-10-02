import {useState} from "react";
import { createContext } from "react";
export const UserContext = createContext({});
export const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token'))
    return (
        <UserContext.Provider value={{
            user,
            setUser,
            accessToken,
            setAccessToken
        }}>
            {children}
        </UserContext.Provider>
    );
}