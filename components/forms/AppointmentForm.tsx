import { Appointment } from "@/types/appwrite.types";
import React, { Dispatch, SetStateAction } from "react";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  return <div>AppointmentForm</div>;
};
