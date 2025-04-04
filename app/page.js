'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Finanzierungsrechner() {
  const [preis, setPreis] = useState(27160);
  const [laufzeit, setLaufzeit] = useState(36);
  const [zins, setZins] = useState(4.9);
  const [anzahlungAktiv, setAnzahlungAktiv] = useState(true);
  const [nachlassProzent, setNachlassProzent] = useState(8.0);
  const [ergebnis, setErgebnis] = useState(null);

  const berechneFinanzierung = () => {
    const r = zins / 100 / 12;
    const anzahlung = anzahlungAktiv ? preis / 3 : 0;
    const finanzierungsbetrag = preis - anzahlung;
    const monatlicheRate = finanzierungsbetrag / laufzeit;
    const internFinanzierung =
      monatlicheRate * ((1 + r) ** laufzeit - 1) / (r * (1 + r) ** laufzeit);
    const tatsächlicherNachlass = internFinanzierung - finanzierungsbetrag;
    const geplanterNachlassEuro = preis * nachlassProzent / 100;
    const differenz = geplanterNachlassEuro - tatsächlicherNachlass;

    setErgebnis({
      anzahlung: anzahlung.toFixed(2),
      monatlicheRate: monatlicheRate.toFixed(2),
      internFinanzierung: internFinanzierung.toFixed(2),
      tatsächlicherNachlass: tatsächlicherNachlass.toFixed(2),
      geplanterNachlassEuro: geplanterNachlassEuro.toFixed(2),
      nachlassProzent: nachlassProzent.toFixed(2),
      differenz: differenz.toFixed(2)
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-2">Finanzierungsrechner</h1>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={anzahlungAktiv} onChange={() => setAnzahlungAktiv(!anzahlungAktiv)} />
        Mit Anzahlung (1/3)
      </label>
      <Input type="number" value={preis} onChange={(e) => setPreis(parseFloat(e.target.value))} placeholder="Klavierpreis (€)" />
      <Input type="number" value={laufzeit} onChange={(e) => setLaufzeit(parseInt(e.target.value))} placeholder="Laufzeit (Monate)" />
      <Input type="number" value={zins} onChange={(e) => setZins(parseFloat(e.target.value))} placeholder="Zinssatz p.a. (%)" />
      <Input type="number" value={nachlassProzent} onChange={(e) => setNachlassProzent(parseFloat(e.target.value))} placeholder="Gewünschter Nachlass (%)" />
      <Button onClick={berechneFinanzierung}>Berechnen</Button>

      {ergebnis && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p><strong>Anzahlung:</strong> € {ergebnis.anzahlung}</p>
            <p><strong>Monatliche Rate (0%):</strong> € {ergebnis.monatlicheRate}</p>
            <p><strong>Interner Finanzierungsbetrag:</strong> € {ergebnis.internFinanzierung}</p>
            <hr />
            <p><strong>Tatsächlicher benötigter Nachlass:</strong> € {ergebnis.tatsächlicherNachlass}</p>
            <p><strong>Geplanter Nachlass:</strong> € {ergebnis.geplanterNachlassEuro} ({ergebnis.nachlassProzent}%)</p>
            <p><strong>Überschuss/Fehlbetrag:</strong> € {ergebnis.differenz}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
