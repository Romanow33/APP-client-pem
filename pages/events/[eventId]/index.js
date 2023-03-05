import { useRouter } from "next/router";
import EventDetail from "../../../components/EventDetail";
import PageTemplate from "../../../components/PageTemplate";

export const EventDetailPage = () => {
  const router = useRouter();

  return (
    <PageTemplate>
      <EventDetail eventId={router.query.eventId} />
    </PageTemplate>
  );
};

export default EventDetailPage;
