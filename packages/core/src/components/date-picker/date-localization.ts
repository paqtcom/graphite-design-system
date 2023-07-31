import { DuetLocalizedText } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-localization';
export interface localization extends DuetLocalizedText {
  helpText: string;
}

const translations: { [lang: string]: localization } = {
  en: {
    buttonLabel: 'Choose date',
    placeholder: '',
    helpText: 'Format: dd-mm-yyyy',
    selectedDateMessage: 'Selected date is',
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    monthSelectLabel: 'Month',
    yearSelectLabel: 'Year',
    closeLabel: 'Close window',
    calendarHeading: 'Choose a date',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    locale: 'en-GB',
  },
  nl: {
    buttonLabel: 'Kies datum',
    placeholder: '',
    helpText: 'Formaat: DD-MM-JJJJ',
    selectedDateMessage: 'De gekozen datum is',
    prevMonthLabel: 'Vorige maand',
    nextMonthLabel: 'Volgende maand',
    monthSelectLabel: 'Maand',
    yearSelectLabel: 'Jaar',
    closeLabel: 'Venster sluiten',
    calendarHeading: 'Kies een datum',
    dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    monthNames: [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december',
    ],
    monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    locale: 'nl-NL',
  },
  de: {
    buttonLabel: 'Datum wählen',
    placeholder: '',
    helpText: 'Format: TT-MM-JJJJ',
    selectedDateMessage: 'Das gewählte Datum ist',
    prevMonthLabel: 'Letzter Monat',
    nextMonthLabel: 'Nächster Monat',
    monthSelectLabel: 'Monat',
    yearSelectLabel: 'Jahr',
    closeLabel: 'Fenster schließen',
    calendarHeading: 'Wählen Sie ein Datum',
    dayNames: ['Sonntag', 'Monta', 'Dienstag', 'Mittwog', 'Donnerstag', 'Freitag', 'Samstag'],
    monthNames: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    monthNamesShort: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    locale: 'de-DE',
  },
  fr: {
    buttonLabel: 'Choisir la date',
    placeholder: '',
    helpText: 'Format: jj-mm-aaaa',
    selectedDateMessage: 'La date choisie est',
    prevMonthLabel: 'Mois précédent',
    nextMonthLabel: 'Le mois prochain',
    monthSelectLabel: 'Mois',
    yearSelectLabel: 'Année',
    closeLabel: 'Fermer la fenêtre',
    calendarHeading: 'Choisissez une date',
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    monthNames: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    monthNamesShort: ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'dec'],
    locale: 'fr-FR',
  },
};

const extractLanguageSubtag = (language: string) => {
  if (language.indexOf('-') !== -1) {
    language = language.split('-')[0];
  }

  if (language.indexOf('_') !== -1) {
    language = language.split('_')[0];
  }

  return language;
};

const determineLanguage = (): string | undefined => {
  const documentLang = document.documentElement.lang;

  if (documentLang) {
    return extractLanguageSubtag(documentLang);
  }

  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return undefined;
  }

  let browserLang: string | null =
    window.navigator.languages && window.navigator.languages.length > 0 ? window.navigator.languages[0] : null;

  browserLang = browserLang || window.navigator.language;

  if (typeof browserLang === 'undefined') {
    return undefined;
  }

  return extractLanguageSubtag(browserLang);
};

// Default to english if browser language is not supported
export const browserLocalization = translations[determineLanguage()] ?? translations['en'];
