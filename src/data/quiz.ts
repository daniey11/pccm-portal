import type { QuizQuestion } from "../types";

// Questions map to quizTopicId values on the seeded lessons. Each has an
// explanation and, where useful, a Learn-mode hint. Answers reflect standard
// teaching; explanations point to the governing evidence.

export const quiz: QuizQuestion[] = [
  // ---- Gas exchange / foundations ----
  {
    id: "q-gas-1",
    domain: "foundations",
    topicId: "qt-gas-exchange",
    level: "beginner",
    stem: "A hypoxemic patient does not improve their PaO2 despite a high FiO2. Which mechanism is most likely?",
    options: ["Hypoventilation", "Shunt", "Low inspired PO2", "V/Q mismatch"],
    answerIndex: 1,
    explanation:
      "Shunt is the mechanism that resists correction with supplemental oxygen because blood bypasses ventilated alveoli. The other listed mechanisms generally improve with oxygen.",
    hint: "Which one keeps the saturation low even at near-100% FiO2?",
    source: "supplemental",
  },
  {
    id: "q-gas-2",
    domain: "foundations",
    topicId: "qt-gas-exchange",
    level: "beginner",
    stem: "A patient has hypoxemia with a normal A-a gradient and a high PaCO2. What is the most likely mechanism?",
    options: ["Diffusion limitation", "Shunt", "Hypoventilation", "V/Q mismatch"],
    answerIndex: 2,
    explanation:
      "A normal A-a gradient with a high PaCO2 points to hypoventilation. The lung's gas exchange units are working; the problem is inadequate minute ventilation.",
    hint: "A normal A-a gradient narrows it to two mechanisms.",
    source: "supplemental",
  },
  {
    id: "q-gas-3",
    domain: "foundations",
    topicId: "qt-gas-exchange",
    level: "intermediate",
    stem: "Why does raising oxygen saturation from 90% to 98% add relatively little to oxygen content?",
    options: [
      "Because dissolved oxygen dominates content",
      "Because saturation is near the flat top of the oxyhemoglobin curve",
      "Because cardiac output falls as saturation rises",
      "Because hemoglobin drops with higher saturation",
    ],
    answerIndex: 1,
    explanation:
      "Above roughly 90% saturation, the oxyhemoglobin dissociation curve is nearly flat, so additional PaO2 adds little bound oxygen. Content is dominated by hemoglobin and saturation, not dissolved oxygen.",
    source: "supplemental",
  },

  // ---- ARDS ----
  {
    id: "q-ards-1",
    domain: "critical-care",
    topicId: "qt-ards",
    level: "intermediate",
    stem: "Which finding is required by the Berlin definition of ARDS?",
    options: [
      "A pulmonary artery wedge pressure above a set threshold",
      "Bilateral opacities not fully explained by effusion, collapse, or nodules",
      "A positive respiratory viral panel",
      "An ejection fraction below 40%",
    ],
    answerIndex: 1,
    explanation:
      "The Berlin definition requires bilateral opacities not fully explained by effusions, collapse, or nodules, along with timing within one week, respiratory failure not fully explained by cardiac failure or overload, and an oxygenation threshold.",
    hint: "The definition does not require a wedge pressure or an echo number.",
    source: "supplemental",
    refIds: ["berlin-2012"],
  },
  {
    id: "q-ards-2",
    domain: "critical-care",
    topicId: "qt-ards",
    level: "intermediate",
    stem: "Tidal volume in ARDSNet-style lung-protective ventilation is set to which weight?",
    options: ["Actual body weight", "Ideal body weight by BMI", "Predicted body weight from height and sex", "Adjusted body weight"],
    answerIndex: 2,
    explanation:
      "Predicted body weight is calculated from height and sex. Dosing to actual weight overshoots the protective target, especially in heavier patients.",
    hint: "It depends on how tall the patient is, not what they weigh.",
    source: "supplemental",
    refIds: ["arma-2000"],
  },
  {
    id: "q-ards-3",
    domain: "critical-care",
    topicId: "qt-ards",
    level: "advanced",
    stem: "In severe ARDS with a P/F below 150, which intervention reduced mortality in a landmark trial?",
    options: ["Routine high-frequency oscillation", "Early prolonged prone positioning", "Liberal fluid strategy", "Routine pulmonary artery catheter"],
    answerIndex: 1,
    explanation:
      "PROSEVA showed that early, prolonged prone positioning reduced mortality in severe ARDS. Prone early rather than as a last resort.",
    source: "supplemental",
    refIds: ["proseva-2013"],
  },
  {
    id: "q-ards-4",
    domain: "critical-care",
    topicId: "qt-ards",
    level: "advanced",
    stem: "Which ventilation variable was most strongly associated with survival across ARDS trials in the Amato analysis?",
    options: ["Peak pressure", "Respiratory rate", "Driving pressure", "Minute ventilation"],
    answerIndex: 2,
    explanation:
      "Driving pressure (plateau minus PEEP) was the variable most strongly associated with survival, making it a useful bedside target.",
    source: "supplemental",
    refIds: ["amato-2015"],
  },

  // ---- Shock ----
  {
    id: "q-shock-1",
    domain: "critical-care",
    topicId: "qt-shock",
    level: "intermediate",
    stem: "Which hemodynamic profile fits early septic (distributive) shock?",
    options: [
      "High systemic vascular resistance, low output",
      "Low systemic vascular resistance, high or normal output",
      "High preload, low output, high resistance",
      "Low preload, low output, low resistance",
    ],
    answerIndex: 1,
    explanation:
      "Distributive shock is characterized by low systemic vascular resistance with a high or normal cardiac output. Cardiogenic shock, by contrast, shows low output with high resistance.",
    hint: "Vasodilation is the hallmark.",
    source: "supplemental",
    refIds: ["vincent-shock-2013"],
  },
  {
    id: "q-shock-2",
    domain: "critical-care",
    topicId: "qt-shock",
    level: "intermediate",
    stem: "A hypotensive patient has a dilated, poorly contracting heart on bedside ultrasound. Which shock category is most likely?",
    options: ["Distributive", "Hypovolemic", "Cardiogenic", "Obstructive"],
    answerIndex: 2,
    explanation:
      "A dilated, poorly contracting heart points to cardiogenic shock. Large fluid boluses can worsen this, so support the pump and treat the cause.",
    source: "supplemental",
  },
  {
    id: "q-shock-3",
    domain: "critical-care",
    topicId: "qt-shock",
    level: "advanced",
    stem: "Which is an example of obstructive shock?",
    options: ["Anaphylaxis", "Cardiac tamponade", "Hemorrhage", "Neurogenic shock"],
    answerIndex: 1,
    explanation:
      "Cardiac tamponade is obstructive shock: a mechanical block to filling or output. Relief of the obstruction, such as pericardial drainage, is the treatment.",
    source: "supplemental",
  },

  // ---- Mechanical ventilation ----
  {
    id: "q-vent-1",
    domain: "critical-care",
    topicId: "qt-mech-vent",
    level: "beginner",
    stem: "A ventilated patient has a high peak pressure but a normal plateau pressure. What does this suggest?",
    options: ["Stiff lungs", "A resistance problem such as secretions or bronchospasm", "Overdistension", "Pneumothorax"],
    answerIndex: 1,
    explanation:
      "A high peak with a normal plateau points to increased airway resistance (secretions, bronchospasm, a kinked or bitten tube). A high plateau would indicate a compliance problem.",
    hint: "Plateau reflects the alveoli; peak adds resistance.",
    source: "supplemental",
  },
  {
    id: "q-vent-2",
    domain: "critical-care",
    topicId: "qt-mech-vent",
    level: "beginner",
    stem: "Which maneuver is used to detect auto-PEEP?",
    options: ["Inspiratory hold", "Expiratory hold", "Increasing FiO2", "Decreasing PEEP to zero"],
    answerIndex: 1,
    explanation:
      "An expiratory hold reveals auto-PEEP from incomplete exhalation (breath stacking), which is common in obstruction. An inspiratory hold is used to measure plateau pressure.",
    source: "supplemental",
  },
  {
    id: "q-vent-3",
    domain: "critical-care",
    topicId: "qt-mech-vent",
    level: "intermediate",
    stem: "Which pressure best reflects the strain each breath places on the lung?",
    options: ["Peak pressure", "Mean airway pressure", "Driving pressure", "PEEP"],
    answerIndex: 2,
    explanation:
      "Driving pressure (plateau minus PEEP) reflects the strain per breath and is a useful bedside safety target.",
    source: "supplemental",
    refIds: ["amato-2015"],
  },

  // ---- Pulmonary nodules ----
  {
    id: "q-nodule-1",
    domain: "pulmonary",
    topicId: "qt-nodules",
    level: "intermediate",
    stem: "The Fleischner Society recommendations for incidental nodules do NOT apply to which group?",
    options: [
      "A 55-year-old with an incidentally found solid nodule",
      "A lung cancer screening population",
      "A 40-year-old with an incidental subsolid nodule",
      "A 60-year-old former smoker with an incidental nodule",
    ],
    answerIndex: 1,
    explanation:
      "Fleischner guidance is for incidentally detected nodules in adults roughly 35 and older. Screening populations use Lung-RADS, and patients with known cancer or immunocompromise are handled differently.",
    hint: "One of these uses a different framework named Lung-RADS.",
    source: "supplemental",
    refIds: ["fleischner-2017"],
  },
  {
    id: "q-nodule-2",
    domain: "pulmonary",
    topicId: "qt-nodules",
    level: "intermediate",
    stem: "Why are subsolid nodules followed over a longer time horizon than solid nodules?",
    options: [
      "They are always benign",
      "They can represent indolent adenocarcinoma-spectrum lesions that persist",
      "They cannot be measured accurately",
      "They never require sampling",
    ],
    answerIndex: 1,
    explanation:
      "Subsolid nodules can reflect indolent lesions along the adenocarcinoma spectrum, which may persist and evolve slowly, so a longer follow-up horizon is used.",
    source: "supplemental",
    refIds: ["fleischner-2017"],
  },

  // ---- COPD ----
  {
    id: "q-copd-1",
    domain: "pulmonary",
    topicId: "qt-copd",
    level: "beginner",
    stem: "Which spirometric finding confirms persistent airflow limitation in COPD?",
    options: [
      "A post-bronchodilator FEV1/FVC below 0.70",
      "A pre-bronchodilator FEV1 below 80% predicted",
      "A reduced total lung capacity",
      "A reduced DLCO",
    ],
    answerIndex: 0,
    explanation:
      "A post-bronchodilator FEV1/FVC below 0.70 establishes persistent airflow limitation in the right clinical context. The other findings do not define COPD.",
    hint: "It has to be measured after a bronchodilator.",
    source: "supplemental",
    refIds: ["gold"],
  },
  {
    id: "q-copd-2",
    domain: "pulmonary",
    topicId: "qt-copd",
    level: "intermediate",
    stem: "In the GOLD framework, which factor most drives escalation of therapy?",
    options: ["The FEV1 grade alone", "Exacerbation history", "Age", "Smoking pack-years"],
    answerIndex: 1,
    explanation:
      "Therapy is driven mainly by the symptom-and-exacerbation group, and exacerbation history is the strongest single driver of escalation, more than the FEV1 grade in isolation.",
    source: "supplemental",
    refIds: ["gold"],
  },

  // ---- PFTs ----
  {
    id: "q-pft-1",
    domain: "pulmonary",
    topicId: "qt-pft",
    level: "intermediate",
    stem: "What is required to confirm a restrictive ventilatory defect?",
    options: [
      "A reduced FEV1/FVC ratio",
      "A reduced total lung capacity on lung volume testing",
      "A reduced DLCO alone",
      "A positive bronchodilator response",
    ],
    answerIndex: 1,
    explanation:
      "Restriction is confirmed by a reduced total lung capacity. Spirometry alone can suggest it (low FVC with preserved ratio) but cannot confirm it, since air trapping in obstruction can also lower FVC.",
    hint: "Spirometry suggests, lung volumes confirm.",
    source: "supplemental",
    refIds: ["pft-2022"],
  },
  {
    id: "q-pft-2",
    domain: "pulmonary",
    topicId: "qt-pft",
    level: "advanced",
    stem: "Obstruction with a reduced DLCO fits best with which diagnosis?",
    options: ["Asthma", "Chronic bronchitis", "Emphysema", "Vocal cord dysfunction"],
    answerIndex: 2,
    explanation:
      "Emphysema shows obstruction with a low DLCO from loss of alveolar-capillary surface. Asthma and chronic bronchitis typically show obstruction with a preserved DLCO.",
    source: "supplemental",
    refIds: ["pft-2022"],
  },

  // ---- Airway anatomy ----
  {
    id: "q-anat-1",
    domain: "bronchoscopy",
    topicId: "qt-airway-anatomy",
    level: "beginner",
    stem: "After the right upper lobe takeoff, the airway continuing toward the middle and lower lobes is called the:",
    options: ["Lingular bronchus", "Bronchus intermedius", "Left main bronchus", "Trachea"],
    answerIndex: 1,
    explanation:
      "On the right, after the upper lobe branches off, the bronchus intermedius continues to the middle and lower lobes.",
    hint: "It sits between the upper lobe takeoff and the lower branches.",
    source: "supplemental",
  },
  {
    id: "q-anat-2",
    domain: "bronchoscopy",
    topicId: "qt-airway-anatomy",
    level: "beginner",
    stem: "The lingula is part of which lobe?",
    options: ["Right upper lobe", "Right middle lobe", "Left upper lobe", "Left lower lobe"],
    answerIndex: 2,
    explanation:
      "The lingula is the inferior portion of the left upper lobe, roughly analogous in position to the right middle lobe.",
    source: "supplemental",
  },

  // ---- Systematic exam ----
  {
    id: "q-exam-1",
    domain: "bronchoscopy",
    topicId: "qt-systematic-exam",
    level: "beginner",
    stem: "Why is the target segment usually sampled last during a systematic exam?",
    options: [
      "To save time",
      "So bleeding or secretions from sampling do not spoil the survey of the rest of the airway",
      "Because it is required for billing",
      "Because the target is always in the left lung",
    ],
    answerIndex: 1,
    explanation:
      "Inspecting first and sampling the target last keeps blood and secretions from obscuring the rest of the survey, so nothing is missed.",
    source: "supplemental",
    refIds: ["bts-bronch-2013"],
  },

  // ---- BAL ----
  {
    id: "q-bal-1",
    domain: "bronchoscopy",
    topicId: "qt-bal",
    level: "intermediate",
    stem: "How should a BAL cell differential be interpreted?",
    options: [
      "As a stand-alone diagnosis",
      "As a pattern read alongside imaging and clinical context",
      "Only if recovery is under 10%",
      "Only in transplant patients",
    ],
    answerIndex: 1,
    explanation:
      "The differential is a pattern tool. Lymphocyte, neutrophil, or eosinophil predominance points in different directions and must be read with the imaging and history, as the ATS guidance emphasizes.",
    source: "supplemental",
    refIds: ["ats-bal-2012"],
  },

  // ---- EBUS ----
  {
    id: "q-ebus-1",
    domain: "bronchoscopy",
    topicId: "qt-ebus",
    level: "advanced",
    stem: "During EBUS staging for lung cancer, why is nodal sampling done in a systematic sequence?",
    options: [
      "To reduce procedure time",
      "To avoid upstaging error from cross-contamination between stations",
      "Because only one station can be sampled per procedure",
      "To avoid using ultrasound",
    ],
    answerIndex: 1,
    explanation:
      "Sampling higher-stage and contralateral stations before ipsilateral lower ones, with clean passes between stations, protects the accuracy of the reported stage.",
    source: "supplemental",
  },

  // ---- Transplant: selection ----
  {
    id: "q-tx-sel-1",
    domain: "transplant",
    topicId: "qt-tx-selection",
    level: "beginner",
    stem: "Why does the ISHLT consensus emphasize early referral for transplant evaluation?",
    options: [
      "To list every referred patient immediately",
      "To allow time for evaluation, optimization, and discussion before a crisis",
      "Because listing must occur at referral",
      "To avoid the need for a multidisciplinary evaluation",
    ],
    answerIndex: 1,
    explanation:
      "Referral and listing are separate. Early referral creates time to evaluate, optimize modifiable factors, and have candid discussions before the patient is too sick.",
    hint: "Referral is not the same as listing.",
    source: "supplemental",
    refIds: ["ishlt-selection-2021"],
  },

  // ---- Transplant: PGD ----
  {
    id: "q-tx-pgd-1",
    domain: "transplant",
    topicId: "qt-tx-pgd",
    level: "intermediate",
    stem: "ISHLT primary graft dysfunction grading is based on which two inputs?",
    options: [
      "White count and temperature",
      "Oxygenation (P/F ratio) and radiographic pulmonary edema in the allograft",
      "Spirometry and DLCO",
      "Donor age and ischemic time",
    ],
    answerIndex: 1,
    explanation:
      "PGD grading combines the PaO2/FiO2 ratio with the presence of radiographic pulmonary edema in the allograft, assessed at defined time points in the first 72 hours.",
    source: "supplemental",
    refIds: ["ishlt-pgd-2016"],
  },
  {
    id: "q-tx-pgd-2",
    domain: "transplant",
    topicId: "qt-tx-pgd",
    level: "advanced",
    stem: "Severe early PGD is associated with which longer-term outcome?",
    options: ["Lower risk of CLAD", "Higher risk of chronic lung allograft dysfunction", "No effect on long-term outcomes", "Guaranteed graft loss"],
    answerIndex: 1,
    explanation:
      "Severe early PGD is linked to a higher risk of later chronic lung allograft dysfunction, connecting the immediate ICU course to long-term graft health.",
    source: "supplemental",
    refIds: ["ishlt-pgd-2016"],
  },

  // ---- Transplant: CLAD ----
  {
    id: "q-tx-clad-1",
    domain: "transplant",
    topicId: "qt-tx-clad",
    level: "advanced",
    stem: "Which statement best contrasts the two main CLAD phenotypes?",
    options: [
      "BOS is restrictive with opacities; RAS is obstructive without opacities",
      "BOS is obstructive; RAS is restrictive with loss of total lung capacity and often opacities",
      "Both are purely obstructive",
      "Both are defined only by imaging",
    ],
    answerIndex: 1,
    explanation:
      "BOS is an obstructive phenotype (sustained FEV1 decline, typically without persistent restriction or opacities), while RAS is restrictive with loss of total lung capacity and often persistent opacities. RAS generally carries a worse prognosis.",
    hint: "One is obstructive, one is restrictive.",
    source: "supplemental",
    refIds: ["ishlt-clad-2019"],
  },

  // ---- Transplant: immunosuppression ----
  {
    id: "q-tx-immuno-1",
    domain: "transplant",
    topicId: "qt-tx-immuno",
    level: "intermediate",
    stem: "Why does starting an azole antifungal in a patient on a calcineurin inhibitor require caution?",
    options: [
      "Azoles have no interaction with these drugs",
      "Azoles inhibit CYP3A metabolism and can raise calcineurin inhibitor levels sharply",
      "Azoles lower the calcineurin inhibitor level to zero",
      "The two cannot be co-administered under any circumstances",
    ],
    answerIndex: 1,
    explanation:
      "Calcineurin inhibitors are metabolized through CYP3A. Azoles inhibit this pathway and can push levels dangerously high, so doses need adjustment and monitoring.",
    source: "supplemental",
  },

  // ---- Transplant: rejection ----
  {
    id: "q-tx-rej-1",
    domain: "transplant",
    topicId: "qt-tx-rejection",
    level: "advanced",
    stem: "In the ISHLT working formulation, acute cellular rejection (the A grade) is based on:",
    options: [
      "Airway inflammation",
      "Perivascular mononuclear infiltrates on transbronchial biopsy",
      "The BAL neutrophil count",
      "Spirometric decline",
    ],
    answerIndex: 1,
    explanation:
      "The A grade reflects perivascular mononuclear infiltrates on biopsy. Airway inflammation is graded separately (the B grade). Adequate biopsy sampling is needed to grade reliably.",
    source: "supplemental",
    refIds: ["ishlt-rejection-2007"],
  },
];
