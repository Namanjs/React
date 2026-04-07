import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(() => {
        const savedToken = localStorage.getItem("jiraToken");
        return savedToken ? { name: "Admin", token: savedToken } : null;
    });

    function login(username){ //would also take password for real auth, this is just a fake token
        const fakeToken = "xyz_abc_123_fake_jwt_token";

        localStorage.setItem("jiraToken", fakeToken);
        setUser({ name: username, token: fakeToken });
    };

    function logout(){
        localStorage.removeItem("jiraToken");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}