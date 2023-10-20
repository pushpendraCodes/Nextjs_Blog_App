"use client";

import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
export default function AlertProvider({ children }) {
  const alertOptions = {
    offset: '30px',
    position: positions.BOTTOM_LEFT,
    timeout: 5000,
    transition: transitions.SCALE,

  };
  return (
    <Provider template={AlertTemplate} {...alertOptions}>
      {children}
    </Provider>
  );
}
