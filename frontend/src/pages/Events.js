import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isErroe: true, message: "Could not fatch events." };
    // throw new Response(JSON.stringify({ message: "Could not fatch events." }), {
    //   status: 500,
    // });
    return json({ message: "Could not fatch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loadEvents(),
  });
}
