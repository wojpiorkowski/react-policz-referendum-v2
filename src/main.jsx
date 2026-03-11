import React, { useState } from 'react';
import { 
  Calculator, Users, AlertCircle, CheckCircle, Info, Flag, ArrowRight, XCircle,
  Ban, Gavel, Zap, BookOpen, MapPin, ShieldCheck, Download
} from 'lucide-react';

// Baza danych dla 20 największych miast na podstawie dostarczonego raportu
const citiesData = {
  "Warszawa": { u2025: 1370460, v2024: 785873 },
  "Kraków": { u2025: 619988, v2024: 264258 },
  "Wrocław": { u2025: 504889, v2024: 215456 },
  "Łódź": { u2025: 483930, v2024: 244567 },
  "Poznań": { u2025: 408734, v2024: 168945 },
  "Gdańsk": { u2025: 372808, v2024: 185432 },
  "Szczecin": { u2025: 277747, v2024: 132540 },
  "Bydgoszcz": { u2025: 239396, v2024: 120450 },
  "Lublin": { u2025: 252598, v2024: 121440 },
  "Białystok": { u2025: 210392, v2024: 108560 },
  "Katowice": { u2025: 205450, v2024: 102340 },
  "Gdynia": { u2025: 184200, v2024: 94560 },
  "Częstochowa": { u2025: 162400, v2024: 78900 },
  "Radom": { u2025: 154300, v2024: 72450 },
  "Rzeszów": { u2025: 148900, v2024: 75670 },
  "Kielce": { u2025: 142991, v2024: 76540 },
  "Sosnowiec": { u2025: 142500, v2024: 64320 },
  "Toruń": { u2025: 141161, v2024: 65430 },
  "Gliwice": { u2025: 132400, v2024: 58760 },
  "Olsztyn": { u2025: 126500, v2024: 62900 }
};

// Dane historyczne lokalne w Polsce
const localHistoryData = [
  { lp: 1, miejsce: "Gmina Kosakowo", data: "04.01.2026", przedmiot: "Odwołanie wójta (E. Wendt)", frekwencja: "27,28%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 2, miejsce: "Miasto Cieszyn", data: "07.12.2025", przedmiot: "Odwołanie burmistrz (G. Staszkiewicz)", frekwencja: "18,60%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 3, miejsce: "Miasto Cieszyn", data: "07.12.2025", przedmiot: "Odwołanie rady miejskiej", frekwencja: "18,60%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 4, miejsce: "Gmina Jeleśnia", data: "07.12.2025", przedmiot: "Odwołanie wójt (A. Wasilewskiej)", frekwencja: "14,20%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 5, miejsce: "Gmina Barciany", data: "07.12.2025", przedmiot: "Odwołanie wójt (M. Kamińskiej)", frekwencja: "19,35%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 6, miejsce: "Gmina Malechowo", data: "26.10.2025", przedmiot: "Odwołanie rady gminy", frekwencja: "15,00%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 7, miejsce: "Miasto Zabrze", data: "11.05.2025", przedmiot: "Odwołanie prezydent (A. Rupniewskiej)", frekwencja: "25,00%", prog: "3/5 uczestników wyborów", wynik: "Ważne / Odwołano prezydenta", status: "success" },
  { lp: 8, miejsce: "Miasto Zabrze", data: "11.05.2025", przedmiot: "Odwołanie rady miasta", frekwencja: "24,80%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (brakło 498 głosów)", status: "fail" },
  { lp: 9, miejsce: "Gmina Głubczyce", data: "27.04.2025", przedmiot: "Budowa elektrowni wiatrowych", frekwencja: "25,02%", prog: "30% uprawnionych", wynik: "Nieważne (większość była przeciw)", status: "fail" },
  { lp: 10, miejsce: "Podkowa Leśna", data: "01.10.2023", przedmiot: "Rewitalizacja stawu w Parku Miejskim", frekwencja: "41,35%", prog: "30% uprawnionych", wynik: "Ważne / Wynik rozstrzygający (TAK)", status: "success" },
  { lp: 11, miejsce: "Bielsko-Biała", data: "16.04.2023", przedmiot: "Budowa spalarni / Ograniczenie ruchu", frekwencja: "28,44%", prog: "30% uprawnionych", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 12, miejsce: "Murowana Goślina", data: "02.10.2022", przedmiot: "Odwołanie burmistrza (D. Szmyyt)", frekwencja: "34,40%", prog: "3/5 uczestników wyborów", wynik: "Ważne / Odwołano burmistrza", status: "success" },
  { lp: 13, miejsce: "Murowana Goślina", data: "02.10.2022", przedmiot: "Odwołanie rady miejskiej", frekwencja: "34,00%", prog: "3/5 uczestników wyborów", wynik: "Ważne / Odwołano radę", status: "success" },
  { lp: 14, miejsce: "Nowy Sącz", data: "24.07.2022", przedmiot: "Budowa spalarni odpadów", frekwencja: "7,53%", prog: "30% uprawnionych", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 15, miejsce: "Konstancin-Jeziorna", data: "22.05.2022", przedmiot: "Odwołanie burmistrza i rady", frekwencja: "16,39%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 16, miejsce: "Józefów nad Wisłą", data: "13.02.2022", przedmiot: "Odwołanie burmistrza", frekwencja: "21,80%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 17, miejsce: "Milanówek", data: "23.01.2022", przedmiot: "Odwołanie burmistrza (P. Remiszewskiego)", frekwencja: "19,34%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 18, miejsce: "Gmina Radłów", data: "16.01.2022", przedmiot: "Odwołanie burmistrza", frekwencja: "17,52%", prog: "3/5 uczestników wyborów", wynik: "Nieważne (zbyt niska frekwencja)", status: "fail" },
  { lp: 19, miejsce: "Sulmierzyce", data: "23.05.2021", przedmiot: "Odwołanie wójta", frekwencja: "43,42%", prog: "3/5 uczestników wyborów", wynik: "Ważne / Odwołano wójta", status: "success" },
  { lp: 20, miejsce: "Gmina Słupno", data: "23.05.2021", przedmiot: "Odwołanie wójta", frekwencja: "34,69%", prog: "3/5 uczestników wyborów", wynik: "Ważne / Odwołano wójta", status: "success" }
];

// Dane historyczne ogólnokrajowe
const nationalHistoryData = [
  { rok: "2023", przedmiot: "Wiek emerytalny, bariera na granicy, migracja i prywatyzacja", frekwencja: "40,91%", prog: "> 50% uprawnionych", wynik: "Niewiążące", status: "fail" },
  { rok: "2015", przedmiot: "JOW, finansowanie partii i rozstrzyganie wątpliwości podatkowych", frekwencja: "7,80%", prog: "> 50% uprawnionych", wynik: "Niewiążące", status: "fail" },
  { rok: "2003", przedmiot: "Przystąpienie Polski do Unii Europejskiej", frekwencja: "58,85%", prog: "> 50% uprawnionych", wynik: "Ważne (Wiążące)", status: "success" },
  { rok: "1997", przedmiot: "Przyjęcie Konstytucji Rzeczypospolitej Polskiej", frekwencja: "42,86%", prog: "Brak (ref. konstytucyjne)", wynik: "Ważne (brak progu)", status: "success" },
  { rok: "1996", przedmiot: "Kierunki wykorzystania majątku państwowego", frekwencja: "32,44%", prog: "> 50% uprawnionych", wynik: "Niewiążące", status: "fail" },
  { rok: "1996", przedmiot: "Powszechne uwłaszczenie obywateli", frekwencja: "32,40%", prog: "> 50% uprawnionych", wynik: "Niewiążące", status: "fail" }
];

// Zaktualizowane dane dla modelu szwajcarskiego na podstawie załącznika
const swissData = [
  { lp: 1, rok: "2025", miejsce: "Kanton Zurych", data: "30.11.2025", przedmiot: "Ograniczenie stref \"Tempo 30\" na głównych drogach", frekwencja: "49,9%", wynik: "Przyjęto (57,0%)", status: "success" },
  { lp: 2, rok: "2025", miejsce: "Kanton Zurych", data: "30.11.2025", przedmiot: "Podniesienie dopłat do składek zdrowotnych", frekwencja: "49,9%", wynik: "Odrzucono (51,1%)", status: "fail" },
  { lp: 3, rok: "2025", miejsce: "Miasto Zurych", data: "30.11.2025", przedmiot: "Kredyt na infrastrukturę rowerową (350 mln CHF)", frekwencja: "49,9%", wynik: "Przyjęto (55,4%)", status: "success" },
  { lp: 4, rok: "2025", miejsce: "Kanton Lucerna", data: "30.11.2025", przedmiot: "Inicjatywa \"Bezpłatne i dostępne przedszkola\"", frekwencja: "48,6%", wynik: "Odrzucono (77,5%)", status: "fail" },
  { lp: 5, rok: "2025", miejsce: "Kanton Lucerna", data: "30.11.2025", przedmiot: "Kontrpropozycja rządu ws. opieki nad dziećmi", frekwencja: "48,6%", wynik: "Przyjęto (57,2%)", status: "success" },
  { lp: 6, rok: "2025", miejsce: "Kanton Szafuza", data: "30.11.2025", przedmiot: "Nowelizacja ustawy o szpitalach kantonalnych", frekwencja: "43,0%", wynik: "Przyjęto (90,1%)", status: "success" },
  { lp: 7, rok: "2025", miejsce: "Kanton Vaud", data: "30.11.2025", przedmiot: "Rozszerzenie praw wyborczych dla obcokrajowców", frekwencja: "43,0%", wynik: "Odrzucono (64,8%)", status: "fail" },
  { lp: 8, rok: "2025", miejsce: "Appenzell Ausserrhoden", data: "30.11.2025", przedmiot: "Przyjęcie nowej Konstytucji Kantonalnej", frekwencja: "43,0%", wynik: "Przyjęto (77,8%)", status: "success" },
  { lp: 9, rok: "2025", miejsce: "Bazylea-Miasto", data: "28.09.2025", przedmiot: "Inicjatywa \"Razem w Europie\" (relacje z UE)", frekwencja: "49,0%", wynik: "Przyjęto (64,5%)", status: "success" },
  { lp: 10, rok: "2025", miejsce: "Kanton Fryburg", data: "28.09.2025", przedmiot: "Kredyt na rozbudowę więzienia Bellechasse", frekwencja: "49,0%", wynik: "Przyjęto (67,8%)", status: "success" },
  { lp: 11, rok: "2025", miejsce: "Kanton Genewa", data: "28.09.2025", przedmiot: "Ustawa o ograniczeniu liczby etatów w administracji", frekwencja: "45,0%", wynik: "Przyjęto (54,8%)", status: "success" },
  { lp: 12, rok: "2025", miejsce: "Kanton Genewa", data: "28.09.2025", przedmiot: "Inicjatywa ws. wsparcia budownictwa spółdzielczego", frekwencja: "45,2%", wynik: "Przyjęto (60,4%)", status: "success" },
  { lp: 13, rok: "2025", miejsce: "Kanton Solura", data: "28.09.2025", przedmiot: "Wprowadzenie bonów na opiekę nad dziećmi", frekwencja: "46,1%", wynik: "Przyjęto (56,5%)", status: "fail" },
  { lp: 14, rok: "2025", miejsce: "Kanton Zurych", data: "18.05.2025", przedmiot: "Obniżka podatku dochodowego dla firm", frekwencja: "40,0%", wynik: "Odrzucono (65,3%)", status: "fail" },
  { lp: 15, rok: "2025", miejsce: "Bazylea-Miasto", data: "18.05.2025", przedmiot: "Pakiet wsparcia dla przemysłu farmaceutycznego", frekwencja: "46,8%", wynik: "Przyjęto", status: "success" },
  { lp: 16, rok: "2024", miejsce: "Kanton Berno", data: "22.09.2024", przedmiot: "Przejście gminy Moutier do kantonu Jura", frekwencja: "42,6%", wynik: "Przyjęto (83,2%)", status: "success" },
  { lp: 17, rok: "2024", miejsce: "Miasto Berno", data: "22.09.2024", przedmiot: "Kredyt na budowę szkoły (Weissenbühl)", frekwencja: "49,5%", wynik: "Przyjęto (86,9%)", status: "success" },
  { lp: 18, rok: "2024", miejsce: "Miasto Berno", data: "22.09.2024", przedmiot: "Modernizacja przestrzeni ulicznej (Brunnhof)", frekwencja: "49,5%", wynik: "Przyjęto (76,1%)", status: "success" },
  { lp: 19, rok: "2024", miejsce: "Miasto Berno", data: "03.03.2024", przedmiot: "Budowa nowego centrum logistycznego (Werkhof)", frekwencja: "61,4%", wynik: "Przyjęto (82,2%)", status: "success" },
  { lp: 20, rok: "2024", miejsce: "Miasto Berno", data: "03.03.2024", przedmiot: "Remont kompleksu basenowego Ka-We-De", frekwencja: "61,4%", wynik: "Przyjęto (83,0%)", status: "success" }
];

// Dane dla standardów demokratycznych Unii Europejskiej
const euData = [
  { lp: 1, miejsce: "Słowenia", data: "23.11.2025", przedmiot: "Ustawa o eutanazji (wspomaganym samobójstwie)", frekwencja: "40,15%", prog: "20% uprawnionych na NIE", wynik: "Odrzucono (53,4% przeciw)", status: "fail" },
  { lp: 2, miejsce: "Włochy", data: "08.06.2025", przedmiot: "Liberalizacja prawa do obywatelstwa", frekwencja: "30,60%", prog: "50% + 1 frekwencji", wynik: "Nieważne (brak kworum)", status: "fail" },
  { lp: 3, miejsce: "Włochy", data: "08.06.2025", przedmiot: "Prawo pracy (ograniczenie umów terminowych)", frekwencja: "30,60%", prog: "50% + 1 frekwencji", wynik: "Nieważne (brak kworum)", status: "fail" },
  { lp: 4, miejsce: "Słowenia", data: "09.06.2024", przedmiot: "Wspomagane umieranie (konsultacyjne)", frekwencja: "41,40%", prog: "Brak progu", wynik: "Przyjęto (54,9% za)", status: "success" },
  { lp: 5, miejsce: "Słowenia", data: "09.06.2024", przedmiot: "Uprawa konopi do celów medycznych", frekwencja: "41,30%", prog: "Brak progu", wynik: "Przyjęto (66,7% za)", status: "success" },
  { lp: 6, miejsce: "Słowenia", data: "09.06.2024", przedmiot: "Uprawa konopi na użytek własny", frekwencja: "41,30%", prog: "Brak progu", wynik: "Przyjęto (51,5% za)", status: "success" },
  { lp: 7, miejsce: "Słowenia", data: "09.06.2024", przedmiot: "Głosowanie preferencyjne w wyborach", frekwencja: "41,20%", prog: "Brak progu", wynik: "Przyjęto (70,9% za)", status: "success" },
  { lp: 8, miejsce: "Litwa", data: "12.05.2024", przedmiot: "Dopuszczalność podwójnego obywatelstwa", frekwencja: "59,50%", prog: "50% uprawnionych na TAK", wynik: "Odrzucono (brak większości)", status: "fail" },
  { lp: 9, miejsce: "Irlandia", data: "08.03.2024", przedmiot: "Zmiana definicji rodziny w Konstytucji", frekwencja: "44,40%", prog: "Brak progu", wynik: "Odrzucono (67,7% przeciw)", status: "fail" },
  { lp: 10, miejsce: "Irlandia", data: "08.03.2024", przedmiot: "Usunięcie zapisu o roli kobiet w domu", frekwencja: "44,40%", prog: "Brak progu", wynik: "Odrzucono (73,9% przeciw)", status: "fail" },
  { lp: 11, miejsce: "Słowacja", data: "21.01.2023", przedmiot: "Zmiana Konstytucji (skrócenie kadencji Sejmu)", frekwencja: "27,25%", prog: "50% + 1 frekwencji", wynik: "Nieważne (brak kworum)", status: "fail" },
  { lp: 12, miejsce: "Słowenia", data: "27.11.2022", przedmiot: "Ustawa o publicznym nadawcy RTV", frekwencja: "41,85%", prog: "20% uprawnionych na NIE", wynik: "Przyjęto (62,8% za)", status: "success" },
  { lp: 13, miejsce: "Słowenia", data: "27.11.2022", przedmiot: "Ustawa o opiece długoterminowej", frekwencja: "41,85%", prog: "20% uprawnionych na NIE", wynik: "Przyjęto (62,2% za)", status: "success" },
  { lp: 14, miejsce: "Słowenia", data: "27.11.2022", przedmiot: "Ustawa o reorganizacji rządu", frekwencja: "41,85%", prog: "20% uprawnionych na NIE", wynik: "Przyjęto (56,7% za)", status: "success" },
  { lp: 15, miejsce: "Włochy", data: "12.06.2022", przedmiot: "Ograniczenie stosowania aresztu tymczasowego", frekwencja: "20,90%", prog: "50% + 1 frekwencji", wynik: "Nieważne (brak kworum)", status: "fail" },
  { lp: 16, miejsce: "Włochy", data: "12.06.2022", przedmiot: "Oddzielenie funkcji sędziego i prokuratora", frekwencja: "20,90%", prog: "50% + 1 frekwencji", wynik: "Nieważne (brak kworum)", status: "fail" },
  { lp: 17, miejsce: "Dania", data: "01.06.2022", przedmiot: "Zniesienie klauzuli opt-out w obronności UE", frekwencja: "65,80%", prog: "30% uprawnionych na NIE", wynik: "Przyjęto (66,9% za)", status: "success" },
  { lp: 18, miejsce: "Węgry", data: "03.04.2022", przedmiot: "Ustawa o \"ochronie dzieci\" (tematyka LGBT)", frekwencja: "68,70%", prog: "50% ważnych głosów od upr.", wynik: "Nieważne (dużo głosów pustych)", status: "fail" },
  { lp: 19, miejsce: "Słowenia", data: "11.07.2021", przedmiot: "Nowelizacja ustawy o gospodarce wodnej", frekwencja: "46,50%", prog: "20% uprawnionych na NIE", wynik: "Odrzucono (86,7% przeciw)", status: "fail" },
  { lp: 20, miejsce: "Włochy", data: "20.09.2020", przedmiot: "Zmniejszenie liczby posłów i senatorów", frekwencja: "51,10%", prog: "Brak progu (ref. konst.)", wynik: "Przyjęto (69,9% za)", status: "success" }
];

// Komponent ikony flagi Szwajcarii (SVG)
const SwissFlagIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#D52B1E" rx="4" />
    <rect x="13" y="6" width="6" height="20" fill="white" />
    <rect x="6" y="13" width="20" height="6" fill="white" />
  </svg>
);

// Komponent ikony flagi Polski (SVG)
const PolishFlagIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="white" rx="4" />
    <path d="M0 16H32V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V16Z" fill="#DC143C" />
  </svg>
);

// Komponent ikony flagi Unii Europejskiej (SVG)
const EUFlagIcon = ({ className }) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#003399" rx="4" />
    <circle cx="16" cy="10" r="1" fill="#FFCC00" /><circle cx="19" cy="10.8" r="1" fill="#FFCC00" />
    <circle cx="21.2" cy="13" r="1" fill="#FFCC00" /><circle cx="22" cy="16" r="1" fill="#FFCC00" />
    <circle cx="21.2" cy="19" r="1" fill="#FFCC00" /><circle cx="19" cy="21.2" r="1" fill="#FFCC00" />
    <circle cx="16" cy="22" r="1" fill="#FFCC00" /><circle cx="13" cy="21.2" r="1" fill="#FFCC00" />
    <circle cx="10.8" cy="19" r="1" fill="#FFCC00" /><circle cx="10" cy="16" r="1" fill="#FFCC00" />
    <circle cx="10.8" cy="13" r="1" fill="#FFCC00" /><circle cx="13" cy="10.8" r="1" fill="#FFCC00" />
  </svg>
);

export default function App() {
  const [currentView, setCurrentView] = useState('calculator'); // 'calculator' | 'postulates'
  const [scope, setScope] = useState('local'); // 'local' | 'national'
  const [showExternalComparison, setShowExternalComparison] = useState(false); // Sterowanie widocznością wyników zewnętrznych
  const [showPolishHistory, setShowPolishHistory] = useState(false); // Sterowanie widocznością wyników z Polski
  const [noThresholdMode, setNoThresholdMode] = useState(false); // Tryb bezprogowy (Demokracja Bezpośrednia)
  
  // Stan dla referendum lokalnego
  const [selectedCity, setSelectedCity] = useState('Warszawa');
  const [localType, setLocalType] = useState('odwolawcze'); // 'odwolawcze' | 'merytoryczne' | 'podatki'
  const [customU, setCustomU] = useState(100000);
  const [customV, setCustomV] = useState(50000);
  
  // Stan dla referendum ogólnokrajowego
  const [nationalType, setNationalType] = useState('art125'); // 'art125' | 'art235'
  const [nationalU, setNationalU] = useState(29252340); // Baza wyborców wg raportu
  
  // Stan dla zebranych podpisów (Domyślnie ustawiony na 100 000 zgodnie z prośbą)
  const [collectedSignatures, setCollectedSignatures] = useState(100000);

  // Stan symulacji (i)
  const [simTurnoutPct, setSimTurnoutPct] = useState(12);
  const [simSupportPct, setSimSupportPct] = useState(75);

  // Funkcje formatujące
  const formatNum = (num) => Math.ceil(num).toLocaleString('pl-PL');

  // Obliczenia parametrów
  const getCalcData = () => {
    let u, v, signatures, validityThreshold, decisionThresholdPct, validityLabel;

    if (scope === 'local') {
      const isCustom = selectedCity === 'custom';
      u = isCustom ? customU : citiesData[selectedCity].u2025;
      v = isCustom ? customV : citiesData[selectedCity].v2024;
      signatures = u * 0.10; // 10%
      decisionThresholdPct = 0.50; // >50%

      if (localType === 'odwolawcze') {
        validityThreshold = v * 0.60; // 3/5 z poprzednich wyborów
        validityLabel = "3/5 uczestników z poprz. wyborów";
      } else {
        validityThreshold = u * 0.30; // 30% uprawnionych
        validityLabel = "30% uprawnionych";
        if (localType === 'podatki') {
          decisionThresholdPct = 0.666667; // 2/3 ważnych głosów
        }
      }
    } else {
      u = nationalU;
      v = 0; // Nieużywane ogólnokrajowo
      signatures = 500000; // Stała dla inicjatywy obywatelskiej art. 125
      decisionThresholdPct = 0.50;
      
      if (nationalType === 'art125') {
        validityThreshold = (nationalU / 2) + 1; // >50% (połowa + 1)
        validityLabel = "> 50% uprawnionych";
      } else {
        validityThreshold = 0; // Konstytucyjne - brak progu
        validityLabel = "Brak progu frekwencyjnego";
      }
    }

    const simVoters = u * (simTurnoutPct / 100);
    const simVotesFor = simVoters * (simSupportPct / 100);
    
    const hasMajority = simVotesFor > simVoters * decisionThresholdPct;
    const actualValid = simVoters >= validityThreshold;
    
    // Override progu w trybie bezprogowym
    const isValid = (noThresholdMode && (scope === 'local' || nationalType !== 'art235')) ? true : actualValid;
    const isDecisive = isValid && hasMajority;

    return {
      u, v, signatures, validityThreshold, decisionThresholdPct, 
      simVoters, simVotesFor, isValid, isDecisive, validityLabel
    };
  };

  const data = getCalcData();

  // Komponent pojedynczego postulatu (ujednolicony styl)
  const PostulateCard = ({ icon: Icon, title, hash, problem, postulate, detailLabel, detailValue }) => (
    <div className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-red-200 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-2">
            {title} {hash && <span className="text-red-600 font-bold text-sm bg-red-50 px-2 py-0.5 rounded-full">{hash}</span>}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50/40 p-4 rounded-xl border border-red-50/50">
              <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" /> Problem
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">{problem}</p>
            </div>
            <div className="bg-green-50/40 p-4 rounded-xl border border-green-50/50">
              <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                <CheckCircle className="w-3 h-3" /> Postulat
              </p>
              <p className="text-gray-800 text-sm leading-relaxed font-bold">{postulate}</p>
            </div>
          </div>
          {detailValue && (
            <div className="pt-4 border-t border-gray-50">
              <p className="text-gray-600 text-sm leading-relaxed italic">
                <strong className="text-gray-800 not-italic mr-1">{detailLabel}:</strong> {detailValue}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12 animate-in fade-in duration-500">
      {/* GLOBALNY NAGŁÓWEK I NAWIGACJA (Branding) */}
      <header className="bg-white text-gray-900 pt-8 shadow-sm border-b border-gray-200 relative overflow-hidden z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6 px-4">
          
          {/* Polska flaga na samej górze - POWIĘKSZONA */}
          <div className="w-full flex justify-center mb-2">
            <div className="w-28 h-16 flex flex-col rounded-lg shadow-md overflow-hidden border border-gray-200 ring-4 ring-gray-50 transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-1/2 bg-white"></div>
              <div className="w-full h-1/2 bg-[#DC143C]"></div>
            </div>
          </div>
          
          {/* Nowy Tytuł i Lead */}
          <div className="flex flex-col items-center">
            <h1 className="font-black tracking-tight text-gray-900 mb-4 uppercase leading-none text-center">
  <span className="text-4xl md:text-6xl block mb-2">
    <span className="text-gray-900">POLICZ</span>
    <span className="text-red-600">REFERENDUM.PL</span>
  </span>
</h1>
            <p className="text-gray-600 text-base md:text-lg font-bold max-w-2xl mx-auto leading-relaxed">
              Postulujemy 4 zmiany do systemu referendalnego w Polsce.<br />Przywróćmy głos obywatelom!
            </p>
          </div>
        </div>

        {/* Utworzenie przejrzystego menu */}
        <div className="max-w-5xl mx-auto mt-8 px-4 flex justify-center">
          <nav className="flex flex-col md:flex-row items-end gap-2 md:gap-4 border-b border-gray-200 w-full justify-center">
            <button 
              className={`pb-3 px-4 md:px-6 font-bold text-sm md:text-base border-b-4 transition-colors ${currentView === 'calculator' && scope === 'local' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
              onClick={() => { setCurrentView('calculator'); setScope('local'); window.scrollTo(0,0); }}
            >
              Referendum lokalne
            </button>
            <button 
              className={`pb-3 px-4 md:px-6 font-bold text-sm md:text-base border-b-4 transition-colors ${currentView === 'calculator' && scope === 'national' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
              onClick={() => { setCurrentView('calculator'); setScope('national'); window.scrollTo(0,0); }}
            >
              Referendum ogólnokrajowe
            </button>
            {/* Link do "Postulatów zmian" wyciągnięty na samą górę jako kluczowy element */}
            <button 
              className={`px-6 py-3 md:mb-0 mb-2 font-black text-sm md:text-base rounded-t-xl transition-all flex items-center justify-center gap-2 ${currentView === 'postulates' ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 border-b-0'}`}
              style={currentView === 'postulates' ? { transform: 'translateY(1px)' } : {}}
              onClick={() => { setCurrentView('postulates'); window.scrollTo(0,0); }}
            >
              <Zap className={currentView === 'postulates' ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-red-500"} /> 
              Postulaty zmian
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 mt-4">
        {currentView === 'postulates' ? (
          <div className="animate-in fade-in duration-300">
            {/* WIDOK: POSTULATY ZMIAN */}
            <div className="space-y-8 mt-6">
              <PostulateCard 
                icon={Ban}
                title="1. Likwidacja progu frekwencyjnego"
                problem="Próg frekwencji w referendum zachęca do taktycznego bojkotu – przeciwnicy danej idei zostają w domu."
                postulate="Referendum powinno być wiążące bez względu na frekwencję."
                detailLabel="Dlaczego?"
                detailValue="Nieobecni dają milczącą zgodę na wynik referendum ustalony przez głosujących. To jedyny sposób, aby zachęcić obywateli do masowego udziału w referendum, a ugrupowania polityczne - do rzetelnej kampanii merytorycznej."
              />

              <PostulateCard 
                icon={Gavel}
                title="2. Wprowadzenie Weta Obywatelskiego"
                problem="Obywatele nie mają dziś narzędzia, by zatrzymać ustawę uchwaloną przez Parlament i podpisaną przez Prezydenta, która budzi powszechny sprzeciw społeczny."
                postulate="Wprowadzenie instytucji Weta Obywatelskiego (referendum blokującego dla ustaw)."
                detailLabel="Jak to działa?"
                detailValue="Jeśli obywatele w krótkim czasie (np. 100 dni) zbiorą 500 000 podpisów, nowa ustawa trafia pod ogólnokrajowe głosowanie. Jeśli Suweren powie NIE – ustawa wraca na początek ścieżki legislacyjnej."
              />

              <PostulateCard 
                icon={Zap}
                title="3. Elektroniczne zbieranie podpisów"
                problem="Zbieranie setek tysięcy podpisów na papierowych listach to ogromne wyzwanie logistyczne i organizacyjne, na które stać tylko największe ugrupowania."
                postulate="Umożliwienie zbierania podpisów drogą elektroniczną (Profil Zaufany / mObywatel)."
                detailLabel="Dlaczego?"
                detailValue="Radykalne obniżenie kosztów zbierania niezbędnych podpisów, lepsza jakość zebranych podpisów oraz skuteczna ochrona danych osobowych."
              />

              <PostulateCard 
                icon={BookOpen}
                title="4. Centralny rejestr referendów"
                problem="Przed referendami obywatele często nie są w stanie dotrzeć do szczegółów propozycji oraz zapoznać się z merytorycznymi argumentami obu stron."
                postulate="Centralny rejestr referendów - rządowa strona internetowa prezentująca listę wszystkich referendów lokalnych i ogólnopolskich, z transparentnie zaprezentowanymi argumentami obu stron."
                detailLabel="Co w środku?"
                detailValue="Jasny opis zmian oraz argumenty stron ZA i PRZECIW, przygotowane przez inicjatorów i oponentów w równym wymiarze miejsca."
              />
              
            </div>
            
            <div className="mt-8 pt-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 text-center">
                <p>Aplikacja edukacyjna przygotowana przez Fundację Polskiego Rozwoju 🇵🇱. Dane szacunkowe na 2025.</p>
              </div>
              <div className="mt-6 flex justify-center">
                <img src="/logo_FPR.svg" alt="Logo Fundacji" className="h-48 w-auto opacity-90 hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <a 
                  href="https://fundacjapro.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-gray-500 hover:text-red-600 underline decoration-gray-300 hover:decoration-red-500 transition-colors"
                >
                  fundacjapro.org
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* WIDOK: KALKULATORY */}

            {/* 1 i 2: Sekcja Konfiguracji */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Calculator className="w-5 h-5 text-red-600" />
                Parametry wejściowe
              </h2>

              {scope === 'local' ? (
                <div className="space-y-8">
                  {/* KROK 1: Wybierz jednostkę samorządu */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz jednostkę samorządu</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <optgroup label="20 największych miast">
                          {Object.keys(citiesData).map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Inne">
                          <option value="custom">Wprowadź dane ręcznie...</option>
                        </optgroup>
                      </select>
                    </div>

                    {selectedCity === 'custom' && (
                      <div className="p-4 bg-gray-50 rounded-md border border-gray-200 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Liczba uprawnionych do głosowania</label>
                          <input 
                            type="number" min="0" 
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={customU} onChange={(e) => setCustomU(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Biorący udział w wyborze organu</label>
                          <input 
                            type="number" min="0" 
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={customV} onChange={(e) => setCustomV(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* KROK 2: Przedmiot referendum */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Przedmiot referendum</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      <label className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${localType === 'odwolawcze' ? 'bg-red-50 border-red-500 shadow-sm' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="localType" className="mt-1 text-red-600 focus:ring-red-500" 
                          checked={localType === 'odwolawcze'} onChange={() => setLocalType('odwolawcze')} />
                        <div>
                          <span className="block font-medium">Odwołanie organu (np. Prezydenta)</span>
                          <span className="text-xs text-gray-500">Próg: 3/5 głosów z poprzednich wyborów</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${localType === 'merytoryczne' ? 'bg-red-50 border-red-500 shadow-sm' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="localType" className="mt-1 text-red-600 focus:ring-red-500" 
                          checked={localType === 'merytoryczne'} onChange={() => setLocalType('merytoryczne')} />
                        <div>
                          <span className="block font-medium">Merytoryczne (istotne sprawy)</span>
                          <span className="text-xs text-gray-500">Próg: 30% uprawnionych mieszkańców</span>
                        </div>
                      </label>
                      <label className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${localType === 'podatki' ? 'bg-red-50 border-red-500 shadow-sm' : 'hover:bg-gray-50'}`}>
                        <input type="radio" name="localType" className="mt-1 text-red-600 focus:ring-red-500" 
                          checked={localType === 'podatki'} onChange={() => setLocalType('podatki')} />
                        <div>
                          <span className="block font-medium">Samoopodatkowanie mieszkańców</span>
                          <span className="text-xs text-gray-500">Wymaga 2/3 ważnych głosów na TAK</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* KROK 1: Liczba uprawnionych do głosowania (kraj) */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Liczba uprawnionych do głosowania (kraj)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md p-2" value={nationalU} onChange={(e) => setNationalU(Number(e.target.value))} />
                    </div>
                  </div>

                  {/* KROK 2: Przedmiot referendum */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Przedmiot referendum</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${nationalType === 'art125' ? 'bg-red-50 border-red-500 shadow-sm' : 'hover:bg-gray-50'}`}>
                        <input 
                          type="radio" 
                          className="mt-1 text-red-600 focus:ring-red-500" 
                          checked={nationalType === 'art125'} 
                          onChange={() => setNationalType('art125')} 
                        />
                        <div>
                          <span className="block font-medium text-gray-800">Sprawy o szczególnym znaczeniu (Art. 125)</span>
                          <span className="text-xs text-gray-500 font-normal">Wiążące przy frekwencji &gt; 50%</span>
                        </div>
                      </label>
                      
                      <label className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-colors ${nationalType === 'art235' ? 'bg-red-50 border-red-500 shadow-sm' : 'hover:bg-gray-50'}`}>
                        <input 
                          type="radio" 
                          className="mt-1 text-red-600 focus:ring-red-500" 
                          checked={nationalType === 'art235'} 
                          onChange={() => setNationalType('art235')} 
                        />
                        <div>
                          <span className="block font-medium text-gray-800">Konstytucyjne (Art. 235)</span>
                          <span className="text-xs text-gray-500 font-normal">Zawsze wiążące, brak progu frekwencji</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3: Sekcja Wyników Sztywnych */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Baza Wyborcza</h3>
                <p className="text-3xl font-black text-gray-800">{formatNum(data.u)}</p>
              </div>
              <div className={`border p-5 rounded-xl shadow-sm transition-colors ${collectedSignatures >= data.signatures ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${collectedSignatures >= data.signatures ? 'text-green-800' : 'text-red-800'}`}>Wymagane podpisy</h3>
                <p className={`text-3xl font-black ${collectedSignatures >= data.signatures ? 'text-green-700' : 'text-red-700'}`}>{formatNum(data.signatures)}</p>
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Próg Ważności</h3>
                <p className="text-3xl font-black text-gray-800">{data.validityThreshold === 0 ? "Brak" : formatNum(data.validityThreshold)}</p>
                <p className="text-xs text-gray-500 mt-1">{data.validityLabel}</p>
              </div>
            </div>

            {/* 4: Sekcja Suwaka z Podpisami */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Zap className="w-5 h-5 text-red-600" />
                Zebrane podpisy poparcia
              </h2>
              {scope === 'local' ? (
                <div className={`p-4 rounded-lg border transition-colors duration-300 ${collectedSignatures >= data.signatures ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'}`}>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-bold text-gray-800">Liczba zebranych podpisów</label>
                    <span className={`font-bold text-sm ${collectedSignatures >= data.signatures ? 'text-green-600' : 'text-red-600'}`}>
                      {formatNum(Number(collectedSignatures) || 0)} ({((Number(collectedSignatures) / data.u) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <input 
  type="range" min="0" max={Math.floor(data.u * 0.25)} step="1"
  className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-3 mt-2 transition-colors duration-300 ${collectedSignatures >= data.signatures ? 'accent-green-600' : 'accent-red-600'}`}
  value={collectedSignatures || 0} 
  onChange={(e) => setCollectedSignatures(Math.min(Number(e.target.value), Math.floor(data.u * 0.25)))}
/>
<input 
  type="number" min="0" max={Math.floor(data.u * 0.25)}
  className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
  value={collectedSignatures} 
  onChange={(e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    setCollectedSignatures(val !== '' ? Math.min(val, Math.floor(data.u * 0.25)) : '');
  }}
  placeholder="Wpisz dokładną liczbę..."
/>
                  <div className={`mt-4 text-center font-black uppercase text-sm tracking-wide ${collectedSignatures >= data.signatures ? 'text-green-600' : 'text-red-600'}`}>
                    {collectedSignatures >= data.signatures ? 'ZEBRANO WYSTARCZAJĄCĄ ILOŚĆ PODPISÓW DO PRZEPROWADZENIA REFERENDUM' : 'NIE ZEBRANO WYSTARCZAJĄCEJ ILOŚCI PODPISÓW DO PRZEPROWADZENIA REFERENDUM'}
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-lg border transition-colors duration-300 ${collectedSignatures >= data.signatures ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'}`}>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-bold text-gray-800">Liczba zebranych podpisów</label>
                    <span className={`font-bold text-sm ${collectedSignatures >= data.signatures ? 'text-green-600' : 'text-red-600'}`}>
                      {formatNum(collectedSignatures)} ({((collectedSignatures / nationalU) * 100).toFixed(1)}%)
                    </span>
                  </div>
                 <input 
  type="range" min="0" max={Math.floor(nationalU * 0.25)} step="1000" 
  className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-3 mt-2 transition-colors duration-300 ${collectedSignatures >= data.signatures ? 'accent-green-600' : 'accent-red-600'}`} 
  value={collectedSignatures} 
  onChange={(e) => setCollectedSignatures(Math.min(Number(e.target.value), Math.floor(nationalU * 0.25)))} 
/>
<input 
  type="number" min="0" max={Math.floor(nationalU * 0.25)}
  className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
  value={collectedSignatures} 
  onChange={(e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    setCollectedSignatures(val !== '' ? Math.min(val, Math.floor(nationalU * 0.25)) : '');
  }}
  placeholder="Wpisz dokładną liczbę..."
/>
                  <div className={`mt-4 text-center font-black uppercase text-sm tracking-wide ${collectedSignatures >= data.signatures ? 'text-green-600' : 'text-red-600'}`}>
                    {collectedSignatures >= data.signatures ? 'ZEBRANO WYSTARCZAJĄCĄ ILOŚĆ PODPISÓW DO PRZEPROWADZENIA REFERENDUM' : 'NIE ZEBRANO WYSTARCZAJĄCEJ ILOŚCI PODPISÓW DO PRZEPROWADZENIA REFERENDUM'}
                  </div>
                </div>
              )}
            </div>

            {/* Symulator */}
            <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 transition-colors duration-300 ${collectedSignatures >= data.signatures ? 'border-t-red-600' : 'border-t-gray-400'}`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <Users className={`w-5 h-5 transition-colors ${collectedSignatures >= data.signatures ? 'text-red-600' : 'text-gray-400'}`} />
                Symulator głosowania
              </h2>
              
              {collectedSignatures < data.signatures && (
                <div className="mb-8 bg-red-50 border border-red-200 p-5 rounded-lg text-center shadow-sm">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="font-bold text-red-800 text-lg">Symulacja zablokowana: Zbyt mało podpisów</p>
                  <p className="text-sm text-red-700 mt-1 max-w-2xl mx-auto">
                    W polskim systemie inicjatywa obywatelska musi najpierw uzyskać odpowiednie poparcie, aby referendum mogło się odbyć.
                  </p>
                </div>
              )}

              <div className={`transition-all duration-300 ${collectedSignatures < data.signatures ? 'opacity-30 pointer-events-none grayscale blur-[1px]' : ''}`}>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-semibold text-gray-700">Symulowana frekwencja</label>
                      <span className="font-bold text-red-600">{simTurnoutPct}%</span>
                    </div>
                    <input 
                      type="range" min="1" max="100" step="0.1"
                      disabled={collectedSignatures < data.signatures}
                      value={simTurnoutPct} onChange={(e) => setSimTurnoutPct(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 disabled:cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-500 mt-3">
                      Przewidywana liczba głosujących: <strong>{formatNum(data.simVoters)}</strong>
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-semibold text-gray-700">Głosy na "TAK"</label>
                      <span className="font-bold text-red-600">{simSupportPct}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="0.1"
                      disabled={collectedSignatures < data.signatures}
                      value={simSupportPct} onChange={(e) => setSimSupportPct(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 disabled:cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Przewidywana liczba głosów ZA: <strong>{formatNum(data.simVotesFor)}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                    <h3 className="text-lg font-bold text-center text-gray-800">Status przy powyższych parametrach:</h3>
                    
                    {/* Przełącznik: Tryb bezprogowy - ukryty dla Art. 235 (brak progu) */}
                    {!(scope === 'national' && nationalType === 'art235') && (
                      <label className="flex items-center cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={noThresholdMode} 
                            onChange={() => setNoThresholdMode(!noThresholdMode)}
                            disabled={collectedSignatures < data.signatures}
                          />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${noThresholdMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${noThresholdMode ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-sm font-bold text-gray-700 flex items-center gap-1">
                          Model bezprogowy
                        </div>
                      </label>
                    )}
                  </div>

                  {noThresholdMode && !(scope === 'national' && nationalType === 'art235') && (
                    <div className="mb-4 bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                      <p>
                        <strong>Model bezprogowy:</strong> referendum powinno być wiążące bez względu na frekwencję. Osoba niebiorąca udziału w głosowaniu powinna być traktowana jako akceptująca wynik wypracowany przez aktywnych obywateli.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <div className={`flex-1 p-4 rounded-lg flex items-center gap-3 border transition-colors ${data.isValid ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                      {data.isValid ? <CheckCircle className="w-8 h-8 flex-shrink-0" /> : <AlertCircle className="w-8 h-8 flex-shrink-0" />}
                      <div>
                        <p className="font-bold text-lg">{data.isValid ? 'Ważne / Wiążące' : 'Nieważne / Opiniodawcze'}</p>
                        <p className="text-sm opacity-90">
                          {data.isValid 
                            ? (noThresholdMode && (scope === 'local' || (scope === 'national' && nationalType !== 'art235')) ? "Frekwencja nie ma znaczenia (model bezprogowy)." : "Osiągnięto wymagany próg frekwencji.")
                            : `Brakuje ${formatNum(Math.max(0, data.validityThreshold - data.simVoters))} uczestników.`}
                        </p>
                      </div>
                    </div>
                    <div className={`flex-1 p-4 rounded-lg flex items-center gap-3 border transition-colors ${data.isDecisive ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                      {data.isDecisive ? <CheckCircle className="w-8 h-8 flex-shrink-0" /> : <Info className="w-8 h-8 flex-shrink-0" />}
                      <div>
                        <p className="font-bold text-lg">{data.isDecisive ? 'Większość ZA' : 'Brak większości'}</p>
                        <p className="text-sm opacity-90">
                          {data.isDecisive ? "Uzyskano wymaganą większość głosów." : `Wymagane >${(data.decisionThresholdPct*100).toFixed(0)}% poparcia.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informacja o SUKCESIE (wynik pozytywny) */}
                  {(data.isValid && data.isDecisive) && (
                    <div className="mt-6 bg-green-600 text-white p-4 rounded-lg text-center font-bold shadow-lg flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6" />
                      <span>
                        {scope === 'local' && localType === 'odwolawcze' 
                          ? "Gratulacje! Udało się odwołać organ." 
                          : "Gratulacje! Decyzja jest wiążąca i pozytywna."}
                      </span>
                    </div>
                  )}

                  {/* Informacja o PORAŻCE (wynik negatywny) */}
                  {(!data.isValid || !data.isDecisive) && collectedSignatures >= data.signatures && (
                    <div className="mt-6 bg-red-600 text-white p-4 rounded-lg text-center font-bold shadow-lg flex items-center justify-center gap-3">
                      <XCircle className="w-6 h-6" />
                      <span>
                        {data.isValid && !data.isDecisive
                          ? "Decyzja jest wiążąca, ale większość głosujących była za odrzuceniem postulatów."
                          : (scope === 'local' && localType === 'odwolawcze' 
                              ? "Tym razem nie udało się odwołać organu!" 
                              : scope === 'local' 
                                ? "Tym razem nie udało się podjąć wiążącej decyzji!" 
                                : "Tym razem głosowanie nie przyniosło rozstrzygnięcia!")
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PRZYCISK: Historyczne wyniki w Polsce */}
            <div className="flex justify-center">
              <button 
                onClick={() => setShowPolishHistory(!showPolishHistory)}
                className="w-full md:w-[850px] bg-white hover:bg-gray-50 text-black font-extrabold py-8 px-10 text-2xl rounded-2xl transition-all shadow-lg flex items-center justify-center gap-6 border border-gray-200 active:translate-y-1"
              >
                <PolishFlagIcon className="w-12 h-12 shadow-md flex-shrink-0" />
                <span className="text-center">{showPolishHistory ? "Ukryj historię z Polski" : "Historyczne wyniki referendów w Polsce"}</span>
              </button>
            </div>

            {/* Tabela historyczna Polska */}
            {showPolishHistory && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-500" />
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Historyczne wyniki ({scope === 'local' ? 'Lokalne' : 'Ogólnokrajowe'})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        {scope === 'local' ? (
                          <>
                            <th className="px-4 py-2">Lp.</th>
                            <th className="px-4 py-2">Miejsce</th>
                            <th className="px-4 py-2">Data</th>
                            <th className="px-4 py-2">Przedmiot referendum</th>
                            <th className="px-4 py-2 text-right">Frekwencja</th>
                            <th className="px-4 py-2">Próg ważności</th>
                            <th className="px-4 py-2">Status / Wynik</th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-2">Rok</th>
                            <th className="px-4 py-2">Przedmiot</th>
                            <th className="px-4 py-2 text-right">Frekwencja</th>
                            <th className="px-4 py-2 text-right">Próg ważności</th>
                            <th className="px-4 py-2">Wynik</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {scope === 'local' ? localHistoryData.map((item, idx) => (
                        <tr key={idx} className={`border-b ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
                          <td className="px-4 py-2">{item.lp}.</td>
                          <td className="px-4 py-2 font-medium text-gray-900">{item.miejsce}</td>
                          <td className="px-4 py-2">{item.data}</td>
                          <td className="px-4 py-2">{item.przedmiot}</td>
                          <td className={`px-4 py-2 text-right font-bold ${item.wynik.includes('Nieważne') ? 'text-red-600' : 'text-green-600'}`}>
                          {item.frekwencja}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">{item.prog}</td>
                          <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.wynik}</span></td>
                        </tr>
                      )) : nationalHistoryData.map((item, idx) => (
                        <tr key={idx} className={`border-b ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
                          <td className="px-4 py-2 font-medium">{item.rok}</td>
                          <td className="px-4 py-2">{item.przedmiot}</td>
                          <td className={`px-4 py-2 text-right font-bold ${item.wynik.includes('Niewiążące') ? 'text-red-600' : 'text-green-600'}`}>
      {item.frekwencja}
    </td>
                          <td className="px-4 py-2 text-right text-xs text-gray-500">{item.prog}</td>
                          <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.wynik}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PRZYCISK: Zewnętrzne porównanie (Szwajcaria / UE) */}
            <div className="flex justify-center">
              <button 
                onClick={() => setShowExternalComparison(!showExternalComparison)}
                className="w-full md:w-[850px] bg-white hover:bg-gray-50 text-black font-extrabold py-8 px-10 text-2xl rounded-2xl transition-all shadow-lg flex items-center justify-center gap-6 border border-gray-200 active:translate-y-1"
              >
                {scope === 'local' ? (
                  <SwissFlagIcon className="w-12 h-12 shadow-md flex-shrink-0" />
                ) : (
                  <EUFlagIcon className="w-12 h-12 shadow-md flex-shrink-0" />
                )}
<span className="text-center">{showExternalComparison ? (scope === 'local' ? "Ukryj historię ze Szwajcarii" : "Ukryj historię z Unii Europejskiej") : (scope === 'local' ? "Historyczne wyniki referendów w Szwajcarii" : "Historyczne wyniki referendów w Unii Europejskiej")}</span>              </button>
            </div>

            {/* Sekcja Porównawcza (Szwajcaria / UE) */}
            {showExternalComparison && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="bg-blue-50 px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                      {scope === 'local' ? "Model Szwajcarski: Demokracja Bezpośrednia" : "Unia Europejska: Standardy Demokratyczne"}
                    </h3>
                  </div>
                  <div className="flex gap-2 md:mr-32">
                    {scope === 'local' && (
                      <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold uppercase">Brak progów frekwencji</span>
                    )}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">Lp.</th>
                        <th className="px-4 py-2">Miejsce</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Przedmiot referendum</th>
                        <th className="px-4 py-2 text-right">Frekwencja</th>
                        <th className="px-4 py-2">Próg ważności</th>
                        <th className="px-4 py-2">Status / Wynik</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(scope === 'local' ? swissData : euData).map((item, index) => (
                        <tr key={item.lp} className={`border-b ${index % 2 !== 0 ? 'bg-gray-50' : ''}`}>
                          <td className="px-4 py-2 font-medium text-gray-900">{item.lp}.</td>
                          <td className="px-4 py-2">{item.miejsce}</td>
                          <td className="px-4 py-2">{item.data}</td>
                          <td className="px-4 py-2">{item.przedmiot}</td>
                        <td className={`px-4 py-2 text-right font-bold ${item.wynik.includes('Nieważne') ? 'text-red-600' : 'text-green-600'}`}>
      {item.frekwencja}
    </td>
                          <td className="px-4 py-2 text-xs">{scope === 'local' ? "Brak" : item.prog}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.wynik}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-gray-50 text-[11px] text-gray-500 text-center italic border-t border-gray-200">
                  {scope === 'local' 
                    ? "Szwajcaria: Głosy są wiążące niezależnie od liczby uczestników." 
                    : "Unia Europejska: Standardy progów kworum różnią się między krajami członkowskimi."}
                </div>
              </div>
            )}

            {/* Postulaty zmian */}
            <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-xl">
              <div className="p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-black text-red-500 mb-2 uppercase tracking-wide">Postulaty zmian</h2>
                  <p className="text-gray-300 max-w-2xl text-sm leading-relaxed">Polski system referendalny faworyzuje bierność. Przywróćmy głos obywatelom!</p>
                </div>
                <button 
                  onClick={() => { setCurrentView('postulates'); window.scrollTo(0, 0); }}
                  className="whitespace-nowrap bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Dowiedz się więcej <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

           {/* Stopka z Logo i Informacją o Fundacji */}
            <div className="text-xs text-gray-500 text-center pb-8 mt-6">
              <div className="flex flex-col items-center gap-2">
                <div className="space-y-1">
                  <p>Aplikacja edukacyjna przygotowana przez Fundację Polskiego Rozwoju 🇵🇱. Dane szacunkowe na 2026.</p>
                </div>
                <div className="mt-6 flex justify-center">
                  <img 
                    src="./logo_FPR.svg" 
                    alt="Fundacja Polskiego Rozwoju" 
                    className="h-48 w-auto opacity-90 hover:opacity-100 transition-opacity" 
                  />
                </div>
                <div className="mt-4">
                <a 
                  href="https://fundacjapro.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-gray-500 hover:text-red-600 underline decoration-gray-300 hover:decoration-red-500 transition-colors"
                >
                  fundacjapro.org
                </a>
              </div>
              </div>
            </div>
          </div> 
        )} 
      </main> 
    </div>
  );
}

import ReactDOM from 'react-dom/client'

// Renderowanie aplikacji do elementu o id "root" z pliku index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
