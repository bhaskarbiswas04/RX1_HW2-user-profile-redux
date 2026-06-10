import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  store,
  addProfile,
  removeProfile,
  calculateAverageAge,
} from "./profileStore";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // EXERCISE 5: Grab current store values
  const profiles = useSelector((state) => state.profiles);
  const averageAge = useSelector((state) => state.averageAge);

  // Local component states for form controls (Exercise 7)
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [removeIdInput, setRemoveIdInput] = useState("");

  // EXERCISE 4.1, 3.3 & 6: Set up defaults and play automatic assertion sequences
  useEffect(() => {
    console.log("--- Starting Exercise 6 Action Sequence ---");
    const unsubscribe = store.subscribe(() => {
      console.log("Store Change Detected:", store.getState());
    });

    // Run the sequence tasks directly
    // store.dispatch(addProfile({ id: 4, name: "David", age: 40 }));
    store.dispatch(calculateAverageAge());

    // store.dispatch(removeProfile(1));
    store.dispatch(calculateAverageAge());

    unsubscribe();
    console.log("--- End of Initial Test Sequence ---");
  }, [dispatch]);

  // EXERCISE 7.1: Form handles for interactive profile addition
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addId || !addName || !addAge) return;

    dispatch(
      addProfile({
        id: Number(addId),
        name: addName,
        age: Number(addAge),
      }),
    );
    dispatch(calculateAverageAge());

    // Clear controls
    setAddId("");
    setAddName("");
    setAddAge("");
  };

  // EXERCISE 7.2: Handle interactive deletion by single input string ID
  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    if (!removeIdInput) return;

    dispatch(removeProfile(removeIdInput));
    dispatch(calculateAverageAge());
    setRemoveIdInput("");
  };

  return (
    <div className="profile-container">
      {/* EXERCISE 7.1: Add Profile Form Wrapper */}
      <h2>Add Profile</h2>
      <form onSubmit={handleAddSubmit} className="horizontal-form">
        <input
          type="number"
          placeholder="ID"
          value={addId}
          onChange={(e) => setAddId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={addAge}
          onChange={(e) => setAddAge(e.target.value)}
        />
        <button type="submit">Add Profile</button>
      </form>

      {/* EXERCISE 7.2: Remove Profile Control Inline block */}
      <h2>Remove Profile</h2>
      <form
        onSubmit={handleRemoveSubmit}
        className="horizontal-form remove-section"
      >
        <input
          type="number"
          placeholder="ID"
          value={removeIdInput}
          onChange={(e) => setRemoveIdInput(e.target.value)}
        />
        <button type="submit">Remove Profile</button>
      </form>

      {/* EXERCISE 4.2 & UI View Render: Displaying list profiles */}
      <ul className="profile-list">
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.id}. {profile.name} ({profile.age} years old)
          </li>
        ))}
      </ul>

      {/* EXERCISE 5: Dynamic calculation rendering block fixed decimal positions */}
      <div className="average-display">
        <strong>Average Age: {averageAge.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default App;
