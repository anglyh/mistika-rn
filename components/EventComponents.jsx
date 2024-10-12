import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { GlobalText } from "./GlobalText";
import colors from "../theme/colors";
import { formatDateToPeruTime, formatHourToPeruTime, monthParser } from "../utils/dateUtils";

export function SectionHeader({ title, onPress, style }) {
  return (
    <View style={[styles.sectionHeaderContainer, style]}>
      <GlobalText style={styles.sectionHeaderTitle}>{title}</GlobalText>
      <TouchableOpacity onPress={onPress}>
        <GlobalText style={styles.sectionHeaderButton}>Ver todos</GlobalText>
      </TouchableOpacity>
    </View>
  );
}

export function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.eventCardContainer} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: event.imageUri }} style={styles.eventCardImage} />
      <View style={styles.eventCardDetails}>
        <GlobalText style={styles.eventCardTitle}>{event.title}</GlobalText>
        <View style={styles.eventCardRow}>
          <Feather name="clock" size={16} color={colors.textPlaceholder} />
          <GlobalText style={styles.eventCardText}>
            {formatHourToPeruTime(event.date)}
          </GlobalText>
        </View>
        <View style={styles.eventCardRow}>
          <Feather name="calendar" size={16} color={colors.textPlaceholder} />
          <GlobalText style={styles.eventCardText}>
            {formatDateToPeruTime(event.date)}
          </GlobalText>
        </View>
        <View style={styles.eventCardRow}>
          <Feather name="map-pin" size={16} color={colors.textPlaceholder} />
          <GlobalText style={styles.eventCardText}>{event.location.address}</GlobalText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function RecommendedEvent({ event, onPress }) {
  return (
    <TouchableOpacity style={styles.recommendedEventContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.recommendedEventCard}>
        <Image source={{ uri: event.imageUri }} style={styles.carouselImage} />
        <View style={styles.overlay} />
        <View style={styles.recommendedEventDate}>
          <GlobalText style={styles.recommendedEventDateText}>
            {monthParser(event.date.slice(5, 7))}
          </GlobalText>
          <GlobalText style={styles.recommendedEventDateText}>
            {event.date.slice(8, 10)}
          </GlobalText>
        </View>
        <View style={styles.recommendedEventDetails}>
          <GlobalText style={styles.recommendedEventTitle}>{event.title}</GlobalText>
          <View style={styles.recommendedEventRow}>
            <Feather name="map-pin" size={16} color="white" />
            <GlobalText style={styles.recommendedEventText}>
              {event.location.address}
            </GlobalText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontFamily: "DMSans_SemiBold",
    color: colors.secundario,
  },
  sectionHeaderButton: {
    color: colors.textPlaceholder,
  },
  eventCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    height: 97,
  },
  eventCardImage: {
    width: 90,
    height: "100%",
    borderRadius: 10,
  },
  eventCardDetails: {
    marginLeft: 16,
    flex: 1,
  },
  eventCardTitle: {
    fontFamily: "DMSans_Medium",
    color: colors.secundario,
  },
  eventCardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  eventCardText: {
    color: "#6B7280",
    fontSize: 14,
    marginLeft: 8,
  },
  eventCardButton: {
    marginLeft: "auto",
  },
  eventListContainer: {
    paddingVertical: 8,
  },
  recommendedEventContainer: {
    borderRadius: 15,
    width: 280,
    height: 160,
  },
  recommendedEventCard: {
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
  },
  recommendedEventDate: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#aaaaaaaa",
    borderWidth: 1,
    borderColor: colors.primario,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  recommendedEventDateText: {
    color: "#ffffff",
    fontFamily: "DMSans_Bold",
    opacity: 1,
  },
  recommendedEventDetails: {
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  recommendedEventTitle: {
    color: "#ffffff",
    fontFamily: "DMSans_Bold",
  },
  recommendedEventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  recommendedEventText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
  },
});
