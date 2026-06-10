import { createStore } from "redux";

// ==========================================
// EXERCISE 2.1: Action Constants
// ==========================================
const ADD_PROFILE = "profile/added";
const REMOVE_PROFILE = "profile/removed";
const CALCULATE_AVERAGE_AGE = "profile/calculateAverageAge";

// ==========================================
// EXERCISE 2.2 - 2.4: Action Creators
// ==========================================
export const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});

export const removeProfile = (profileId) => ({
  type: REMOVE_PROFILE,
  payload: Number(profileId), // Ensure ID is treated consistently as a number
});

export const calculateAverageAge = () => ({
  type: CALCULATE_AVERAGE_AGE,
});

// ==========================================
// EXERCISE 1 & 2.5: Initial State & Reducer
// ==========================================
const initialState = {
  profiles: [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ],
  averageAge: 30,
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    // EXERCISE 1.2 & Implementations: Add profile using spread operator
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };

    // EXERCISE 1.2 & Implementations: Remove profile using array.filter
    case REMOVE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id !== action.payload,
        ),
      };

    // EXERCISE 1.2 & Implementations: Calculate average age using array.reduce
    case CALCULATE_AVERAGE_AGE: {
      const totalProfiles = state.profiles.length;
      if (totalProfiles === 0) {
        return { ...state, averageAge: 0 };
      }

      const totalAge = state.profiles.reduce((acc, profile) => {
        return acc + Number(profile.age);
      }, 0);

      return {
        ...state,
        averageAge: totalAge / totalProfiles,
      };
    }

    default:
      return state;
  }
}

// ==========================================
// EXERCISE 3: Create Redux Store instance
// ==========================================
export const store = createStore(profileReducer);
