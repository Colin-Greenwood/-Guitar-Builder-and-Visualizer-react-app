// src/guitarData.js

export const guitarParts = [
  {
    name: "Body",
    description: "Choose a Stratocaster-style guitar body.",
  },
  {
    name: "Pickups",
    description: "Choose single-coil pickups for a bright tone.",
  },
  {
    name: "Neck",
    description: "Choose a maple neck for your guitar.",
  },
  {
    name: "Finish",
    description: "Choose a finish that matches your style.",
  },
];

export function getGuitarMessage(name) {
  const guitarName = name.trim();

  if (guitarName === "") {
    return "Your custom guitar is ready to design!";
  }

  return `Welcome to the ${guitarName} guitar builder!`;
}