import { useState } from "react";

export default function VoltageDividerCalculator() {
  const [vin, setVin] = useState<number | "">("");
  const [r1, setR1] = useState<number | "">("");
  const [r2, setR2] = useState<number | "">("");
  const [vout, setVout] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateVoltageDivider = () => {
    try {
      if (vin === "" || r1 === "" || r2 === "") {
        throw new Error("Please enter all values.");
      }

      if (r1 + r2 === 0) {
        throw new Error("R1 + R2 cannot be zero.");
      }

      const result = vin * (r2 / (r1 + r2));
      setVout(`${result.toFixed(3)} V`);
      setError(null);
    } catch (err: any) {
      setVout(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Voltage Divider Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Input Voltage (Vin)"
          value={vin}
          onChange={(e) => setVin(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Resistor R1 (Ω)"
          value={r1}
          onChange={(e) => setR1(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Resistor R2 (Ω)"
          value={r2}
          onChange={(e) => setR2(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={calculateVoltageDivider}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {vout && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Output Voltage (Vout): {vout}
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
