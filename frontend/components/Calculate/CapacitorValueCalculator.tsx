import { useState } from "react";

export default function CapacitorValueCalculator() {
  const [capacitance, setCapacitance] = useState<number | "">("");
  const [frequency, setFrequency] = useState<number | "">("");
  const [unit, setUnit] = useState<"uF" | "nF">("uF");
  const [reactance, setReactance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateReactance = () => {
    try {
      if (capacitance === "" || frequency === "") {
        throw new Error("Please enter both capacitance and frequency.");
      }

      let capacitanceFarads: number;

      if (unit === "uF") {
        capacitanceFarads = capacitance * 1e-6;
      } else {
        capacitanceFarads = capacitance * 1e-9;
      }

      if (capacitanceFarads <= 0 || frequency <= 0) {
        throw new Error("Values must be greater than zero.");
      }

      const reactanceValue = 1 / (2 * Math.PI * frequency * capacitanceFarads);
      setReactance(`${reactanceValue.toFixed(3)} Ω`);
      setError(null);
    } catch (err: any) {
      setReactance(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Capacitor Value Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Capacitance"
            value={capacitance}
            onChange={(e) => setCapacitance(e.target.value ? Number(e.target.value) : "")}
            className="p-2 border rounded w-full"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "uF" | "nF")}
            className="ml-2 p-2 border rounded"
          >
            <option value="uF">µF</option>
            <option value="nF">nF</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Frequency (Hz)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={calculateReactance}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {reactance && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Capacitive Reactance (Xc): {reactance}
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
