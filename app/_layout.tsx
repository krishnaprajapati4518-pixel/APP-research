import { AuthProvider, useAuth } from "@/Lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
 const { user,  isLoadingUser} = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth"

   
      if (!user && !inAuthGroup && !isLoadingUser) {
        // Not logged in → redirect to auth
        router.replace("/auth");
      } else if (user && inAuthGroup && !isLoadingUser) {
        // Logged in → redirect to tabsS
        router.replace("/");
      }
    }, [user, segments]);


  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          {/* Protected app routes */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
// import { AuthProvider, useAuth } from "@/Lib/auth-context";
// import { Stack, useRouter, useRootNavigationState, useSegments } from "expo-router";
// import { useEffect } from "react";

// function RouteGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const rootNavigation = useRootNavigationState();
//   const { user } = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
//     const inAuthgroup =segments[0]  === "auth"
//     if (!user && inAuthGroup) {
//       router.replace("/auth");
//     }else if ( user && inAuthgroup){ 
//       .replace("/");
//     }
//    }, [user, segments,]);
// /* const isAuth = !!user; // ✅ define authentication state

//   useEffect(() => {
//     if (!rootNavigation?.key) return; // ✅ wait until nav is mounted

//     if (!isAuth && segments[0] !== "auth") {
//       // ✅ redirect only if not already inside /auth
//       setTimeout(() => {
//         router.replace("/auth");
//       }, 0);
//     }
//   }, [isAuth, rootNavigation, segments]);*/

//   return <>{children}</>;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RouteGuard>
//         <Stack>
//           {/* ✅ Protect app routes */}
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           {/* Let /auth load without guard */}
//           <Stack.Screen name="auth" options={{ headerShown: false }} />
//         </Stack>
//       </RouteGuard>
//     </AuthProvider>
//   );
// }

// /*import { AuthProvider } from "@/Lib/auth-context";
// import { Stack, useRouter, useRootNavigationState } from "expo-router";
// import { useEffect } from "react";

// function RouteGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const rootNavigation = useRootNavigationState();

//   const {user} = useAuth();
//   const segments = useSegments()

//   useEffect(() => {
//     if (!rootNavigation?.key) return; // ✅ wait until nav is mounted

//     if (!isAuth) {
//       setTimeout(() => {
//         router.replace("/auth"); // ✅ defer navigation
//       }, 0);
//     }
//   }, [isAuth, rootNavigation]);

//   return <>{children}</>;
// }

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//     <RouteGuard>
//       <Stack>
//     //    {/* ✅ Only include Tabs, not auth */
//   /*      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       </Stack>
//     </RouteGuard>
//     </AuthProvider>
//   );
// } */