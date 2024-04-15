import React from "react";
import Avatar from "boring-avatars";
import { FaHourglassStart, FaMugHot } from "react-icons/fa";

interface TimerDisplayProps {
  timers: { [key: string]: any };
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timers }) => {
  return (
    <div className="flex gap-4 mt-6 overflow-x-scroll h-32">
      {Object.entries(timers).map(([id, time]) => {
        return (
          <div key={id} className="flex flex-col mx-3 my-2 items-center gap-2">
            <div className=" w-fit rounded-full">
              <Avatar
                size={40}
                name={`User ${id}`}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            {/* {Object.entries(time).map(([key, value]) => (
              <div key={key}>{`${key}: ${value}`}</div>
            ))} */}
            {time["type"] === "work" ? <FaHourglassStart /> : <FaMugHot />}
          </div>
        );
      })}
    </div>
  );
};

export default TimerDisplay;
