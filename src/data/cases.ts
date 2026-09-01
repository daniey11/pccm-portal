import type { ClinicalCase } from "../types";

// Case-based reasoning. Each case walks through decision points with feedback.
// Cases stay at the level of standard teaching and defer precise thresholds to
// the linked lessons and protocols.

export const cases: ClinicalCase[] = [
  {
    id: "case-ards",
    domain: "critical-care",
    title: "Worsening hypoxemia after aspiration",
    level: "intermediate",
    presentation:
      "A patient intubated after a witnessed aspiration develops bilateral infiltrates and a P/F ratio of 120 on PEEP of 8. There is no evidence of volume overload or cardiac dysfunction on assessment.",
    steps: [
      {
        prompt: "How would you classify the severity of this ARDS by the Berlin definition?",
        options: ["Mild", "Moderate", "Severe", "Does not meet ARDS criteria"],
        answerIndex: 1,
        explanation:
          "A P/F of 120 with PEEP at least 5, bilateral infiltrates, acute timing, and no cardiac explanation fits moderate ARDS (100-200).",
      },
      {
        prompt: "What is the most important immediate ventilator priority?",
        options: [
          "Increase tidal volume to improve minute ventilation",
          "Set lung-protective tidal volume to predicted body weight and check plateau",
          "Switch to pressure support",
          "Target a normal PaCO2 at any cost",
        ],
        answerIndex: 1,
        explanation:
          "Lung-protective ventilation set to predicted body weight, with attention to plateau and driving pressure, is the foundation. Permissive hypercapnia is usually acceptable.",
      },
      {
        prompt: "The P/F drops to 130 despite optimization. What early adjunct has the best mortality evidence in severe disease?",
        options: ["Routine inhaled nitric oxide", "Early prone positioning", "High-frequency oscillation", "Liberal fluids"],
        answerIndex: 1,
        explanation:
          "Early prone positioning reduced mortality in severe ARDS (PROSEVA). It is used early, not as a last resort.",
      },
    ],
    keyPoints: [
      "Classify ARDS with the Berlin definition and exclude cardiogenic edema.",
      "Lung-protective ventilation first; prone early in severe disease.",
    ],
    commonMistakes: [
      "Dosing tidal volume to actual weight.",
      "Delaying proning until rescue is the only option.",
    ],
    source: "supplemental",
    refIds: ["berlin-2012", "arma-2000", "proseva-2013"],
  },
  {
    id: "case-shock",
    domain: "critical-care",
    title: "Undifferentiated hypotension",
    level: "intermediate",
    presentation:
      "A patient presents with hypotension and a rising lactate. Bedside ultrasound shows a hyperdynamic, underfilled left ventricle with a small, collapsing inferior vena cava.",
    steps: [
      {
        prompt: "Which shock categories best fit this ultrasound picture?",
        options: [
          "Cardiogenic or obstructive",
          "Distributive or hypovolemic",
          "Only cardiogenic",
          "Only obstructive",
        ],
        answerIndex: 1,
        explanation:
          "A hyperdynamic, underfilled heart with a collapsing IVC fits distributive or hypovolemic shock rather than a failing pump.",
      },
      {
        prompt: "The patient is febrile with a suspected infection source. What is the initial priority?",
        options: [
          "Start an inotrope for the pump",
          "Address the source and support perfusion (fluids as appropriate, vasopressors)",
          "Drain the pericardium",
          "Transfuse for presumed hemorrhage",
        ],
        answerIndex: 1,
        explanation:
          "The picture fits distributive (septic) shock. Source control plus perfusion support is the priority. Inotropes and pericardial drainage do not fit this profile.",
      },
    ],
    keyPoints: [
      "Ultrasound quickly narrows the shock differential.",
      "Match the intervention to the hemodynamic profile.",
    ],
    commonMistakes: ["Reaching for an inotrope in a hyperdynamic, vasodilated patient."],
    source: "supplemental",
    refIds: ["vincent-shock-2013"],
  },
  {
    id: "case-nodule",
    domain: "pulmonary",
    title: "Incidental nodule on a trauma CT",
    level: "beginner",
    presentation:
      "A 58-year-old former smoker has an incidentally noted solid pulmonary nodule on a CT obtained for trauma. They have no known cancer and are not immunocompromised.",
    steps: [
      {
        prompt: "Which management framework applies here?",
        options: ["Lung-RADS", "Fleischner Society incidental nodule guidance", "No follow-up is ever needed", "Immediate resection"],
        answerIndex: 1,
        explanation:
          "This is an incidental nodule in an adult over 35 without known cancer or immunocompromise, so the Fleischner framework applies. Lung-RADS is for screening.",
      },
      {
        prompt: "What are the key inputs that will determine follow-up?",
        options: [
          "Only the patient's age",
          "Size, density (solid vs subsolid), number, and risk factors",
          "Only smoking history",
          "Only the reason for the scan",
        ],
        answerIndex: 1,
        explanation:
          "Size, density, number, and risk together drive the recommendation. Precise intervals come from the current Fleischner table.",
      },
    ],
    keyPoints: [
      "Confirm the setting (incidental vs screening) before choosing a framework.",
      "Read exact thresholds from the current guideline.",
    ],
    commonMistakes: ["Applying screening rules to an incidental nodule."],
    source: "supplemental",
    refIds: ["fleischner-2017"],
  },
  {
    id: "case-tx-decline",
    domain: "transplant",
    title: "Late FEV1 decline after lung transplant",
    level: "advanced",
    presentation:
      "Two years after bilateral lung transplant, a patient has a sustained fall in FEV1. There is no acute infection, and reversible causes are being worked up.",
    steps: [
      {
        prompt: "What is the first step before attributing this to CLAD?",
        options: [
          "Assume CLAD and change immunosuppression",
          "Confirm the decline is sustained and exclude reversible causes (infection, acute rejection, airway problems, reflux)",
          "List for re-transplant",
          "Stop all immunosuppression",
        ],
        answerIndex: 1,
        explanation:
          "CLAD is a diagnosis of a sustained, unexplained decline. Reversible causes must be excluded first.",
      },
      {
        prompt: "Spirometry shows obstruction; lung volumes are preserved and imaging shows no persistent opacities. Which phenotype fits?",
        options: ["RAS", "BOS", "Neither is possible", "Acute cellular rejection by definition"],
        answerIndex: 1,
        explanation:
          "An obstructive decline without restriction or persistent opacities fits bronchiolitis obliterans syndrome (BOS). RAS would show restriction and opacities.",
      },
    ],
    keyPoints: [
      "Exclude reversible causes before diagnosing CLAD.",
      "Use physiology plus imaging to separate BOS from RAS.",
    ],
    commonMistakes: ["Labeling any late decline as chronic rejection without a workup."],
    source: "supplemental",
    refIds: ["ishlt-clad-2019"],
  },
];
