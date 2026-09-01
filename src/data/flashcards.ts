import type { Flashcard } from "../types";

// Cards are grouped by topic (matching lesson flashcardTopic values). Kept as
// clean front/back recall prompts drawn from the seeded lessons.

export const flashcards: Flashcard[] = [
  // Gas exchange
  { id: "fc-gas-1", domain: "foundations", topic: "Gas exchange", source: "supplemental", front: "Which hypoxemia mechanism does NOT correct with supplemental oxygen?", back: "Shunt. Blood bypasses ventilated alveoli, so oxygen alone does not fix it." },
  { id: "fc-gas-2", domain: "foundations", topic: "Gas exchange", source: "supplemental", front: "Normal A-a gradient plus high PaCO2 suggests which mechanism?", back: "Hypoventilation." },
  { id: "fc-gas-3", domain: "foundations", topic: "Gas exchange", source: "supplemental", front: "Most common cause of hypoxemia in lung disease?", back: "V/Q mismatch. It usually improves with oxygen." },

  // Oxygen delivery
  { id: "fc-do2-1", domain: "foundations", topic: "Oxygen delivery", source: "supplemental", front: "Oxygen delivery (DO2) equals what, in words?", back: "Cardiac output times arterial oxygen content." },
  { id: "fc-do2-2", domain: "foundations", topic: "Oxygen delivery", source: "supplemental", front: "What dominates arterial oxygen content?", back: "Hemoglobin and its saturation. Dissolved oxygen (PaO2) is a minor term." },
  { id: "fc-do2-3", domain: "foundations", topic: "Oxygen delivery", source: "supplemental", front: "A falling central/mixed venous oxygen saturation suggests what?", back: "Rising extraction and a delivery-consumption mismatch." },

  // ARDS
  { id: "fc-ards-1", domain: "critical-care", topic: "ARDS", source: "supplemental", front: "Berlin severity cutoffs by P/F ratio (PEEP >= 5)?", back: "Mild 200-300, moderate 100-200, severe <= 100.", refIds: ["berlin-2012"] },
  { id: "fc-ards-2", domain: "critical-care", topic: "ARDS", source: "supplemental", front: "Tidal volume is dosed to which weight in lung-protective ventilation?", back: "Predicted body weight (from height and sex).", refIds: ["arma-2000"] },
  { id: "fc-ards-3", domain: "critical-care", topic: "ARDS", source: "supplemental", front: "Which severe-ARDS intervention reduced mortality when applied early?", back: "Prone positioning (PROSEVA, P/F < 150).", refIds: ["proseva-2013"] },
  { id: "fc-ards-4", domain: "critical-care", topic: "ARDS", source: "supplemental", front: "Which ventilation variable tracked survival best across ARDS trials?", back: "Driving pressure (plateau minus PEEP).", refIds: ["amato-2015"] },

  // Shock
  { id: "fc-shock-1", domain: "critical-care", topic: "Shock", source: "supplemental", front: "Distributive shock hemodynamic profile?", back: "Low systemic vascular resistance, high or normal cardiac output." },
  { id: "fc-shock-2", domain: "critical-care", topic: "Shock", source: "supplemental", front: "Cardiogenic shock hemodynamic profile?", back: "Low output, high resistance, high preload." },
  { id: "fc-shock-3", domain: "critical-care", topic: "Shock", source: "supplemental", front: "Two examples of obstructive shock?", back: "Cardiac tamponade and massive pulmonary embolism." },

  // Mechanical ventilation
  { id: "fc-vent-1", domain: "critical-care", topic: "Mechanical ventilation", source: "supplemental", front: "High peak with normal plateau means what?", back: "A resistance problem (secretions, bronchospasm, kinked/bitten tube)." },
  { id: "fc-vent-2", domain: "critical-care", topic: "Mechanical ventilation", source: "supplemental", front: "How do you measure plateau pressure?", back: "Inspiratory hold." },
  { id: "fc-vent-3", domain: "critical-care", topic: "Mechanical ventilation", source: "supplemental", front: "How do you detect auto-PEEP?", back: "Expiratory hold." },

  // Pulmonary nodules
  { id: "fc-nod-1", domain: "pulmonary", topic: "Pulmonary nodules", source: "supplemental", front: "Which framework applies to incidental nodules (not screening)?", back: "Fleischner Society guidance. Screening uses Lung-RADS.", refIds: ["fleischner-2017"] },
  { id: "fc-nod-2", domain: "pulmonary", topic: "Pulmonary nodules", source: "supplemental", front: "Why are subsolid nodules followed longer?", back: "They can be indolent adenocarcinoma-spectrum lesions that persist.", refIds: ["fleischner-2017"] },

  // COPD
  { id: "fc-copd-1", domain: "pulmonary", topic: "COPD", source: "supplemental", front: "Spirometric criterion confirming COPD?", back: "Post-bronchodilator FEV1/FVC < 0.70 in the right context.", refIds: ["gold"] },
  { id: "fc-copd-2", domain: "pulmonary", topic: "COPD", source: "supplemental", front: "Strongest single driver of COPD therapy escalation?", back: "Exacerbation history.", refIds: ["gold"] },

  // PFTs
  { id: "fc-pft-1", domain: "pulmonary", topic: "PFT interpretation", source: "supplemental", front: "What confirms restriction?", back: "A reduced total lung capacity on lung volume testing.", refIds: ["pft-2022"] },
  { id: "fc-pft-2", domain: "pulmonary", topic: "PFT interpretation", source: "supplemental", front: "Obstruction with low DLCO fits which diagnosis?", back: "Emphysema. Asthma/chronic bronchitis usually preserve DLCO.", refIds: ["pft-2022"] },

  // Airway anatomy
  { id: "fc-anat-1", domain: "bronchoscopy", topic: "Airway anatomy", source: "supplemental", front: "What continues past the right upper lobe takeoff?", back: "The bronchus intermedius, to the middle and lower lobes." },
  { id: "fc-anat-2", domain: "bronchoscopy", topic: "Airway anatomy", source: "supplemental", front: "The lingula belongs to which lobe?", back: "The left upper lobe." },

  // Systematic exam
  { id: "fc-exam-1", domain: "bronchoscopy", topic: "Systematic exam", source: "supplemental", front: "Why sample the target segment last?", back: "So bleeding/secretions do not spoil the survey of the rest of the airway.", refIds: ["bts-bronch-2013"] },

  // BAL
  { id: "fc-bal-1", domain: "bronchoscopy", topic: "BAL", source: "supplemental", front: "How is the BAL differential interpreted?", back: "As a pattern, read with imaging and clinical context, not alone.", refIds: ["ats-bal-2012"] },

  // EBUS
  { id: "fc-ebus-1", domain: "bronchoscopy", topic: "EBUS", source: "supplemental", front: "Why sample nodes in sequence during EBUS staging?", back: "To avoid upstaging error from cross-contamination between stations." },

  // Transplant
  { id: "fc-tx-1", domain: "transplant", topic: "Transplant candidacy", source: "supplemental", front: "Referral vs listing: what is the point of early referral?", back: "Time to evaluate, optimize, and discuss before a crisis. Listing comes later.", refIds: ["ishlt-selection-2021"] },
  { id: "fc-tx-2", domain: "transplant", topic: "PGD", source: "supplemental", front: "Two inputs to ISHLT PGD grading?", back: "P/F ratio and radiographic pulmonary edema in the allograft (first 72h).", refIds: ["ishlt-pgd-2016"] },
  { id: "fc-tx-3", domain: "transplant", topic: "CLAD", source: "supplemental", front: "BOS vs RAS?", back: "BOS = obstructive (FEV1 decline). RAS = restrictive (TLC loss, opacities), worse prognosis.", refIds: ["ishlt-clad-2019"] },
  { id: "fc-tx-4", domain: "transplant", topic: "Immunosuppression", source: "supplemental", front: "Typical three-drug maintenance backbone?", back: "Calcineurin inhibitor + antimetabolite + corticosteroid." },
  { id: "fc-tx-5", domain: "transplant", topic: "Immunosuppression", source: "supplemental", front: "Why check interactions with calcineurin inhibitors?", back: "They are metabolized via CYP3A; inhibitors/inducers shift levels dangerously." },
  { id: "fc-tx-6", domain: "transplant", topic: "Rejection & surveillance", source: "supplemental", front: "What does the ISHLT A grade describe?", back: "Acute cellular rejection: perivascular mononuclear infiltrates. B grade = airway.", refIds: ["ishlt-rejection-2007"] },
];
