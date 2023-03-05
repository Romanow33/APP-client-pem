import { Paper } from "@mui/material";
import * as React from "react";
import EventManagement from "../../components/EventManagement";
import PageTemplate from "../../components/PageTemplate";

export default function EventsPage() {
  return (
    <PageTemplate>
      <EventManagement />
    </PageTemplate>
  );
}
