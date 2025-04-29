import { useState } from "react";

export default function PowerDissipationCalculator() {
  const [voltage, setVoltage] = useState<number | "">("");
  const [current, setCurrent] = useState<number | "">("");
  const [resistance, setResistance] = useState<number | "">("");
  const [power, setPower] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculatePower = () => {
    try {
      const hasVoltage = voltage !== "";
      const hasCurrent = current !== "";
      const hasResistance = resistance !== "";

      if (
        (hasVoltage && hasCurrent) ||
        (hasCurrent && hasResistance) ||
        (hasVoltage && hasResistance)
      ) {
        let result: number = 0;

        if (hasVoltage && hasCurrent) {
          result = voltage * current;
        } else if (hasCurrent && hasResistance) {
          result = Math.pow(current, 2) * resistance;
        } else if (hasVoltage && hasResistance) {
          result = Math.pow(voltage, 2) / resistance;
        }

        setPower(`${result.toFixed(3)} W`);
        setError(null);
      } else {
        throw new Error("Please enter any two values to calculate power.");
      }
    } catch (err: any) {
      setPower(null);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Power Dissipation Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Voltage (V)"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Current (A)"
          value={current}
          onChange={(e) => setCurrent(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Resistance (Ω)"
          value={resistance}
          onChange={(e) => setResistance(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={calculatePower}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {power && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Power Dissipated: {power}
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
