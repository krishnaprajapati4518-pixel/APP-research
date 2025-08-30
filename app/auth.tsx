import { useAuth} from "@/Lib/auth-context";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput , useTheme} from "react-native-paper";
import {useState} from "react"; 
export default function AuthScreen() {
    const [isSignUp, setIsSignUp] =useState<boolean>(false);
    const [email,setEmail] =useState<string>("");
    const [password,setPassword] =useState<string>("");
    const [error, setError] =useState<string | null>("")

    
    const theme =useTheme();
    const router = useRouter();
    const { signIn, signUp} =useAuth(); 

    const handleAuth = async () =>{
    if (!email || !password) {
        setError("Please Fill in all the fields.");
        return;
    }
    if (password.length< 6) {
        setError("Passwords must be at least 6 characters long.")
    
return;    }
 setError(null)
 
 if(isSignUp) {
    const error = await signUp(email, password)
    if (error) {
        setError(error)
        return
    }
 }else{
   const error =  await signIn(email, password)
   if (error) {
        setError(error)
        return;
        
 }

  router.replace("/")
    };
const handleSwitchMode =() => {
    setIsSignUp((prev) => ! prev);
}

    return(
        <KeyboardAvoidingView
        behavior= {Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
        >
            <View         style={styles.content}
>
                <Text style={styles.title} variant="headlineMedium">
                    {""}
                     { isSignUp ? "Create Account" : "Welcome Back"}</Text>

                <TextInput  style={styles.input}
                 label = "Email"
                 autoCapitalize="none"  
                 keyboardType="email-address"
                placeholder="exampe.gmail.com"
                mode="outlined"
                onChangeText={setEmail}
                />
                 <TextInput
                 label = "Password"
                 autoCapitalize="none"  
                 keyboardType="email-address"
                mode="outlined"
                 style={styles.input}
                 onChangeText={setPassword}
                 secureTextEntry
                />
            {error && <Text style={{color: theme.colors.error }}> {error}</Text>}

                <Button mode="contained" 
                 style={styles.button} onPress={handleAuth}>
                    {isSignUp ? "Sign Up" : "Sign In"}</Button>
                <Button mode="text" onPress={(handleSwitchMode)} style={styles.switchModeButton}> {isSignUp ? "Already Have an acoount?" : "Don't Have an acocunt? Sign Up" }</Button>

            </View>
        </KeyboardAvoidingView>    
    );
}

const styles =StyleSheet.create({
 container: {
    flex : 1,
    backgroundColor: "rgba(137, 41, 137, 0.33)"
 },

 content: {
    flex : 1,
    backgroundColor: "rgba(242, 1, 242, 0.33)",
    padding: 16,

    justifyContent: "center",
 },
  title: {
    textAlign: "center",
    marginBottom: 24,
},
 input: {
    marginBottom: 14,
},
 button: {
    marginTop: 8,
},
  switchModeButton: {
    marginTop: 16,
},
}) }