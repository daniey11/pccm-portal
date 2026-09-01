import type { Lesson } from "../../types";

export const criticalCareLessons: Lesson[] = [
  // ------------------------------------------------------------------ ARDS
  {
    id: "cc-ards",
    moduleId: "mod-critical",
    topicId: "topic-ards",
    title: "ARDS: definition and lung-protective management",
    summary:
      "The Berlin definition, low tidal volume ventilation, proning for severe disease, and where neuromuscular blockade and ECMO fit.",
    level: "intermediate",
    domain: "critical-care",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Apply the Berlin definition, including timing, imaging, oxygenation, and the exclusion of hydrostatic edema.",
      "Set lung-protective ventilation and explain why plateau and driving pressure matter.",
      "Identify which severe-ARDS patients benefit from proning, and where blockade and ECMO fit.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "ARDS is acute, diffuse inflammatory lung injury producing bilateral opacities and hypoxemia that is not explained by cardiac failure or fluid overload. The Berlin definition frames it by timing, imaging, the origin of the edema, and severity by oxygenation.",
      },
      {
        type: "keypoints",
        heading: "Berlin definition (2012)",
        source: "supplemental",
        refIds: ["berlin-2012"],
        items: [
          "Timing: within one week of a known insult or new or worsening respiratory symptoms.",
          "Imaging: bilateral opacities not fully explained by effusions, collapse, or nodules.",
          "Origin: respiratory failure not fully explained by cardiac failure or fluid overload.",
          "Severity by PaO2/FiO2 with PEEP or CPAP at least 5: mild 200 to 300, moderate 100 to 200, severe at or below 100.",
        ],
      },
      {
        type: "landmark",
        source: "supplemental",
        trial: {
          name: "ARDSNet ARMA (2000)",
          takeaway:
            "Ventilating at roughly 6 mL/kg predicted body weight, versus 12, lowered mortality. Low tidal volume ventilation with attention to plateau pressure is the foundation of ARDS care.",
          refId: "arma-2000",
        },
      },
      {
        type: "keypoints",
        heading: "Lung-protective ventilation, in practice",
        source: "supplemental",
        refIds: ["arma-2000", "amato-2015"],
        items: [
          "Target a low tidal volume set to predicted body weight, which depends on height and sex, not actual weight.",
          "Keep plateau pressure within a protective ceiling and watch driving pressure (plateau minus PEEP).",
          "Titrate PEEP and FiO2 together to an oxygenation target; permissive hypercapnia is usually acceptable if pH is tolerated.",
        ],
      },
      {
        type: "landmark",
        source: "supplemental",
        trial: {
          name: "Driving pressure (Amato, 2015)",
          takeaway:
            "Across trials, driving pressure was the ventilation variable most strongly associated with survival. Lowering driving pressure is a useful bedside goal.",
          refId: "amato-2015",
        },
      },
      {
        type: "landmark",
        source: "supplemental",
        trial: {
          name: "PROSEVA (2013)",
          takeaway:
            "In severe ARDS (P/F below 150), early prolonged prone positioning reduced mortality. Prone early rather than as a last resort.",
          refId: "proseva-2013",
        },
      },
      {
        type: "prose",
        heading: "Adjuncts for severe disease",
        source: "supplemental",
        refIds: ["acurasys-2010", "rose-2019", "eolia-2018"],
        body: "Neuromuscular blockade trials sit in tension: ACURASYS suggested benefit in severe ARDS, while the later ROSE trial did not show a mortality benefit with a different sedation strategy. Blockade is now used selectively rather than routinely. For refractory hypoxemia, venovenous ECMO is a rescue option at experienced centers; EOLIA and its later analyses support ECMO in carefully selected severe cases.",
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "Predicted body weight is set by height and sex, so measure or estimate height rather than eyeballing weight.",
          "If oxygenation is failing, prone before reaching for rescue therapies in most severe cases.",
        ],
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Dosing tidal volume to actual body weight, which overshoots the protective target in heavier patients.",
          "Treating every bilateral infiltrate as ARDS without excluding cardiogenic edema and volume overload.",
        ],
      },
      {
        type: "callout",
        callout: "evidence",
        source: "supplemental",
        body: "Specific numeric ceilings (tidal volume per kg, plateau and driving pressure limits, PEEP-FiO2 tables) are best pulled from the current protocol you follow. This lesson gives the framework; confirm the exact targets against your unit's ARDS protocol.",
        variesByInstitution: true,
      },
    ],
    refIds: ["berlin-2012", "arma-2000", "amato-2015", "proseva-2013", "acurasys-2010", "rose-2019", "eolia-2018"],
    quizTopicId: "qt-ards",
    flashcardTopic: "ARDS",
    keywords: ["ARDS", "Berlin", "proning", "PROSEVA", "ARDSNet", "driving pressure", "ECMO", "tidal volume"],
  },

  // ------------------------------------------------------------------ Shock
  {
    id: "cc-shock",
    moduleId: "mod-critical",
    topicId: "topic-shock",
    title: "Shock: four categories and their hemodynamic profiles",
    summary:
      "Distributive, cardiogenic, hypovolemic, and obstructive shock each have a recognizable pattern of preload, pump, and afterload. That pattern points to the fix.",
    level: "intermediate",
    domain: "critical-care",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Classify shock into distributive, cardiogenic, hypovolemic, and obstructive.",
      "Predict the hemodynamic profile of each category.",
      "Use the profile plus bedside data to guide initial management.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        refIds: ["vincent-shock-2013"],
        body: "Shock is circulatory failure with inadequate oxygen delivery to tissues, usually with a rising lactate. Sorting it into four categories early narrows the workup and the first moves. Many real patients are mixed, so keep reassessing.",
      },
      {
        type: "table",
        source: "supplemental",
        table: {
          caption: "Classic hemodynamic profiles",
          headers: ["Type", "Preload", "Cardiac output", "Systemic vascular resistance"],
          rows: [
            ["Distributive (for example sepsis)", "Low to normal", "High or normal", "Low"],
            ["Cardiogenic", "High", "Low", "High"],
            ["Hypovolemic", "Low", "Low", "High"],
            ["Obstructive (for example tamponade, PE)", "Varies", "Low", "High"],
          ],
        },
      },
      {
        type: "keypoints",
        heading: "What each category points you toward",
        source: "supplemental",
        items: [
          "Distributive: vasodilation dominates. Source control, fluids as appropriate, and vasopressors.",
          "Cardiogenic: the pump is failing. Support output and address the cause; be cautious with fluids.",
          "Hypovolemic: the tank is empty from bleeding or losses. Stop the loss and restore volume.",
          "Obstructive: a mechanical block. Relieve it directly, for example drain a tamponade or treat massive PE.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "Bedside ultrasound often sorts these quickly: a hyperdynamic underfilled heart suggests distributive or hypovolemic shock, a poorly contracting dilated heart suggests cardiogenic, and a pericardial effusion with collapse or a dilated right ventricle points to obstructive causes.",
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Giving large fluid boluses to a cardiogenic or obstructive patient because the blood pressure is low.",
          "Anchoring on one category when the patient is mixed, for example septic plus cardiac dysfunction.",
        ],
      },
    ],
    refIds: ["vincent-shock-2013"],
    quizTopicId: "qt-shock",
    flashcardTopic: "Shock",
    keywords: ["shock", "distributive", "cardiogenic", "hypovolemic", "obstructive", "hemodynamics", "SVR"],
  },

  // --------------------------------------------------- Mechanical ventilation
  {
    id: "cc-vent-basics",
    moduleId: "mod-critical",
    topicId: "topic-mech-vent",
    title: "Mechanical ventilation: modes and the first settings",
    summary:
      "What volume control and pressure control actually change, and the small set of measurements that tell you whether the lung is safe.",
    level: "beginner",
    domain: "critical-care",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "Contrast volume-targeted and pressure-targeted breaths.",
      "Name the pressures that reflect lung safety and how to read them.",
      "Describe an initial protective setup and what to reassess.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "A ventilator breath is defined by what you fix and what you let vary. In volume-targeted modes you set the tidal volume and pressure varies. In pressure-targeted modes you set the pressure and the delivered volume varies with the patient's lung mechanics and effort.",
      },
      {
        type: "keypoints",
        heading: "Pressures worth watching",
        source: "supplemental",
        items: [
          "Peak pressure reflects both airway resistance and lung stiffness.",
          "Plateau pressure, measured on an inspiratory hold, reflects alveolar distension and is the safety number for the lung.",
          "Driving pressure (plateau minus PEEP) tracks the strain each breath places on the lung.",
          "Auto-PEEP (breath stacking) is checked with an expiratory hold, especially in obstruction.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "A high peak pressure with a normal plateau points to a resistance problem (secretions, bronchospasm, a kinked or biting tube). A high peak with a high plateau points to a compliance problem (stiff lungs, overdistension, pneumothorax, or abdominal pressure).",
      },
      {
        type: "keypoints",
        heading: "A reasonable protective starting point",
        source: "supplemental",
        refIds: ["arma-2000"],
        items: [
          "Tidal volume set to predicted body weight, kept in the lung-protective range.",
          "PEEP and FiO2 titrated together to an oxygenation target.",
          "Rate and inspiratory time set to allow full exhalation and an acceptable pH.",
          "Reassess plateau and driving pressure after the patient settles.",
        ],
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Reading only the peak pressure and missing a dangerous plateau.",
          "Ignoring auto-PEEP in an obstructed patient who is hard to trigger or hypotensive.",
        ],
      },
      {
        type: "callout",
        callout: "institution",
        source: "institution",
        variesByInstitution: true,
        body: "Default modes, alarm limits, and weaning protocols differ by unit and ventilator platform. Confirm your unit's defaults and your respiratory therapy protocols.",
      },
    ],
    refIds: ["arma-2000"],
    quizTopicId: "qt-mech-vent",
    flashcardTopic: "Mechanical ventilation",
    keywords: ["ventilator", "volume control", "pressure control", "plateau", "driving pressure", "auto-PEEP", "PEEP"],
  },
];
