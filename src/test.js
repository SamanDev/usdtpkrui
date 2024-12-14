import React from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <button onClick={() => changeLanguage('fa')}>فارسی</button>
      <button onClick={() => changeLanguage('tr')}>Türkçe</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}

export default MyComponent;
