import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { Button } from "../components/Button";
import logo from "../assets/images/logo.png";
import { GlobalText } from "../components/GlobalText";
import { CustomTextInput } from "../components/CustomTextInput";
import colors from "../theme/colors";
import { authService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export function Register({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext); // Importamos el contexto

  // Estados para los nuevos campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Referencias para los inputs
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Función para manejar el registro
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const data = await authService.register(name, email, password);
      if (data.token) {
        alert("Usuario creado correctamente");
        setIsLoggedIn(true); // Cambiar el estado de autenticación
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert("Error de registro", error.response.data.message);
      } else {
        alert("Error de registro", "Ocurrió un error al crear el usuario");
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
              <GlobalText style={styles.title}>Crea una cuenta</GlobalText>

              {/* Campo de Nombre */}
              <CustomTextInput
                iconName="person-outline"
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
                onSubmitEditing={() => emailInputRef.current.focus()}
                returnKeyType="next"
              />

              {/* Campo de Correo Electrónico */}
              <CustomTextInput
                ref={emailInputRef}
                iconName="mail-outline"
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                returnKeyType="next"
              />

              {/* Campo de Confirmar Contraseña */}
              <CustomTextInput
                ref={confirmPasswordInputRef}
                iconName="lock-closed-outline"
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                onSubmitEditing={handleRegister}
                returnKeyType="done"
              />

              {/* Botón de Registro */}
              <Button
                onPress={handleRegister}
                buttonStyles={{ marginTop: 16 }}
                content="Registrarse"
              />
            </View>
          </View>

          <View className="flex flex-row gap-2">
            <GlobalText style={{ color: "#223049", fontSize: 15 }}>
              ¿Ya tienes una cuenta?
            </GlobalText>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <GlobalText style={{ color: colors.secundario, fontSize: 15 }}>
                Inicia sesión
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
