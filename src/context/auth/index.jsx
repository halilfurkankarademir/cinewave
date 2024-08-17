import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore, doc, getDoc } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Yeni state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser({ ...user });
                setUserLoggedIn(true);

               
                const userDocRef = doc(firestore, `users/${user.uid}`);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userProfile = userDoc.data();
                    setIsAdmin(userProfile.role === "admin"); 
                }
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setIsAdmin(false); 
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        isAdmin, 
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
