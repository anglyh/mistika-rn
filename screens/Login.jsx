import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import logo from "../assets/images/logo.png";
import { GlobalText } from "../components/GlobalText";
import { CustomTextInput } from "../components/CustomTextInput";
import * as NavigationBar from "expo-navigation-bar";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";

export function Login() {
  const navigation = useNavigation();

  // Estados para los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  // Referencias para los inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.40:5000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) { // Cambiado a 200
        alert("Inicio de sesión correcto");
        navigation.navigate("Home");
        setEmail(""); // Limpiar el campo de email
        setPassword(""); // Limpiar el campo de contraseña
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(error.response.data.msg || "Error de inicio de sesión");
      } else {
        setError("Ocurrió un error al iniciar sesión");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="flex-1 justify-between items-center bg-white"
          style={{ paddingVertical: 8 }}
        >
          <View className="w-4/5 flex">
            <View className="w-full max-w-[300px] aspect-square">
              <Image
                className="w-full h-full"
                resizeMode="contain"
                source={logo}
              />
            </View>

            <View className="w-full flex" style={{ gap: 9 }}>
              <GlobalText style={styles.title}>Inicia sesión</GlobalText>

              {error ? (
                <GlobalText style={{ color: 'red' }}>{error}</GlobalText> // Mostrar error si existe
              ) : null}

              {/* Campo de Correo Electrónico */}
              <CustomTextInput
                ref={emailInputRef}
                iconName="mail-outline"
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current.focus()}
                returnKeyType="next"
              />

              {/* Campo de Contraseña */}
              <CustomTextInput
                ref={passwordInputRef}
                iconName="lock-closed-outline"
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
              />

              {/* Botón de Registro */}
              <Button
                onPress={handleLogin}
                buttonStyles={{ marginTop: 16 }}
                content="Iniciar Sesión"
              />
            </View>
          </View>

          <View className="flex flex-row gap-2">
            <GlobalText style={{ color: "#223049", fontSize: 15 }}>
              ¿No tienes cuenta?
            </GlobalText>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <GlobalText style={{ color: colors.secundario, fontSize: 15 }}>
                Regístrate
              </GlobalText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "DMSans_SemiBold",
    color: colors.secundario,
    marginBottom: 16,
  },
});
