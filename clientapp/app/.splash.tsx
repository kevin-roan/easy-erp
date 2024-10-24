import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Easy ERP</Text>
        <Text style={styles.subtitle}>Manage your business with ease.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    color: "#464343",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#5E5E5E",
  },
});
