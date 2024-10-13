const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getPhotoUrl(photoReference, width) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${photoReference}&key=${googleApiKey}`;
};
