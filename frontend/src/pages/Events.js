import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  // if (data.isErroe) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isErroe: true, message: "Could not fatch events." };
    throw new Response(JSON.stringify({ message: "Could not fatch events." }), {
      status: 500,
    });
  } else {
    return response;
  }
}
