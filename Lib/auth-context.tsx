import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./Appwrite";
import { useRouter } from "expo-router";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
  try {
    const current = await account.get();
    setUser(current);
  } catch (error) {
    // No session or guest user → just set user to null
    setUser(null);
  } finally {
    setIsLoadingUser(false);
  }
};


  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password); // auto login after signup
      return null;
    } catch (error) {
      if (error instanceof Error) 
        return error.message;      
    }
    return "An error occured during signup";
  };

const signIn = async (email: string, password: string) => {
  try {
    // Create session
    await account.createEmailPasswordSession(email, password);

    // Get the actual user info
    const currentUser = await account.get();
    setUser(currentUser);

    return null;
  } catch (error) {
    if (error instanceof Error) return error.message;
    return "An error occurred during sign in";
  }
};

   
  const signOut =async () => {
    try{
    await account.deleteSession("current");
    setUser(null);
  } catch (error) {
    console.log(error);
  }
  };


  return (
    <AuthContext.Provider 
    value={{ user, isLoadingUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return context;
}

// import { createContext, useContext, useEffect, useState } from "react";
// import { ID, Models } from "react-native-appwrite";
// import { account } from "./Appwrite";

// type AuthContextType = {
//   user: Models.User<Models.Preferences> | null;
//  isLoadingUser: boolean;
//   signUp: (email: string, password: string) => Promise<string | null>;
//   signIn: (email: string, password: string) => Promise<string | null>;
//     signOut:  () => Promise<void>; // ✅ no params, just logout
// };
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

// const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
//   useEffect(() => {
//     getUser();
//   }, []);

// //   const signOut = async () => {
// //   try {
// //     await account.deleteSession("current"); // ✅ Appwrite logout
// //     setUser(null);
// //   } catch (error) {
// //     console.error("Error during sign out:", error);
// //   }
// // };

//   const getUser = async () => {
//     try {
//       const session = await account.get();
//       setUser(session);
//     } catch (error) {
//       setUser(null);
//     }finally {
//         setIsLoadingUser(false);
//     }
//   };

//   const signUp = async (email: string, password: string) => {
//     try {
//       await account.create(ID.unique(), email, password);
//       await signIn(email, password); // auto sign-in after signup
//       return null;
//     } catch (error) {
//       if (error instanceof Error) {
//         return error.message;
//       }
//       return "An error occurred during signup";
//     }
//   };

//   const signIn = async (email: string, password: string) => {
//     try {
//       await account.createEmailPasswordSession(email, password);
//       await getUser(); // refresh user state
//       return null;
//     } catch (error) {
//       if (error instanceof Error) {
//         return error.message;
//       }
//       return "An error occurred during sign in";
//     }
//   };
   
//    const signOut =async () => {
//     try{
//     await account.deleteSession("current");
//     setUser(null);
//     } catch(error){
//          console.error("Error during sign out:", error);
//   }
//    };
//   return (
//     <AuthContext.Provider value={{ user, isLoadingUser, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be inside of the AuthProvider");
//   }
//   return context;
// }

// /*import { createContext, useContext, useEffect, useState } from "react";
// import {ID, Models} from "react-native-appwrite";
// import { account } from "./Appwrite";

// type AuthContextType= {
//    user: Models.User<Models.Preferences> | null;

//     signUp: (email: string, password: string) => Promise<string | null>;
//         signIn: (email: string, password: string) => Promise<string | null>;

// };
// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({children}: {children: React.ReactNode}){
// const [user, setUser]= useState<Models.User<Models.Preferences> | null>(
//     null)
// ;
// useEffect(( ) => {
// getUser();

// }, []);

// const getUser =async () => {
//     try{
//         const session =await account.get()
//             setUser(session)
//     }catch (error){
//         setUser(null)
//     }
        
//     }
// }
    
//     const signUp = async (email: string, password: string) =>{
//         try{
//    await account.create(ID.unique(), email, password) 
//    await signIn(email, password) ;
//    return null
//         }catch (error){
//  if(error instanceof Error){
//     return error.message;
//  }   return "An error occured during signup";
//         }
//     };
//         const signIn = async (email: string, password: string) =>{
// try{
//    await account.createEmailPasswordSession(email, password) ;
//    return null;
//         }catch (error){
//  if(error instanceof Error){
//     return error.message;
//  }   return "An error occured during sign in";
//         }
//     };

//     return (
//     <AuthContext.Provider value={{ user, signIn, signUp}}
//     >
//         {children}
//     </AuthContext.Provider>
//     );
// }
// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be inside of the AuthProvider");
//   }

// return context;
// }*/