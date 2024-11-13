import { StyleSheet, View, Image, Modal, ScrollView } from "react-native";
import React, { useState, useMemo } from "react";
import { ClientDetailsInfoCard } from "../../components/ClientDetailsInfoCard";
import { Button } from "../../components/Button";
import { useAuthContext } from "../../context/AuthContext";
import { makeReservation } from "../../services/makeReservations";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalText } from "../../components/GlobalText";

// Opciones de menú para Restaurante
const RESTAURANT_MENU_OPTIONS = [
  { id: 1, name: "Menú Individual", price: 25 },
  { id: 2, name: "Menú Familiar", price: 45 },
  { id: 3, name: "Menú Especial", price: 35 }
];

// Opciones de servicios para Hotel
const HOTEL_SERVICE_OPTIONS = [
  { id: 1, name: "Habitación Simple", price: 100 },
  { id: 2, name: "Habitación Doble", price: 180 },
  { id: 3, name: "Suite", price: 250 }
];

export function ClientDetailsScreen({ route }) {
  const { user } = useAuthContext();
  const { clientId, image, clientType } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleReservation = () => {
    setModalVisible(true);
  };

  const handleConfirmReservation = async () => {
    try {
      const reservationData = {
        userId: user.userId,
        clientId,
        reservationDate,
        status: "pendiente",
        paymentInfo: {
          amount: selectedOption.price,
          method: paymentMethod,
          paymentDate: new Date(),
        },
      };

      const result = await makeReservation(reservationData);
      console.log("Reserva creada", result);
      setModalVisible(false);
    } catch (error) {
      console.error("Error creando la reserva: ", error);
    }
  };

  const options = useMemo(() => {
    return clientType === "Hotel" ? HOTEL_SERVICE_OPTIONS : RESTAURANT_MENU_OPTIONS;
  }, [clientType]);

  return (
    <View className="flex-1 justify-between bg-primario">
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <View className="flex-1"></View>
      <View style={styles.container}>
        <ClientDetailsInfoCard item={route.params} />
        <View style={styles.restaurantDetails}>
          <Button content="Reservar" onPress={handleReservation} fullWidth />
        </View>
      </View>
      <ReservationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmReservation}
        reservationDate={reservationDate}
        setReservationDate={setReservationDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
        clientType={clientType}
      />
    </View>
  );
}

function ReservationModal({
  visible,
  onClose,
  onConfirm,
  reservationDate,
  setReservationDate,
  paymentMethod,
  setPaymentMethod,
  showDatePicker,
  setShowDatePicker,
  selectedOption,
  setSelectedOption,
  options,
  clientType
}) {
  const paymentMethods = ["tarjeta", "efectivo", "movil"];

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setReservationDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <GlobalText style={styles.modalTitle}>
              {clientType === "Hotel" ? "Nueva Reserva de Habitación" : "Nueva Reservación"}
            </GlobalText>

            {/* Selección de opciones (Menú o Servicio) */}
            <View style={styles.inputContainer}>
              <GlobalText style={styles.inputLabel}>
                {clientType === "Hotel" ? "Selecciona tu Habitación" : "Selecciona tu Menú"}
              </GlobalText>
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedOption?.id === option.id ? "filled" : "outlined"}
                    onPress={() => setSelectedOption(option)}
                    content={`${option.name} - S/.${option.price}`}
                    size="small"
                    buttonStyles={styles.optionButton}
                  />
                ))}
              </View>
            </View>

            {/* Fecha de reserva */}
            <View style={styles.inputContainer}>
              <GlobalText style={styles.inputLabel}>Fecha de Reserva</GlobalText>
              <Button
                variant="outlined"
                onPress={() => setShowDatePicker(true)}
                content={reservationDate.toLocaleDateString()}
                buttonStyles={styles.dateButton}
                size="small"
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={reservationDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            {/* Método de pago */}
            <View style={styles.inputContainer}>
              <GlobalText style={styles.inputLabel}>Método de Pago</GlobalText>
              <View style={styles.paymentMethodsContainer}>
                {paymentMethods.map((method) => (
                  <Button
                    key={method}
                    variant={paymentMethod === method ? "filled" : "outlined"}
                    onPress={() => setPaymentMethod(method)}
                    content={method.charAt(0).toUpperCase() + method.slice(1)}
                    size="small"
                    buttonStyles={styles.paymentMethod}
                  />
                ))}
              </View>
            </View>

            {/* Monto total */}
            {selectedOption && (
              <View style={styles.inputContainer}>
                <GlobalText style={styles.inputLabel}>Monto Total</GlobalText>
                <View style={styles.amountContainer}>
                  <GlobalText style={styles.amountText}>
                    S/.{selectedOption.price.toFixed(2)}
                  </GlobalText>
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <Button
                variant="outlined"
                content="Cancelar"
                onPress={onClose}
                buttonStyles={[styles.modalButton, styles.cancelButton]}
                size="small"
              />
              <Button
                content="Confirmar"
                onPress={onConfirm}
                buttonStyles={[styles.modalButton, styles.confirmButton]}
                size="small"
                disabled={!selectedOption}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  image: {
    width: "100%",
    position: "absolute",
    height: "50%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    height: "50%",
  },
  container: {
    height: "65%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 9,
    paddingHorizontal: 16,
  },
  restaurantDetails: {
    marginTop: 20,
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 24,
    fontFamily: "DMSans_SemiBold"
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  optionButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
  },
  dateButton: {
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    height: 48,
  },
  paymentMethodsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  paymentMethod: {
    flex: 1,
    height: 48,
    borderRadius: 12,
  },
  amountContainer: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
  },
});