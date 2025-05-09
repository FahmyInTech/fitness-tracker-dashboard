const API_URL = "http://localhost:5000/api"

// Generic fetch function with error handling
async function fetchFromAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    throw error
  }
}

// Activities API
export const activitiesAPI = {
  getAll: () => fetchFromAPI("/activities"),
  getByName: (name) => fetchFromAPI(`/activities/${name}`),
  update: (name, data) =>
    fetchFromAPI(`/activities/${name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}

// Calories API
export const caloriesAPI = {
  get: () => fetchFromAPI("/calories"),
  update: (data) =>
    fetchFromAPI("/calories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}

// Heart Rate API
export const heartRateAPI = {
  get: () => fetchFromAPI("/heart-rate"),
  update: (data) =>
    fetchFromAPI("/heart-rate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}

// Steps API
export const stepsAPI = {
  get: () => fetchFromAPI("/steps"),
  update: (data) =>
    fetchFromAPI("/steps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}

// Tracking API
export const trackingAPI = {
  get: () => fetchFromAPI("/tracking"),
  updateDay: (day, data) =>
    fetchFromAPI(`/tracking/${day}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}

// Messages API
export const messagesAPI = {
  getAll: () => fetchFromAPI("/messages"),
  getById: (id) => fetchFromAPI(`/messages/${id}`),
  markAsRead: (id) =>
    fetchFromAPI(`/messages/${id}/read`, {
      method: "PUT",
    }),
  create: (data) =>
    fetchFromAPI("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
}
