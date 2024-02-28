import * as React from "react";
import * as Icons from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import type { TimelineItemType } from "~/server/api/routers/dateRequestRouter";

const TimelineComponent: React.FC<{ items: TimelineItemType[] }> = ({
  items,
}) => {
  return (
    <div>
      <div className="relative -left-[100%] w-[200%] sm:hidden">
        <Timeline position="right">
          {items.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector />
                <div className="m-2 rounded-full bg-amber-200 p-2">
                  {React.createElement(Icons[item.logo as keyof typeof Icons])}
                </div>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <h2 className=" font-semibold">{item.title}</h2>
                <p className="text-sm font-thin text-neutral-500">
                  {item.datetime.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Singapore",
                  })}
                </p>
                <p>{item.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div className="hidden sm:flex">
        <Timeline position="alternate">
          {items.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                <p className="text-sm font-thin text-neutral-500">
                  {item.datetime.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Singapore",
                  })}
                </p>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <div className="m-2 rounded-full bg-amber-200 p-2">
                  {React.createElement(Icons[item.logo as keyof typeof Icons])}
                </div>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <h2 className=" font-semibold">{item.title}</h2>
                <p>{item.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default TimelineComponent;
