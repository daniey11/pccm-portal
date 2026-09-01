import type { Lesson } from "../../types";

export const transplantLessons: Lesson[] = [
  // ------------------------------------------------ Candidate selection
  {
    id: "tx-selection",
    moduleId: "mod-transplant",
    topicId: "topic-candidate",
    title: "Candidate evaluation and referral",
    summary:
      "Who to refer, when to refer, and how the multidisciplinary evaluation weighs disease trajectory against risk factors and contraindications.",
    level: "beginner",
    domain: "transplant",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Describe the goal of early referral versus listing.",
      "Outline the domains a transplant evaluation assesses.",
      "Explain why contraindications are increasingly framed as risk rather than fixed rules.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["ishlt-selection-2021"],
        body: "Lung transplant evaluation asks whether transplant is likely to extend survival and improve quality of life for a patient whose lung disease is advanced and progressive, and whether they can survive the operation and the demands of lifelong immunosuppression. The ISHLT consensus separates referral, which should happen early, from listing, which happens when the disease reaches a window where transplant offers benefit.",
      },
      {
        type: "keypoints",
        heading: "Refer early, list at the right window",
        source: "supplemental",
        refIds: ["ishlt-selection-2021"],
        items: [
          "Early referral gives time for evaluation, optimization, and candid discussion before a crisis.",
          "Listing timing is disease-specific and reflects trajectory, not a single number.",
          "Common disease groups include obstructive disease, interstitial and fibrotic disease, pulmonary vascular disease, and suppurative disease such as cystic fibrosis and bronchiectasis.",
        ],
      },
      {
        type: "keypoints",
        heading: "What the evaluation covers",
        source: "supplemental",
        refIds: ["ishlt-selection-2021"],
        items: [
          "Severity and trajectory of the underlying lung disease.",
          "Other organ function, frailty, nutrition, and body habitus.",
          "Infectious and immunologic assessment, including sensitization.",
          "Psychosocial support, adherence, and substance use.",
        ],
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["ishlt-selection-2021"],
        variesByInstitution: true,
        body: "The current ISHLT consensus frames many former absolute contraindications as relative, to be weighed together as cumulative risk. Specific age cutoffs, body mass thresholds, and how individual risk factors are weighted vary by program. Confirm the current consensus document and your center's criteria.",
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "The strongest lever a referring team controls is timing: refer before the patient is too sick to be evaluated.",
          "Reversible or modifiable factors (deconditioning, nutrition, some infections) are worth optimizing during evaluation.",
        ],
      },
    ],
    refIds: ["ishlt-selection-2021"],
    quizTopicId: "qt-tx-selection",
    flashcardTopic: "Transplant candidacy",
    keywords: ["lung transplant", "candidate", "referral", "listing", "ISHLT", "contraindication"],
  },

  // -------------------------------------------------- Primary graft dysfunction
  {
    id: "tx-pgd",
    moduleId: "mod-transplant",
    topicId: "topic-pgd",
    title: "Primary graft dysfunction",
    summary:
      "The early post-transplant lung injury syndrome: how it is graded, when it is assessed, and why it matters for both early and late outcomes.",
    level: "intermediate",
    domain: "transplant",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Define primary graft dysfunction and its timing.",
      "State the two inputs used to grade it.",
      "Explain why PGD matters beyond the immediate postoperative period.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["ishlt-pgd-2016"],
        body: "Primary graft dysfunction (PGD) is a form of acute lung injury in the newly transplanted allograft, appearing in the first hours to days. It resembles ARDS in the graft and is a leading cause of early morbidity and mortality. The ISHLT grading standard makes assessment consistent across centers.",
      },
      {
        type: "keypoints",
        heading: "How PGD is graded",
        source: "supplemental",
        refIds: ["ishlt-pgd-2016"],
        items: [
          "Grading uses two inputs: the oxygenation (PaO2/FiO2 ratio) and the presence of radiographic pulmonary edema in the allograft.",
          "Grades run from 0 to 3, with grade 3 the most severe.",
          "Assessment is done at defined time points across the first 72 hours.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        refIds: ["ishlt-pgd-2016"],
        body: "Severe early PGD is associated not only with worse short-term outcomes but also with a higher risk of later chronic lung allograft dysfunction. It links the immediate ICU course to long-term graft health.",
      },
      {
        type: "keypoints",
        heading: "Management principles",
        source: "supplemental",
        items: [
          "Supportive, lung-protective care, much as in ARDS.",
          "Careful fluid management and treatment of contributing factors.",
          "Escalation to advanced support, including ECMO, in severe refractory cases at experienced centers.",
        ],
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["ishlt-pgd-2016"],
        variesByInstitution: true,
        body: "The exact PaO2/FiO2 boundaries for each grade and the assessment time points should be read from the current ISHLT PGD consensus. Confirm the precise grading table before applying it.",
      },
    ],
    refIds: ["ishlt-pgd-2016"],
    quizTopicId: "qt-tx-pgd",
    flashcardTopic: "PGD",
    keywords: ["primary graft dysfunction", "PGD", "allograft", "reperfusion", "ISHLT", "grading"],
  },

  // ----------------------------------------------------------------- CLAD
  {
    id: "tx-clad",
    moduleId: "mod-transplant",
    topicId: "topic-clad",
    title: "Chronic lung allograft dysfunction: BOS and RAS",
    summary:
      "CLAD is the main barrier to long-term survival after lung transplant. It splits into an obstructive phenotype (BOS) and a restrictive phenotype (RAS).",
    level: "advanced",
    domain: "transplant",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Define CLAD as a sustained decline in allograft function.",
      "Contrast the obstructive (BOS) and restrictive (RAS) phenotypes.",
      "Explain why phenotype matters for prognosis and approach.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["ishlt-clad-2019"],
        body: "Chronic lung allograft dysfunction is a persistent, significant fall in lung function that is not explained by a reversible cause. It is the dominant limit on long-term survival after lung transplant. The ISHLT consensus organizes CLAD into phenotypes because they behave differently.",
      },
      {
        type: "keypoints",
        heading: "The two main phenotypes",
        source: "supplemental",
        refIds: ["ishlt-clad-2019"],
        items: [
          "Bronchiolitis obliterans syndrome (BOS): an obstructive physiology with a sustained FEV1 decline and typically no persistent restriction or lung opacities.",
          "Restrictive allograft syndrome (RAS): a restrictive physiology with loss of total lung capacity and often persistent lung opacities on imaging.",
          "Mixed and undefined patterns also occur.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        refIds: ["ishlt-clad-2019"],
        body: "RAS generally carries a worse prognosis than BOS. Distinguishing them relies on both physiology (spirometry and lung volumes) and imaging, which is why serial testing and a chest CT are central to the workup.",
      },
      {
        type: "keypoints",
        heading: "Workup principles",
        source: "supplemental",
        items: [
          "Confirm the decline is sustained and rule out reversible causes such as infection, acute rejection, airway complications, and reflux.",
          "Use spirometry plus lung volumes to separate obstructive from restrictive change.",
          "Imaging helps identify the persistent opacities that point toward RAS.",
        ],
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        refIds: ["ishlt-clad-2019"],
        variesByInstitution: true,
        body: "The precise FEV1 decline thresholds, staging, and phenotype criteria come from the ISHLT CLAD consensus. Treatment approaches vary and evolve; confirm the current consensus and your program's practice.",
      },
    ],
    refIds: ["ishlt-clad-2019"],
    quizTopicId: "qt-tx-clad",
    flashcardTopic: "CLAD",
    keywords: ["CLAD", "BOS", "RAS", "bronchiolitis obliterans", "restrictive allograft", "chronic rejection"],
  },

  // ------------------------------------------------------- Immunosuppression
  {
    id: "tx-immunosuppression",
    moduleId: "mod-transplant",
    topicId: "topic-immunosuppression",
    title: "Maintenance immunosuppression: the standard backbone",
    summary:
      "Most programs use a three-drug maintenance regimen. Knowing the classes, their major toxicities, and key interactions prevents avoidable harm.",
    level: "intermediate",
    domain: "transplant",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Name the three classes in a typical maintenance regimen.",
      "Match each class to its major toxicities.",
      "Flag the drug interactions that most often cause trouble.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "Maintenance immunosuppression after lung transplant usually combines three classes to suppress rejection while limiting the toxicity of any single agent. The specific agents, target levels, and adjustments are center-specific, but the backbone is consistent.",
      },
      {
        type: "table",
        source: "supplemental",
        table: {
          caption: "Typical three-drug backbone",
          headers: ["Class", "Role", "Major toxicities to watch"],
          rows: [
            ["Calcineurin inhibitor", "Core T-cell suppression", "Kidney injury, neurotoxicity, tremor, hypertension, metabolic effects"],
            ["Antimetabolite", "Adds anti-proliferative suppression", "Cytopenias, gastrointestinal intolerance"],
            ["Corticosteroid", "Broad anti-inflammatory suppression", "Hyperglycemia, bone loss, weight gain, mood and skin effects"],
          ],
        },
      },
      {
        type: "callout",
        callout: "safety",
        source: "supplemental",
        body: "Calcineurin inhibitors are metabolized through the CYP3A pathway, so azole antifungals and many other CYP3A inhibitors and inducers can push levels dangerously high or low. Every new medication in a transplant patient deserves an interaction check.",
      },
      {
        type: "keypoints",
        heading: "Beyond the backbone",
        source: "supplemental",
        items: [
          "Infection prophylaxis (for example against Pneumocystis, cytomegalovirus, and fungal infection) is part of the regimen, not an afterthought.",
          "The net state of immunosuppression drives both infection risk and malignancy risk over time.",
          "Adherence and level monitoring are central to preventing rejection.",
        ],
      },
      {
        type: "callout",
        callout: "institution",
        source: "institution",
        variesByInstitution: true,
        body: "Agent choice, target drug levels, prophylaxis regimens, and monitoring schedules are set by each transplant program. Always use your center's protocol for specifics.",
      },
    ],
    refIds: [],
    quizTopicId: "qt-tx-immuno",
    flashcardTopic: "Immunosuppression",
    keywords: ["immunosuppression", "calcineurin inhibitor", "tacrolimus", "antimetabolite", "steroid", "CYP3A", "prophylaxis"],
  },

  // ----------------------------------------------- Acute rejection & surveillance
  {
    id: "tx-rejection",
    moduleId: "mod-transplant",
    topicId: "topic-rejection",
    title: "Acute rejection and surveillance bronchoscopy",
    summary:
      "Acute cellular rejection is graded histologically from transbronchial biopsy. Surveillance bronchoscopy is how many programs monitor the allograft.",
    level: "advanced",
    domain: "transplant",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Describe the role of surveillance bronchoscopy after transplant.",
      "Outline how acute cellular rejection is graded.",
      "Separate acute rejection from infection and airway complications on the differential.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["ishlt-rejection-2007"],
        body: "After lung transplant, bronchoscopy with bronchoalveolar lavage and transbronchial biopsy is used both to investigate problems and, in many programs, to survey for rejection before symptoms appear. The ISHLT working formulation standardizes how pathologists grade rejection so results are comparable across centers.",
      },
      {
        type: "keypoints",
        heading: "The ISHLT grading, in outline",
        source: "supplemental",
        refIds: ["ishlt-rejection-2007"],
        items: [
          "Acute cellular rejection is graded by perivascular mononuclear infiltrates (the A grades).",
          "Airway inflammation is graded separately (the B grades).",
          "Chronic changes and antibody-mediated processes are described in their own categories.",
          "Adequate sampling matters; the grade depends on enough biopsy tissue.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "A transplant recipient with new infiltrates or a functional decline has a broad differential: acute rejection, infection, airway complications, recurrent disease, and PGD early on. Bronchoscopy with lavage and biopsy helps separate these, which is why it is central to transplant pulmonary care.",
      },
      {
        type: "keypoints",
        heading: "Airway complications to recognize",
        source: "supplemental",
        items: [
          "Anastomotic problems including dehiscence, stenosis, and ischemia.",
          "Granulation tissue and malacia at or near the anastomosis.",
          "These are found and followed endoscopically, and interact with rejection and infection risk.",
        ],
      },
      {
        type: "callout",
        callout: "institution",
        source: "institution",
        variesByInstitution: true,
        body: "Surveillance schedules, whether to do surveillance versus for-cause bronchoscopy, and biopsy protocols differ substantially by program. Follow your center's transplant bronchoscopy protocol.",
      },
    ],
    refIds: ["ishlt-rejection-2007", "ats-bal-2012"],
    quizTopicId: "qt-tx-rejection",
    flashcardTopic: "Rejection & surveillance",
    keywords: ["acute rejection", "surveillance bronchoscopy", "transbronchial biopsy", "ISHLT grading", "anastomosis", "BAL"],
  },
];
