import { useAuth } from "@/Lib/auth-context";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/auth"); // Redirect to auth screen after sign out
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Home</Text>
      <Button mode="text" onPress={handleSignOut} icon="logout">
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
