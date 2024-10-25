import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export default function EventsRootayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
