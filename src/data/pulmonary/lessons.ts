import type { Lesson } from "../../types";

export const pulmonaryLessons: Lesson[] = [
  // -------------------------------------------------- Solitary pulmonary nodule
  {
    id: "pulm-spn",
    moduleId: "mod-pulmonary",
    topicId: "topic-nodules",
    title: "The incidental pulmonary nodule: a structured approach",
    summary:
      "Size, density (solid vs subsolid), and patient risk drive follow-up. The Fleischner Society framework organizes the decision.",
    level: "intermediate",
    domain: "pulmonary",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Describe the inputs that drive nodule management: size, density, number, and risk.",
      "Explain why subsolid nodules are followed differently from solid ones.",
      "State when the Fleischner framework does and does not apply.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["fleischner-2017"],
        body: "Most incidentally found lung nodules are benign, but a structured approach avoids both missed cancers and needless testing. The Fleischner Society guidance sorts incidental nodules by size, by whether they are solid or subsolid, by whether they are single or multiple, and by the patient's risk profile.",
      },
      {
        type: "keypoints",
        heading: "The inputs that matter",
        source: "supplemental",
        refIds: ["fleischner-2017"],
        items: [
          "Size: larger nodules carry more risk and shorter follow-up intervals. Measurement should use mean diameter.",
          "Density: solid, part-solid, and pure ground-glass nodules behave differently. Subsolid nodules can reflect indolent adenocarcinoma spectrum lesions and are followed longer.",
          "Number: solitary versus multiple changes the approach.",
          "Risk: smoking history, age, emphysema or fibrosis, and other factors raise pretest probability.",
        ],
      },
      {
        type: "callout",
        callout: "safety",
        source: "supplemental",
        body: "The Fleischner recommendations apply to incidentally detected nodules in adults roughly 35 and older. They do not apply to lung cancer screening (that uses Lung-RADS), to patients with known cancer, or to immunocompromised patients. Match the tool to the setting.",
      },
      {
        type: "keypoints",
        heading: "How the decision flows",
        source: "supplemental",
        refIds: ["fleischner-2017"],
        items: [
          "Very small low-risk solid nodules generally need no routine follow-up.",
          "Intermediate solid nodules get interval CT to check for growth.",
          "Larger or suspicious nodules move toward CT surveillance, PET, or tissue sampling depending on risk.",
          "Subsolid nodules are followed over a longer horizon because indolent lesions can persist.",
        ],
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["fleischner-2017"],
        variesByInstitution: true,
        body: "The exact millimeter thresholds and follow-up intervals should be read from the current Fleischner Society table rather than memorized loosely, since precise cutoffs matter here. Confirm against the published guideline.",
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Applying Fleischner intervals to a screening population, where Lung-RADS is the right framework.",
          "Treating a persistent subsolid nodule as benign too quickly.",
        ],
      },
    ],
    refIds: ["fleischner-2017"],
    quizTopicId: "qt-nodules",
    flashcardTopic: "Pulmonary nodules",
    keywords: ["nodule", "Fleischner", "subsolid", "ground glass", "Lung-RADS", "screening"],
  },

  // ------------------------------------------------------------------ COPD
  {
    id: "pulm-copd",
    moduleId: "mod-pulmonary",
    topicId: "topic-copd",
    title: "COPD: diagnosis and the GOLD framework",
    summary:
      "A post-bronchodilator obstructive pattern confirms COPD. GOLD then grades airflow and groups patients by symptoms and exacerbations to guide therapy.",
    level: "beginner",
    domain: "pulmonary",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "State the spirometric criterion that defines COPD.",
      "Separate airflow grading from the symptom-and-exacerbation grouping.",
      "Explain why exacerbation history drives escalation decisions.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["gold"],
        body: "COPD is confirmed with spirometry: a post-bronchodilator ratio of FEV1 to FVC below 0.70 establishes persistent airflow limitation in the right clinical setting. GOLD then separates two questions that are easy to conflate: how severe is the airflow limitation, and how is the patient doing in terms of symptoms and exacerbations.",
      },
      {
        type: "keypoints",
        heading: "Two separate axes",
        source: "supplemental",
        refIds: ["gold"],
        items: [
          "Airflow grade (GOLD 1 to 4) comes from the FEV1 percent predicted.",
          "The symptom-and-exacerbation group comes from a symptom score and the exacerbation history over the past year.",
          "Therapy is driven mainly by the group, especially the exacerbation history, not by the FEV1 grade alone.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "A patient with only moderate FEV1 impairment but frequent exacerbations may warrant more intensive therapy than someone with worse spirometry but a stable course. Exacerbation history is the strongest single driver of escalation.",
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["gold"],
        variesByInstitution: true,
        body: "GOLD updates its report and its group definitions periodically. Read the current year's report for the exact grouping labels and the preferred inhaler pathways.",
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "Always confirm airflow limitation with post-bronchodilator spirometry before committing to a COPD diagnosis.",
          "Reserve a fixed 0.70 ratio's limitations in mind: it can over-diagnose in older adults and under-diagnose in the young; correlate clinically.",
        ],
      },
    ],
    refIds: ["gold"],
    quizTopicId: "qt-copd",
    flashcardTopic: "COPD",
    keywords: ["COPD", "GOLD", "spirometry", "FEV1", "exacerbation", "airflow"],
  },

  // ------------------------------------------------------------------ PFTs
  {
    id: "pulm-pft",
    moduleId: "mod-pulmonary",
    topicId: "topic-pft",
    title: "Reading PFTs: obstruction, restriction, and diffusion",
    summary:
      "A stepwise read: start with the flow-volume relationship, confirm lung volumes, then interpret the diffusing capacity in context.",
    level: "intermediate",
    domain: "pulmonary",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Distinguish an obstructive from a restrictive pattern on spirometry.",
      "Explain why total lung capacity is needed to confirm restriction.",
      "Interpret a reduced diffusing capacity in the context of the pattern.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["pft-2022"],
        body: "Pulmonary function tests reward a consistent order. Read the FEV1 to FVC ratio first, confirm any suspected restriction with measured lung volumes, and then use the diffusing capacity to refine the differential.",
      },
      {
        type: "keypoints",
        heading: "A stepwise read",
        source: "supplemental",
        refIds: ["pft-2022"],
        items: [
          "Obstruction: a reduced FEV1 to FVC ratio. Grade severity by the FEV1 percent predicted.",
          "Restriction: suggested by a low FVC with a preserved or high ratio, but confirmed by a reduced total lung capacity on lung volume testing.",
          "Diffusing capacity (DLCO): reduced in emphysema, interstitial disease, and pulmonary vascular disease; helps separate causes that share a spirometric pattern.",
          "Always check bronchodilator response and compare against reference equations appropriate to the patient.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "A low DLCO with obstruction fits emphysema; a normal DLCO with obstruction fits asthma or chronic bronchitis. A low DLCO with restriction fits interstitial disease; a low DLCO with normal spirometry and volumes raises pulmonary vascular disease.",
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["pft-2022"],
        variesByInstitution: true,
        body: "Interpretation standards, including the move toward z-scores and updated reference equations, evolve. Use your lab's current reference set and the current ERS/ATS interpretive standard.",
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Calling restriction from spirometry alone without lung volumes; a low FVC can occur in obstruction from air trapping.",
          "Interpreting DLCO without accounting for hemoglobin and alveolar volume.",
        ],
      },
    ],
    refIds: ["pft-2022"],
    quizTopicId: "qt-pft",
    flashcardTopic: "PFT interpretation",
    keywords: ["PFT", "spirometry", "DLCO", "restriction", "obstruction", "lung volumes", "TLC"],
  },
];
