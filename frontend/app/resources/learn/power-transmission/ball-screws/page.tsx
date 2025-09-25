import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ball Screws Reference Guide – Selection & Applications",
  description:
    "Comprehensive guide to ball screws, covering selection procedures, accuracy standards, axial clearances, and practical applications in power transmission and industrial automation.",
  keywords: [
    "Ball Screws",
    "Selection Procedure",
    "Axial Clearance",
    "Lead Accuracy",
    "Power Transmission",
    "Industrial Automation",
  ],
  openGraph: {
    title: "Ball Screws Reference Guide",
    description:
      "Explore detailed information on ball screws with selection procedures, tables, and practical insights.",
    type: "article",
    url: "https://yourwebsite.com/resources/learn/power-transmission/ball-screws",
    images: [
      {
        url: "https://yourwebsite.com/images/ball-screws-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ball Screws Reference Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://yourwebsite.com/resources/learn/power-transmission/ball-screws",
  },
};

export default function BallScrewsPage() {
  return (
    <main className="prose lg:prose-lg dark:prose-invert mx-auto max-w-4xl p-6 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Ball Screws Reference Guide
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A detailed reference guide for ball screws, including selection procedures, accuracy standards, and practical applications.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Introduction</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          This page provides a comprehensive guide to ball screws, including selection procedures, accuracy standards, axial clearances, and practical applications in power transmission and industrial automation. Learn how to select and apply ball screws effectively for optimal performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. Ball Screw Selection Procedure</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The selection process and required evaluation items are shown below. This ensures the ball screw meets application needs, including load, speed, and accuracy.
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Determine the application parameters:</strong> Moving mass, feed, motion pattern, screw shaft rotational speed, stroke, mounting orientation (horizontal or vertical), positioning accuracy.
          </li>
          <li>
            <strong>Insert selection of ball screw specifications:</strong> Temporary selection of ball screw lead accuracy grade (C3-C10), shaft diameter, and length.
          </li>
          <li>
            <strong>Evaluation of various safety factors:</strong> Axial load capacity (confirm that applied axial load is within the ball screw's axial load capacity rating).
          </li>
          <li>
            <strong>Allowable Rotational Speed:</strong> Confirm that intended shaft rotational speed is within the ball screw's allowable rotational speed rating.
          </li>
          <li>
            <strong>Life:</strong> Confirm that the ball screw satisfies the life requirement.
          </li>
          <li>
            <strong>Evaluations based on required performance parameters:</strong> Higher positioning accuracy and improved responsiveness needed; parameters need to be evaluated.
            <ul className="mt-2 list-disc pl-6">
              <li>Screw shaft rigidity.</li>
              <li>Effects of temperature variation on life.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Ball Screw Lead Accuracy</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Accuracy is defined by JIS Standards property parameters (e.g., v₀, 300v₂n). Parameters and allowable values are shown below.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Table 1. Positioning Screw (Class) Actual Mean Travel Error (εp) and Variation (μ) Allowances - Unit μm</h4>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Thread Effective Length (L) / mm</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">C3</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">C5</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">C7</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">C10</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Over 0 - 315</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">23</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">52</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">105</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">315 - 400</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">27</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">120</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">400 - 500</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">32</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">70</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">140</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">500 - 630</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">40</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">87</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">175</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">630 - 800</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">18</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">48</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">105</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">210</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">800 - 1000</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">23</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">130</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">260</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1000 - 1250</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">28</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">72</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">155</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">310</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1250 - 1600</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">35</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">90</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">195</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">390</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1600 - 2000</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">43</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">110</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">235</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">470</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Table 2. Positioning Screws (Class) Variation per 300 mm (v₀) Standard Values - Unit μm</h4>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Accuracy Grade</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">v₀</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">6</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C7</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">Table 3. Transfer Screw (Class) Variation per 300 mm</h4>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Accuracy Grade</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">v₀</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C7</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
          *Actual Mean Travel Error (εp) per Transfer Screw (Class) is calculated as εp = 2L + 300v₀.*
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Axial Clearances of Ball Screws</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Axial clearance does not affect positioning accuracy in one direction but will generate backlash and negatively affect positioning accuracy if the motion is bidirectional.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Table 4. Axial Clearances of Rolled Ball Screws</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Types</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prod. Example</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Screw Shaft Dia. (mm)</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Lead (mm)</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Axial Clearance (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Standard Nut</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BSST</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Accuracy Grade C7</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">32</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">32</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.03 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Standard Nut</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BSSZ</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.10 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Accuracy Grade C10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.10 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.10 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.10 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.10 or Less</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Table 5. Axial Clearances of Precision Ball Screws</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Types</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prod. Example</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Screw Shaft Dia. (mm)</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Lead (mm)</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Axial Clearance (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Standard Nut</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BSX</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Accuracy Grade C3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Standard Nut</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">BSS</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Accuracy Grade C5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">32</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.005 or Less</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Selection Example of Lead Accuracy</h2>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Requirements</h3>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>Ball screw diameter: 015, lead 2.</li>
          <li>Stroke length: 300 mm.</li>
          <li>Positioning accuracy = 0.05 mm / 300 mm.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Selection Details</h3>
        <ol className="mt-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
          <li>
            Evaluate the screw thread length.
            <ul className="mt-2 list-disc pl-6">
              <li>Stroke + Nut Length + Margin = 300 + 62 + 60 = 422 mm.</li>
              <li>The margin shown above is an overrun buffer and normally determined as 1.5-2 times the lead screw.</li>
              <li>Thread = 2, lead ends = 60.</li>
            </ul>
          </li>
          <li>
            Lead the accuracy.
            <ul className="mt-2 list-disc pl-6">
              <li>Positioning table is referenced and an Actual Mean Travel Error (εp) for 422 mm ball screw = 0.04 mm (C5).</li>
            </ul>
          </li>
          <li>
            Determining the lead accuracy.
            <ul className="mt-2 list-disc pl-6">
              <li>It can be determined that a C5 grade (=0.04/0.05 = 0.800-1000 mm) ball screw can satisfy the required positioning accuracy of 0.05 mm.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Selection Example of Axial Clearance</h2>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Requirements</h3>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>Ball screw diameter: 015, lead 5.</li>
          <li>Allowable backlash = 0.01 mm.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">Selection Details</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          From Table 5, it can be determined that C5 grade with 0.005 mm or less axial clearance satisfies the allowable backlash amount of 0.01 mm for the 015 group.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">6. Practical Applications</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Ball screws are widely used in CNC machines, robotics, and precision automation systems due to their high efficiency and accuracy in converting rotary motion to linear motion. Proper selection ensures minimal backlash and optimal load capacity for industrial applications.
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Last updated: September 24, 2025 | For more resources, visit our{" "}
          <a href="/resources/learn" className="text-blue-600 hover:underline dark:text-blue-400">
            Learning Center
          </a>.
        </p>
      </footer>
    </main>
  );
}