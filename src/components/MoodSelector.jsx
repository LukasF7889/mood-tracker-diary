import imgMood1 from "../assets/angry.png";
import imgMood2 from "../assets/sarcastic.png";
import imgMood3 from "../assets/neutral.png";
import imgMood4 from "../assets/smile.png";
import imgMood5 from "../assets/lol.png";
import { useRef, useState, useEffect } from "react";
import { useEntry } from "../context/EntryContext";

const MoodSelector = ({ entry, dispatch, moodRef }) => {
  const { entryMode } = useEntry();

  const moodImages = {
    mood1: imgMood1,
    mood2: imgMood2,
    mood3: imgMood3,
    mood4: imgMood4,
    mood5: imgMood5,
  };

  const setMood = (mood) => {
    if (entryMode === "create") {
      dispatch({ type: "SET_MOOD", payload: mood });
    } else {
      console.log("Mood change not possible");
    }
  };

  useEffect(() => {
    // Call the function once the entry.mood state changes
    styleMoodButtons();
  }, [entry.mood, entryMode]);

  const styleMoodButtons = () => {
    const buttons = moodRef.current?.querySelectorAll("button");
    const currMood = entry.mood;
    if (buttons) {
      const buttonArray = Array.from(buttons);
      buttonArray.forEach((button) => {
        // Resetting styles for all buttons
        button.style.outlineWidth = "0";
        button.style.width = "3rem";
        button.style.cursor = "pointer"; // Set width for all buttons
        const img = button.querySelector("img");
        img.style.filter = "opacity(35%)";

        // Check if this button corresponds to the selected mood
        if (button.id === currMood) {
          button.style.outlineWidth = "10px"; // Apply style to selected mood

          //   img.style.filter = "drop-shadow(0 0 0.75rem crimson)";
          img.style.filter = "opacity(100%)";
          img.classList.add("animate-jump");

          setTimeout(() => {
            img.classList.remove("animate-jump");
          }, 500);
        }
      });
    }
  };

  if (entryMode === "read") {
    return (
      <>
        {
          <button type="button" id={entry.mood}>
            <img src={moodImages[entry.mood]} alt={entry.mood} />
          </button>
        }
      </>
    );
  }

  return (
    <>
      <p>Select mood: {entry.mood}</p>
      <button type="button" id="mood1" onClick={() => setMood("mood1")}>
        <img src={imgMood1} alt="Very bad" />
      </button>
      <button type="button" id="mood2" onClick={() => setMood("mood2")}>
        <img src={imgMood2} alt="Bad" />
      </button>
      <button type="button" id="mood3" onClick={() => setMood("mood3")}>
        <img src={imgMood3} alt="Neutral" />
      </button>
      <button type="button" id="mood4" onClick={() => setMood("mood4")}>
        <img src={imgMood4} alt="Good" />
      </button>
      <button type="button" id="mood5" onClick={() => setMood("mood5")}>
        <img src={imgMood5} alt="Very good" />
      </button>
    </>
  );
};

export default MoodSelector;
