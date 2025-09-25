import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLC Basics",
  description: "Introduction to programmable logic controllers and ladder logic.",
  keywords: [
    "PLC",
    "Programmable Logic Controllers",
    "Ladder Logic",
    "Industrial Automation",
    "PLC Basics",
  ],
  openGraph: {
    title: "PLC Basics",
    description: "Learn about programmable logic controllers and ladder logic in industrial automation.",
    type: "article",
    url: "https://yourwebsite.com/resources/learn/industrial-automation/plc-basics",
    images: [
      {
        url: "https://yourwebsite.com/images/plc-basics-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PLC Basics Reference Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://yourwebsite.com/resources/learn/industrial-automation/plc-basics",
  },
};

export default function PLCBasicsPage() {
  return (
    <main className="prose lg:prose-lg dark:prose-invert mx-auto max-w-4xl p-6 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          PLC Basics
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A comprehensive guide to programmable logic controllers (PLCs) and ladder logic in industrial automation.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Introduction</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          A Programmable Logic Controller (PLC) is a ruggedized computer used for industrial automation to control machinery and processes. This guide introduces PLCs, their components, and the ladder logic programming language.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. PLC Components</h2>
        <ul className="mt-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>CPU (Central Processing Unit)</strong> - The brain of the PLC, executing the control program.
          </li>
          <li>
            <strong>Input/Output Modules</strong> - Interfaces for connecting sensors and actuators.
          </li>
          <li>
            <strong>Power Supply</strong> - Provides the necessary voltage for PLC operation.
          </li>
          <li>
            <strong>Memory</strong> - Stores the program and data for processing.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Ladder Logic Basics</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Ladder logic is a graphical programming language resembling electrical relay diagrams, widely used for PLC programming.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Rungs</strong> - Horizontal lines representing control circuits.
          </li>
          <li>
            <strong>Contacts</strong> - Represent input conditions (e.g., normally open or closed).
          </li>
          <li>
            <strong>Coils</strong> - Represent output actions or memory bits.
          </li>
        </ul>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Example: A simple rung might use a start button (contact) to energize a motor (coil).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Programming Example</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Element</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Start Button</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Normally open contact</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initiates the circuit</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Stop Button</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Normally closed contact</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Stops the circuit</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Motor Coil</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Output coil</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Activates the motor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Practical Applications</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          PLCs are used in manufacturing, assembly lines, and process control to automate tasks, improve efficiency, and ensure safety. Ladder logic simplifies programming for technicians familiar with electrical schematics.
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Last updated: September 25, 2025 | For more resources, visit our{" "}
          <a href="/resources/learn" className="text-blue-600 hover:underline dark:text-blue-400">
            Learning Center
          </a>.
        </p>
      </footer>
    </main>
  );
}