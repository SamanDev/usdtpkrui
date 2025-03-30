import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TourSite from "./toursite";
import i18next from './i18n'
import { GoogleOAuthProvider } from '@react-oauth/google';

i18next.t('my.key')


createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="168227557000-ad9meorqgd5i83apn23th0paqr3qn2m0.apps.googleusercontent.com"><BrowserRouter>
    <TourSite />
  </BrowserRouter></GoogleOAuthProvider>
);
