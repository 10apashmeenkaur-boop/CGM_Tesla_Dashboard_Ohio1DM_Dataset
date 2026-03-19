CGM TELEMETRY SYSTEM
Continuous Glucose Monitoring Visualization & Insulin Optimization
Core Project Objective
The primary objective  of this system is Precision Glycemic Control. By analyzing real-time Continuous Glucose Monitor (CGM) telemetry, the project aims to:
Identify Hyperglycemic Trends: Detect glucose spikes before they reach critical thresholds.
Optimize Insulin Titration: Determine precise insulin dosages required to mitigate spikes and return the user to the "Stability Zone" (3.9 - 10.0 mmol/L).
Predictive Stabilization: Utilize historical data to forecast future glucose movement, allowing for proactive rather than reactive treatment.


   Standard Datasets,Sensors and Research Data for Insights
-To ensure clinical relevance, this dashboard utilizes the OhioT1DM Dataset (Ohio University Type 1 Diabetes Mellitus Dataset).
 * Real-World Conditions: The interface parses complex data including basal rates, fingerstick calibrations, and carb inputs from actual T1DM patients.
 * Advanced Visualization: The Telemetry Matrix Flux (Graph) displays the raw OhioT1DM sensor data alongside a custom-calculated Predictive Glucose trace to show how the system interprets patient conditions.
 * Actionable Insights: Beyond raw numbers, the system calculates Time In Stability and Estimated Averages to provide a 360-degree view of the patient's metabolic state.

   
 Key UI Features
 * Glory Blue Interface: High-intensity 3px borders with a neon blue "wake up" glow on hover for every metric card.
 * Telemetry Matrix Flux: A massive 65% height-weighted charting area with a 50px precision grid.
 * Zero-Cursive Typography: Heavy-weight (1000) non-italicized fonts for maximum industrial-grade readability.

Tech Stack & Dependencies
 * React.js (Vite),Tailwind CSS,Lucide React,JavaScript,PapaParse,Recharts,Node.js         |

> Medical Disclaimer: This software is a data visualization tool built for research and simulation using the OhioT1DM dataset. It is NOT a medical device and should NOT be used to determine actual insulin dosages for patients.
