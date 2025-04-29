import { useState } from "react";

export default function FrequencyCalculator() {
  const [timePeriod, setTimePeriod] = useState<number | "">("");
  const [wavelength, setWavelength] = useState<number | "">("");
  const [frequency, setFrequency] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFrequency = () => {
    try {
      if (timePeriod === "" && wavelength === "") {
        throw new Error("Please enter either time period or wavelength.");
      }

      if (timePeriod !== "") {
        const freqFromTime = 1 / timePeriod;
        setFrequency(`${freqFromTime.toFixed(2)} Hz`);
      } else if (wavelength !== "") {
        const speedOfLight = 3e8; // Speed of light in meters per second
        const freqFromWavelength = speedOfLight / wavelength;
        setFrequency(`${freqFromWavelength.toFixed(2)} Hz`);
      }

      setError(null);
    } catch (err: any) {
      setFrequency(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder="Time Period (T) in seconds"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Wavelength (λ) in meters"
          value={wavelength}
          onChange={(e) => setWavelength(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={calculateFrequency}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {frequency && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          Frequency: {frequency}
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
