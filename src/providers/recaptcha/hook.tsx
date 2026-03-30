"use client";

import { useContext } from "react";
import { RecaptchaContext } from "@/providers/recaptcha/context";

export function useRecaptcha() {
  const context = useContext(RecaptchaContext);

  if (!context) {
    throw new Error("useRecaptcha must be used inside a RecaptchaProvider");
  }

  return context;
}
