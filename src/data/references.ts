import type { Reference } from "../types";

// ---------------------------------------------------------------------------
// References. These are real, well-known society documents and landmark trials.
// Nothing here is invented. Living guidelines (GOLD, GINA, Surviving Sepsis,
// ISHLT selection) are marked verifyCurrent so a reader always checks the
// current published version before relying on specifics.
//
// Citations are given at a level the authors can verify quickly. Where a precise
// page range was not certain, journal/year/volume is given rather than a guessed
// locator.
// ---------------------------------------------------------------------------

export const references: Reference[] = [
  // ---- Critical care: ARDS & ventilation ----
  {
    id: "berlin-2012",
    label: "Berlin Definition (2012)",
    kind: "consensus",
    society: "ARDS Definition Task Force",
    year: 2012,
    citation:
      "ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307(23):2526-2533.",
  },
  {
    id: "arma-2000",
    label: "ARDSNet ARMA (2000)",
    kind: "trial",
    society: "ARDS Network",
    year: 2000,
    citation:
      "The Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and ARDS. N Engl J Med. 2000;342(18):1301-1308.",
  },
  {
    id: "proseva-2013",
    label: "PROSEVA (2013)",
    kind: "trial",
    year: 2013,
    citation:
      "Guérin C, Reignier J, Richard JC, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-2168.",
  },
  {
    id: "amato-2015",
    label: "Driving pressure (Amato, 2015)",
    kind: "trial",
    year: 2015,
    citation:
      "Amato MBP, Meade MO, Slutsky AS, et al. Driving pressure and survival in the acute respiratory distress syndrome. N Engl J Med. 2015;372(8):747-755.",
  },
  {
    id: "acurasys-2010",
    label: "ACURASYS (2010)",
    kind: "trial",
    year: 2010,
    citation:
      "Papazian L, Forel JM, Gacouin A, et al. Neuromuscular blockers in early acute respiratory distress syndrome. N Engl J Med. 2010;363(12):1107-1116.",
  },
  {
    id: "rose-2019",
    label: "ROSE (2019)",
    kind: "trial",
    year: 2019,
    citation:
      "National Heart, Lung, and Blood Institute PETAL Clinical Trials Network. Early neuromuscular blockade in the acute respiratory distress syndrome. N Engl J Med. 2019;380(21):1997-2008.",
  },
  {
    id: "eolia-2018",
    label: "EOLIA (2018)",
    kind: "trial",
    year: 2018,
    citation:
      "Combes A, Hajage D, Capellier G, et al. Extracorporeal membrane oxygenation for severe acute respiratory distress syndrome. N Engl J Med. 2018;378(21):1965-1975.",
  },

  // ---- Critical care: sepsis & shock ----
  {
    id: "sepsis3-2016",
    label: "Sepsis-3 (2016)",
    kind: "consensus",
    year: 2016,
    citation:
      "Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
  },
  {
    id: "ssc-2021",
    label: "Surviving Sepsis Campaign (2021)",
    kind: "guideline",
    society: "SCCM / ESICM",
    year: 2021,
    verifyCurrent: true,
    citation:
      "Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.",
  },
  {
    id: "vincent-shock-2013",
    label: "Circulatory shock (2013)",
    kind: "review",
    year: 2013,
    citation:
      "Vincent JL, De Backer D. Circulatory shock. N Engl J Med. 2013;369(18):1726-1734.",
  },

  // ---- Pulmonary ----
  {
    id: "fleischner-2017",
    label: "Fleischner Society nodules (2017)",
    kind: "guideline",
    society: "Fleischner Society",
    year: 2017,
    citation:
      "MacMahon H, Naidich DP, Goo JM, et al. Guidelines for management of incidental pulmonary nodules detected on CT images: from the Fleischner Society 2017. Radiology. 2017;284(1):228-243.",
  },
  {
    id: "gold",
    label: "GOLD COPD report",
    kind: "guideline",
    society: "GOLD",
    verifyCurrent: true,
    citation:
      "Global Initiative for Chronic Obstructive Lung Disease (GOLD). Global strategy for the diagnosis, management, and prevention of COPD. Updated annually — confirm the current year's report.",
  },
  {
    id: "gina",
    label: "GINA asthma report",
    kind: "guideline",
    society: "GINA",
    verifyCurrent: true,
    citation:
      "Global Initiative for Asthma (GINA). Global strategy for asthma management and prevention. Updated annually — confirm the current year's report.",
  },
  {
    id: "pft-2022",
    label: "ERS/ATS PFT interpretation (2022)",
    kind: "guideline",
    society: "ERS / ATS",
    year: 2022,
    verifyCurrent: true,
    citation:
      "Stanojevic S, Kaminsky DA, Miller MR, et al. ERS/ATS technical standard on interpretive strategies for routine lung function tests. Eur Respir J. 2022;60(1):2101499.",
  },

  // ---- Bronchoscopy ----
  {
    id: "bts-bronch-2013",
    label: "BTS diagnostic bronchoscopy (2013)",
    kind: "guideline",
    society: "BTS",
    year: 2013,
    citation:
      "Du Rand IA, Blaikley J, Booton R, et al. British Thoracic Society guideline for diagnostic flexible bronchoscopy in adults. Thorax. 2013;68(Suppl 1):i1-i44.",
  },
  {
    id: "ats-bal-2012",
    label: "ATS BAL cellular analysis (2012)",
    kind: "guideline",
    society: "ATS",
    year: 2012,
    citation:
      "Meyer KC, Raghu G, Baughman RP, et al. An official ATS clinical practice guideline: the clinical utility of bronchoalveolar lavage cellular analysis in interstitial lung disease. Am J Respir Crit Care Med. 2012;185(9):1004-1014.",
  },

  // ---- Lung transplant ----
  {
    id: "ishlt-selection-2021",
    label: "ISHLT candidate selection (2021)",
    kind: "consensus",
    society: "ISHLT",
    year: 2021,
    verifyCurrent: true,
    citation:
      "Leard LE, Holm AM, Valapour M, et al. Consensus document for the selection of lung transplant candidates: an update from the International Society for Heart and Lung Transplantation. J Heart Lung Transplant. 2021;40(11):1349-1379.",
  },
  {
    id: "ishlt-pgd-2016",
    label: "ISHLT PGD grading (2016)",
    kind: "consensus",
    society: "ISHLT",
    year: 2017,
    citation:
      "Snell GI, Yusen RD, Weill D, et al. Report of the ISHLT Working Group on Primary Lung Graft Dysfunction, part I: definition and grading — a 2016 consensus group statement. J Heart Lung Transplant. 2017;36(10):1097-1103.",
  },
  {
    id: "ishlt-clad-2019",
    label: "ISHLT CLAD consensus (2019)",
    kind: "consensus",
    society: "ISHLT",
    year: 2019,
    citation:
      "Verleden GM, Glanville AR, Lease ED, et al. Chronic lung allograft dysfunction: definition, diagnostic criteria, and approaches to treatment — a consensus report from the Pulmonary Council of the ISHLT. J Heart Lung Transplant. 2019;38(5):493-503.",
  },
  {
    id: "ishlt-rejection-2007",
    label: "ISHLT rejection grading (2007)",
    kind: "consensus",
    society: "ISHLT",
    year: 2007,
    citation:
      "Stewart S, Fishbein MC, Snell GI, et al. Revision of the 1996 working formulation for the standardization of nomenclature in the diagnosis of lung rejection. J Heart Lung Transplant. 2007;26(12):1229-1242.",
  },
];

export const refById: Record<string, Reference> = Object.fromEntries(
  references.map((r) => [r.id, r])
);
