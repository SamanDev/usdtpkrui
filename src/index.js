import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TourSite from "./toursite";
import i18next from './i18n'

i18next.t('my.key')


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TourSite />
  </BrowserRouter>
);
