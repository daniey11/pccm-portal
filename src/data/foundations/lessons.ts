import type { Lesson } from "../../types";

// Foundations = the shared physiology the rest of the portal leans on. Content
// here is standard, stable teaching. Supplemental unless an upload replaces it.

export const foundationsLessons: Lesson[] = [
  {
    id: "found-hypoxemia",
    moduleId: "mod-foundations",
    topicId: "topic-gas-exchange",
    title: "The five mechanisms of hypoxemia",
    summary:
      "A framework for reasoning about any hypoxemic patient: which mechanism is in play, and does it respond to supplemental oxygen.",
    level: "beginner",
    domain: "foundations",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "List the five physiologic mechanisms of hypoxemia.",
      "Use the A-a gradient and the response to oxygen to separate them.",
      "Recognize shunt as the mechanism that does not correct with oxygen alone.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "Hypoxemia has a small number of mechanisms. Sorting a patient into one of them tells you what to expect from oxygen and where to look next. Two quick bedside tools do most of the work: the alveolar-arterial (A-a) gradient, and whether the hypoxemia improves with supplemental oxygen.",
      },
      {
        type: "keypoints",
        heading: "The five mechanisms",
        source: "supplemental",
        items: [
          "V/Q mismatch: the most common cause in lung disease. Normal or widened A-a gradient; generally improves with oxygen.",
          "Shunt: blood bypasses ventilated alveoli (for example, filled or collapsed lung, or an intracardiac shunt). Widened A-a gradient; does not fully correct with oxygen.",
          "Hypoventilation: high PaCO2 drives PaO2 down. Normal A-a gradient; corrects with oxygen. Look for a cause of low minute ventilation.",
          "Diffusion limitation: seen with interstitial disease and on exertion. Widened A-a gradient; improves with oxygen.",
          "Low inspired PO2: altitude or a low FiO2 source. Normal A-a gradient; improves with oxygen.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "The single most useful split at the bedside: if the A-a gradient is normal, think hypoventilation or low inspired PO2. If it is widened, think V/Q mismatch, shunt, or diffusion limitation. Then apply oxygen: a shunt is the one that stays stubbornly low.",
      },
      {
        type: "table",
        source: "supplemental",
        table: {
          caption: "Quick separation by A-a gradient and oxygen response",
          headers: ["Mechanism", "A-a gradient", "Responds to O2?"],
          rows: [
            ["V/Q mismatch", "Normal or widened", "Yes"],
            ["Shunt", "Widened", "No (or minimally)"],
            ["Hypoventilation", "Normal", "Yes"],
            ["Diffusion limitation", "Widened", "Yes"],
            ["Low inspired PO2", "Normal", "Yes"],
          ],
        },
      },
      {
        type: "pearls",
        source: "supplemental",
        items: [
          "A near-100% FiO2 challenge that barely moves the PaO2 points strongly to shunt.",
          "A normal A-a gradient with a high PaCO2 is hypoventilation until proven otherwise.",
        ],
      },
      {
        type: "pitfalls",
        source: "supplemental",
        items: [
          "Forgetting to correct the A-a gradient expectation for age and for the patient's actual FiO2.",
          "Calling every hypoxemic patient V/Q mismatch without testing the oxygen response.",
        ],
      },
    ],
    refIds: [],
    quizTopicId: "qt-gas-exchange",
    flashcardTopic: "Gas exchange",
    keywords: ["hypoxemia", "A-a gradient", "shunt", "V/Q", "diffusion", "oxygen"],
  },
  {
    id: "found-oxygen-delivery",
    moduleId: "mod-foundations",
    topicId: "topic-oxygen-delivery",
    title: "Oxygen delivery: why hemoglobin usually matters more than PaO2",
    summary:
      "Oxygen delivery is flow times content. Content is dominated by hemoglobin and saturation, not dissolved oxygen — which reframes a lot of ICU decisions.",
    level: "beginner",
    domain: "foundations",
    status: "seeded",
    source: "supplemental",
    objectives: [
      "State the determinants of oxygen delivery (DO2).",
      "Explain why hemoglobin and SaO2 dominate oxygen content.",
      "Connect delivery-consumption balance to lactate and mixed venous saturation.",
    ],
    blocks: [
      {
        type: "prose",
        source: "supplemental",
        body: "Oxygen delivery is cardiac output multiplied by arterial oxygen content. Arterial oxygen content is set mostly by hemoglobin concentration and its saturation, with only a small dissolved contribution from PaO2. That is why raising a saturation from 88 to 98 percent does far less than people expect once hemoglobin or output is the limiting factor.",
      },
      {
        type: "keypoints",
        heading: "The delivery equation, in words",
        source: "supplemental",
        items: [
          "Delivery (DO2) = cardiac output x arterial oxygen content.",
          "Oxygen content is driven by hemoglobin and its saturation; dissolved oxygen (from PaO2) is a minor term.",
          "When delivery cannot meet consumption, tissues extract more oxygen and, past a limit, shift to anaerobic metabolism and rising lactate.",
        ],
      },
      {
        type: "callout",
        callout: "highYield",
        source: "supplemental",
        body: "A patient who is well saturated can still be delivery-limited if cardiac output or hemoglobin is low. Chasing the pulse oximeter alone misses this. Think about all three levers: flow, hemoglobin, and saturation.",
      },
      {
        type: "boardPearls",
        source: "supplemental",
        items: [
          "Because saturation is near the flat top of the oxyhemoglobin curve above roughly 90 percent, small PaO2 gains there add little content.",
          "A falling mixed or central venous oxygen saturation suggests rising extraction and a delivery-consumption mismatch.",
        ],
      },
    ],
    refIds: [],
    quizTopicId: "qt-gas-exchange",
    flashcardTopic: "Oxygen delivery",
    keywords: ["oxygen delivery", "DO2", "hemoglobin", "cardiac output", "content"],
  },
];
