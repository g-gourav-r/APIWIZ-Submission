import { useState } from "react";
import { SmileIcon } from "@/components/ui/smile";
import { FrownIcon } from "@/components/ui/frown";
import { AngryIcon } from "@/components/ui/angry";
import { MehIcon } from "@/components/ui/meh";
import { AnnoyedIcon } from "@/components/ui/annoyed";
import { LaughIcon } from "@/components/ui/laugh";

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
}

const moodIcons = [
  { icon: <AngryIcon />, mood: "Angry" },
  { icon: <AnnoyedIcon />, mood: "Annoyed" },
  { icon: <FrownIcon />, mood: "Sad" },
  { icon: <MehIcon />, mood: "Neutral" },
  { icon: <LaughIcon />, mood: "Content" },
  { icon: <SmileIcon />, mood: "Happy" },
];

export default function MoodSelector({ onSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
    onSelect(mood);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {moodIcons.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelectMood(item.mood)}
          className={`
            p-3 rounded-xl flex flex-col items-center transition-transform duration-200
            ${selectedMood === item.mood ? 'bg-yellow-200 text-yellow-600 scale-110' : 'bg-white text-gray-700'}
            hover:bg-yellow-100 hover:text-yellow-500 hover:scale-110
          `}
        >
          <div className="text-4xl">{item.icon}</div>
          {/* <div className="text-xs mt-1">{item.mood}</div> */}
        </button>
      ))}
    </div>
  );
}
