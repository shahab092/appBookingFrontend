// Local cache to avoid redundant geocoding requests
const addressCache = new Map();

/**
 * Reverse geocodes coordinates (lat, lng) into a human-readable address.
 * Uses OpenStreetMap's Nominatim API (free, no API key required for low volume).
 *
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} - Human readable address
 */
export const getAddressFromCoords = async (lat, lng) => {
  if (!lat || !lng) return "Location not available";

  const cacheKey = `${lat},${lng}`;
  if (addressCache.has(cacheKey)) {
    return addressCache.get(cacheKey);
  }

  // Create a timeout controller to prevent long hangs (3 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    // Switching to BigDataCloud's Client-side Geocoding API
    // This API is more friendly to browser-based requests and doesn't return 403 for localhost/missing headers
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      {
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    let result = `Lat: ${lat}, Lng: ${lng}`;

    // BigDataCloud response structure
    if (data.locality || data.city) {
      const parts = [
        data.locality,
        data.city || data.principalSubdivision,
      ].filter(Boolean);

      result = parts.length > 0 ? parts.join(", ") : data.locality || data.city;
    } else if (data.plusCode) {
      result = data.plusCode;
    }

    // Cache the result (even if it's just the fallback coordinates)
    addressCache.set(cacheKey, result);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Geocoding error:", error);
    const fallback = `Lat: ${lat}, Lng: ${lng}`;
    // Cache the fallback to avoid retrying failed requests immediately
    addressCache.set(cacheKey, fallback);
    return fallback;
  }
};
