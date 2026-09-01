import type { Lesson } from "../../types";

export const bronchoscopyLessons: Lesson[] = [
  // ------------------------------------------------- Airway anatomy essentials
  {
    id: "br-anatomy",
    moduleId: "mod-bronchoscopy",
    topicId: "topic-airway-anatomy",
    title: "Airway anatomy essentials for the bronchoscopist",
    summary:
      "The tracheobronchial tree in the order you actually see it, with the naming that lets you report findings precisely.",
    level: "beginner",
    domain: "bronchoscopy",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Trace the airway from larynx to segmental bronchi in endoscopic order.",
      "Use consistent segmental naming to report location.",
      "Anticipate the branching differences between the right and left lungs.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "Bronchoscopy is easier when you always move through the airway in the same order and name each structure the same way. That consistency is what lets a report communicate exactly where a finding sits, and it makes sampling reproducible.",
      },
      {
        type: "keypoints",
        heading: "The path, in order",
        source: "supplemental",
        items: [
          "Larynx and vocal cords, then the trachea with its C-shaped cartilage anteriorly and flat posterior membrane.",
          "The main carina divides into right and left main bronchi.",
          "Right side: right upper lobe, then bronchus intermedius to the middle and lower lobes.",
          "Left side: left main bronchus to the upper lobe with the lingula, and the lower lobe.",
          "Each lobe divides into named segmental bronchi.",
        ],
      },
      {
        type: "figure",
        source: "supplemental",
        figure: {
          kind: "diagram",
          describe:
            "Labeled diagram of the tracheobronchial tree from larynx to segmental bronchi, with the right and left segmental names shown.",
        },
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "Orientation conventions (which way is anterior on your screen, clock-face references at each bifurcation) depend on scope rotation and how you are taught. Treat them as a starting frame and confirm the local convention before teaching them as fixed.",
        variesByInstitution: true,
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "The right upper lobe takeoff comes early and points away sharply, which is why it is easy to pass by.",
          "Report a finding by lobe and segment, not just side, so it can be found again.",
        ],
      },
    ],
    refIds: ["bts-bronch-2013"],
    quizTopicId: "qt-airway-anatomy",
    flashcardTopic: "Airway anatomy",
    keywords: ["airway", "anatomy", "carina", "segmental", "bronchus intermedius", "lingula", "bronchoscopy"],
  },

  // -------------------------------------------------------- Systematic exam
  {
    id: "br-exam",
    moduleId: "mod-bronchoscopy",
    topicId: "topic-systematic-exam",
    title: "The systematic airway exam",
    summary:
      "A repeatable survey that inspects the whole airway before sampling, so nothing is missed and bleeding does not spoil the view.",
    level: "beginner",
    domain: "bronchoscopy",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Perform a complete airway survey in a consistent sequence.",
      "Explain why the non-target lung is inspected first and the target sampled last.",
      "Document findings by precise location.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["bts-bronch-2013"],
        body: "A good bronchoscopy has a rhythm. Inspect the entire airway systematically before you sample, so you build a complete picture and avoid contaminating or obscuring the field with blood or secretions from an early biopsy.",
      },
      {
        type: "keypoints",
        heading: "A sensible sequence",
        source: "supplemental",
        items: [
          "Assess the larynx and cords on the way in.",
          "Inspect the trachea and main carina; note the carina's shape and mobility.",
          "Survey the non-target lung first, then the target lung.",
          "Sample the target segment last so bleeding or secretions do not spoil the survey.",
        ],
      },
      {
        type: "callout",
        callout: "safety",
        source: "supplemental",
        body: "Track the topical anesthetic total as you go. Local anesthetics have a real toxicity ceiling, and the safe maximum is lower in older, cardiac, or hepatic patients. Confirm your program's dose limits.",
        variesByInstitution: true,
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "A complete, well-documented survey is worth doing even when everything looks normal.",
          "Confirm an order exists for every specimen, labeled by exact location and type.",
        ],
      },
    ],
    refIds: ["bts-bronch-2013"],
    quizTopicId: "qt-systematic-exam",
    flashcardTopic: "Systematic exam",
    keywords: ["systematic exam", "survey", "airway inspection", "sampling sequence", "bronchoscopy"],
  },

  // ------------------------------------------------------------------ BAL
  {
    id: "br-bal",
    moduleId: "mod-bronchoscopy",
    topicId: "topic-bal",
    title: "Bronchoalveolar lavage: technique and interpretation",
    summary:
      "BAL samples the distal air spaces. Good technique and a structured read of the cell differential and studies make it diagnostically useful.",
    level: "intermediate",
    domain: "bronchoscopy",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Describe where and how BAL is performed.",
      "List the studies commonly sent and how the differential is used.",
      "State the technical factors that affect BAL quality.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["ats-bal-2012"],
        body: "Bronchoalveolar lavage wedges the scope in a target segment and instills and recovers saline to sample the distal air spaces. It is a workhorse for infection and interstitial disease, and its value depends on both technique and a structured interpretation.",
      },
      {
        type: "keypoints",
        heading: "Technique and studies",
        source: "supplemental",
        refIds: ["ats-bal-2012"],
        items: [
          "Choose the segment by the imaging: the most affected area for focal disease, a defined segment for diffuse disease.",
          "Wedge, instill saline in aliquots, and recover; the first aliquot samples more airway, later aliquots more alveolar space.",
          "Send studies to answer the question: cell count and differential, microbiology, and other targeted tests.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        refIds: ["ats-bal-2012"],
        body: "The BAL cell differential is a pattern tool, not a single answer. A lymphocyte-predominant pattern points one direction, neutrophil or eosinophil predominance others. Interpret it alongside the clinical picture and imaging, as the ATS guidance emphasizes.",
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Poor wedge or low recovery yields a sample that under-represents the alveolar space.",
          "Reading the differential in isolation from the imaging and history.",
        ],
      },
      {
        type: "callout",
        callout: "institution",
        source: "institution",
        variesByInstitution: true,
        body: "Instilled volumes, number of aliquots, and which studies are routine vary by lab and by indication. Use your program's BAL protocol.",
      },
    ],
    refIds: ["ats-bal-2012"],
    quizTopicId: "qt-bal",
    flashcardTopic: "BAL",
    keywords: ["BAL", "bronchoalveolar lavage", "cell differential", "lymphocyte", "wedge", "recovery"],
  },

  // ------------------------------------------------------------------ EBUS
  {
    id: "br-ebus",
    moduleId: "mod-bronchoscopy",
    topicId: "topic-ebus",
    title: "EBUS-TBNA: staging and diagnosis",
    summary:
      "Endobronchial ultrasound with needle aspiration samples mediastinal and hilar nodes in real time, and is central to lung cancer staging.",
    level: "advanced",
    domain: "bronchoscopy",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Explain what EBUS-TBNA adds over blind sampling.",
      "Describe systematic nodal staging and why it follows a sequence.",
      "Recognize the role of rapid on-site evaluation where available.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "Endobronchial ultrasound guided transbronchial needle aspiration (EBUS-TBNA) uses an ultrasound bronchoscope to see lymph nodes and vessels through the airway wall and to sample nodes under direct visualization. It has become a first-line tool for mediastinal staging in lung cancer and for diagnosing mediastinal adenopathy.",
      },
      {
        type: "keypoints",
        heading: "Principles that matter",
        source: "supplemental",
        items: [
          "Real-time ultrasound lets you target a node and avoid vessels, improving yield and safety over blind TBNA.",
          "For cancer staging, sample nodes in a systematic sequence to avoid upstaging error, generally sampling contralateral and higher-stage stations before ipsilateral and lower ones.",
          "Rapid on-site cytology evaluation, where available, can confirm adequate sampling during the procedure.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "Staging sequence is not arbitrary. Sampling the stations that would change the stage most first, and keeping needle passes clean between stations, protects the accuracy of the stage you report.",
      },
      {
        type: "callout",
        callout: "institution",
        source: "institution",
        variesByInstitution: true,
        body: "Node station mapping, the number of passes per station, needle choice, and on-site evaluation availability vary by center. Follow your program's EBUS protocol.",
      },
    ],
    refIds: [],
    quizTopicId: "qt-ebus",
    flashcardTopic: "EBUS",
    keywords: ["EBUS", "TBNA", "mediastinal staging", "lymph node", "lung cancer", "ultrasound"],
  },
];
