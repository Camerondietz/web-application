import { useState } from "react";

export default function ThermalResistanceCalculator() {
  const [tJunction, setTJunction] = useState<number | "">("");
  const [tAmbient, setTAmbient] = useState<number | "">("");
  const [power, setPower] = useState<number | "">("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateResistance = () => {
    try {
      if (
        tJunction === "" ||
        tAmbient === "" ||
        power === "" ||
        power === 0
      ) {
        throw new Error("Please fill in all fields with valid numbers (power > 0).");
      }

      const rTheta = (tJunction - tAmbient) / power;
      setResult(`${rTheta.toFixed(2)} °C/W`);
      setError(null);
    } catch (err: any) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Junction Temp (°C)"
          value={tJunction}
          onChange={(e) => setTJunction(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Ambient Temp (°C)"
          value={tAmbient}
          onChange={(e) => setTAmbient(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Power (W)"
          value={power}
          onChange={(e) => setPower(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={calculateResistance}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Thermal Resistance: {result}
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
