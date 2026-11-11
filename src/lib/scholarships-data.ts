// Curated seed data — also used as a graceful fallback if the database
// is not reachable yet, so the site still renders. The same records live
// in prisma/seed.ts and are written to PostgreSQL on `prisma db seed`.
//
// Deadlines are indicative for the 2027 intake and vary by country /
// programme. Every card links to the official page — always verify there
// before applying (see /disclaimer).

export type ScholarshipItem = {
  id: string;
  slug: string;
  title: string;
  provider: string;
  country: string;
  region: string;
  level: string;
  fundingType: string;
  amount: string;
  deadline: string; // ISO date
  description: string;
  eligibility: string;
  benefits: string;
  howToApply: string;
  field: string;
  applicationUrl: string;
  officialUrl: string;
  featured: boolean;
};

export const SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: "chevening-2027",
    slug: "chevening-scholarships-uk",
    title: "Chevening Scholarships",
    provider: "UK Foreign, Commonwealth & Development Office",
    country: "United Kingdom",
    region: "Europe",
    level: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition + monthly stipend + airfare",
    deadline: "2027-11-03",
    description:
      "Chevening is the UK government's global scholarship programme for future leaders. It funds a one-year master's degree at any UK university, with a focus on leadership, networking, and returning home to make an impact.",
    eligibility:
      "Be a citizen of a Chevening-eligible country; return to your home country for at least two years after the award; hold an undergraduate degree; have at least 2,800 hours of work experience; apply to three eligible UK master's courses.",
    benefits:
      "Full tuition fees; a monthly living allowance; return airfare; arrival and departure allowances; and access to exclusive Chevening events and a global alumni network.",
    howToApply:
      "Apply online via the Chevening portal, choose three courses, submit references and education documents, and attend an interview at the British embassy or high commission if shortlisted.",
    field: "All fields",
    applicationUrl: "https://www.chevening.org/apply/",
    officialUrl: "https://www.chevening.org/",
    featured: true,
  },
  {
    id: "fulbright-2027",
    slug: "fulbright-foreign-student-program-usa",
    title: "Fulbright Foreign Student Program",
    provider: "U.S. Department of State",
    country: "United States",
    region: "North America",
    level: "Masters, PhD",
    fundingType: "Fully Funded",
    amount: "Tuition + living stipend + airfare + health insurance",
    deadline: "2027-02-15",
    description:
      "The Fulbright Program funds graduate study and research in the United States for students from over 160 countries. It is one of the most prestigious awards in the world, built around academic excellence and cultural exchange.",
    eligibility:
      "Hold a bachelor's degree (or equivalent); meet the requirements set by the Fulbright commission or U.S. embassy in your home country; demonstrate academic merit and leadership potential. Deadlines and rules vary by country.",
    benefits:
      "Tuition and fees; a monthly maintenance allowance; round-trip airfare; health insurance; and funding for books, research, and cultural activities.",
    howToApply:
      "Apply through the Fulbright commission or U.S. embassy in your home country — not directly to a U.S. university. Deadlines are set locally, so check your country page first.",
    field: "All fields",
    applicationUrl: "https://foreign.fulbrightonline.org/",
    officialUrl: "https://foreign.fulbrightonline.org/",
    featured: true,
  },
  {
    id: "daad-epos-2027",
    slug: "daad-epos-germany",
    title: "DAAD EPOS Scholarships",
    provider: "German Academic Exchange Service (DAAD)",
    country: "Germany",
    region: "Europe",
    level: "Masters, PhD",
    fundingType: "Fully Funded",
    amount: "€934–€1,300/month + travel + insurance",
    deadline: "2027-08-31",
    description:
      "DAAD's Development-Related Postgraduate Courses (EPOS) fund master's and PhD study in Germany for professionals from developing countries, with a focus on development, public policy, engineering, health, and the environment.",
    eligibility:
      "Hold a bachelor's degree (usually no older than six years); have at least two years of relevant professional experience; be a citizen of a developing country; meet the language requirements of your chosen course.",
    benefits:
      "Monthly payments of €934 (master's) or €1,300 (PhD); travel allowance; health and liability insurance; rent and family supplements where applicable; and a free German language course in some cases.",
    howToApply:
      "Apply directly to your chosen EPOS course, following its specific deadline — many close between August and October. Submit academic transcripts, a CV, a motivation letter, and employer references.",
    field: "Development, Engineering, Health, Environment",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    officialUrl: "https://www.daad.de/en/",
    featured: true,
  },
  {
    id: "erasmus-mundus-2027",
    slug: "erasmus-mundus-joint-masters-europe",
    title: "Erasmus Mundus Joint Masters",
    provider: "European Commission",
    country: "Multiple — Europe",
    region: "Europe",
    level: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition + €1,400/month",
    deadline: "2027-01-15",
    description:
      "Erasmus Mundus Joint Masters are prestigious, integrated master's programmes delivered by consortia of universities in at least two European countries. Scholars study in multiple countries and graduate with a joint or multiple degree.",
    eligibility:
      "Hold a bachelor's degree (or be in your final year); meet the academic and language requirements of the specific consortium; apply directly to the programme — each consortium sets its own deadline, usually December to January.",
    benefits:
      "Full tuition; a monthly contribution of €1,400 for up to 24 months; travel and visa costs; and the chance to live and study in two or more European countries.",
    howToApply:
      "Browse the Erasmus Mundus catalogue, choose a programme, and apply on the consortium's own website. You can apply to up to three programmes per year.",
    field: "All fields",
    applicationUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters",
    officialUrl: "https://erasmus-plus.ec.europa.eu/",
    featured: false,
  },
  {
    id: "australia-awards-2027",
    slug: "australia-awards-scholarships",
    title: "Australia Awards Scholarships",
    provider: "Australian Government (DFAT)",
    country: "Australia",
    region: "Oceania",
    level: "Undergraduate, Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition + living allowance + airfare",
    deadline: "2027-04-30",
    description:
      "Australia Awards fund undergraduate and postgraduate study in Australia for students from partner countries, with the aim of building skills and leadership that scholars take home after graduation.",
    eligibility:
      "Be a citizen of a participating country; meet the minimum academic and English-language requirements; be at least 18; return home for two years after completing the award.",
    benefits:
      "Full tuition fees; a fortnightly living allowance; return airfare; establishment and health cover allowances; and an introductory academic programme.",
    howToApply:
      "Apply online through the Australia Awards portal or, in some countries, through the managing contractor. Check your country's opening and closing dates first.",
    field: "All fields",
    applicationUrl: "https://www.australiaawards.gov.au/",
    officialUrl: "https://www.australiaawards.gov.au/",
    featured: false,
  },
  {
    id: "mext-2027",
    slug: "mext-scholarship-japan",
    title: "MEXT Scholarship",
    provider: "Government of Japan (MEXT)",
    country: "Japan",
    region: "Asia",
    level: "Undergraduate, Masters, PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition + ¥117,000–¥145,000/month + airfare",
    deadline: "2027-05-20",
    description:
      "The MEXT scholarship funds undergraduate and graduate study in Japan for international students. Most applicants apply through the Japanese embassy in their home country (Embassy Recommendation); university recommendation is also available.",
    eligibility:
      "Meet the age and academic requirements for your level (undergraduate, master's, or doctoral); be in good health; be willing to study in Japanese or English depending on the programme; embassy deadlines vary by country.",
    benefits:
      "Full tuition; a monthly stipend (around ¥117,000 for undergraduates and ¥144,000–¥145,000 for graduate students); return airfare; and a preparatory Japanese language course in many cases.",
    howToApply:
      "Apply via the Japanese embassy or consulate in your country for Embassy Recommendation, or directly to a Japanese university for University Recommendation. Check the embassy site for local dates and documents.",
    field: "All fields",
    applicationUrl: "https://www.studyinjapan.go.jp/en/planning/scholarships/",
    officialUrl: "https://www.studyinjapan.go.jp/en/",
    featured: false,
  },
  {
    id: "gates-cambridge-2027",
    slug: "gates-cambridge-scholarships",
    title: "Gates Cambridge Scholarships",
    provider: "Gates Cambridge Trust, University of Cambridge",
    country: "United Kingdom",
    region: "Europe",
    level: "Masters, PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition + £21,000+/year maintenance",
    deadline: "2026-12-03",
    description:
      "Gates Cambridge awards full-cost scholarships to outstanding applicants from outside the UK for postgraduate study at the University of Cambridge, with a strong emphasis on leadership, service, and academic excellence.",
    eligibility:
      "Be a citizen of any country outside the UK; apply for a full-time postgraduate course at Cambridge; demonstrate outstanding academic ability, leadership potential, and a commitment to improving others' lives.",
    benefits:
      "University composition fee; a maintenance allowance (around £21,000 per year); return airfare; inbound visa costs; and discretionary funding for conferences and family support.",
    howToApply:
      "Apply for admission to Cambridge via the Graduate Application Portal and complete the Gates Cambridge section of the funding application. U.S. applicants have an earlier deadline than other international applicants.",
    field: "All fields",
    applicationUrl: "https://www.gatescambridge.org/apply/",
    officialUrl: "https://www.gatescambridge.org/",
    featured: false,
  },
  {
    id: "knight-hennessy-2027",
    slug: "knight-hennessy-scholars-stanford",
    title: "Knight-Hennessy Scholars",
    provider: "Stanford University",
    country: "United States",
    region: "North America",
    level: "Masters, PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition + living stipend + travel",
    deadline: "2027-10-07",
    description:
      "Knight-Hennessy funds graduate study at Stanford for a diverse cohort of scholars, combining a full degree programme with a leadership development programme and a global community of peers.",
    eligibility:
      "Apply to, and be accepted by, a full-time Stanford graduate programme; hold a bachelor's degree earned in 2019 or later (for the 2027 cycle); demonstrate independence of thought, purposeful leadership, and a civic mindset.",
    benefits:
      "Full tuition and fees; a living stipend; a travel stipend; and funding for academic enrichment. Scholars join a dedicated leadership programme during their time at Stanford.",
    howToApply:
      "Apply separately to Knight-Hennessy and to your Stanford graduate programme, by their respective deadlines. Shortlisted candidates are invited to an immersion weekend.",
    field: "All fields",
    applicationUrl: "https://knight-hennessy.stanford.edu/admission",
    officialUrl: "https://knight-hennessy.stanford.edu/",
    featured: false,
  },
  {
    id: "pearson-toronto-2027",
    slug: "lester-b-pearson-scholarship-toronto",
    title: "Lester B. Pearson International Scholarship",
    provider: "University of Toronto",
    country: "Canada",
    region: "North America",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Full tuition + books + residence + incidentals",
    deadline: "2027-01-15",
    description:
      "The Lester B. Pearson Scholarship is the University of Toronto's most prestigious award for international students, recognising exceptional academic achievement, creativity, and leadership in school and community.",
    eligibility:
      "Be an international student in your final year of secondary school (or graduated no earlier than June 2026); be nominated by your school; apply to the University of Toronto as your first choice.",
    benefits:
      "Full tuition; books; incidental fees; and full residence support for four years of undergraduate study.",
    howToApply:
      "Get nominated by your school, apply to U of T through OUAC, then complete the online Pearson scholarship application once you receive the link. About 37 scholarships are awarded each year.",
    field: "All fields",
    applicationUrl: "https://future.utoronto.ca/pearson/about/",
    officialUrl: "https://future.utoronto.ca/pearson/",
    featured: false,
  },
  {
    id: "swedish-institute-2027",
    slug: "swedish-institute-scholarship-masters",
    title: "SI Scholarship for Global Professionals",
    provider: "Swedish Institute",
    country: "Sweden",
    region: "Europe",
    level: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition + SEK 11,000/month + travel grant",
    deadline: "2027-02-28",
    description:
      "The Swedish Institute Scholarship funds master's study in Sweden for global professionals from selected countries, combining a world-class degree with a leadership network and a focus on sustainable development.",
    eligibility:
      "Be a citizen of an eligible country; have at least 3,000 hours of work experience; apply to an eligible master's programme at universityadmissions.se; demonstrate leadership experience.",
    benefits:
      "Full tuition; a monthly stipend of SEK 11,000; a travel grant; insurance; and membership of the SI Network for Future Global Professionals.",
    howToApply:
      "Apply to master's programmes first, then apply to the SI Scholarship in the February window, submitting your CV, references, motivation, and proof of leadership and work experience.",
    field: "All fields",
    applicationUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    officialUrl: "https://si.se/en/",
    featured: false,
  },
  {
    id: "commonwealth-shared-2027",
    slug: "commonwealth-shared-scholarships-uk",
    title: "Commonwealth Shared Scholarships",
    provider: "Commonwealth Scholarship Commission (UK)",
    country: "United Kingdom",
    region: "Europe",
    level: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition + stipend + airfare",
    deadline: "2026-12-12",
    description:
      "Commonwealth Shared Scholarships fund master's study in the UK for candidates from least developed and lower-middle-income Commonwealth countries, on courses jointly supported by UK universities, with a development focus.",
    eligibility:
      "Be a citizen of an eligible Commonwealth country; hold a first degree of at least upper second-class (2:1) standard; be unable to afford study in the UK without the scholarship; apply to an eligible course.",
    benefits:
      "Approved tuition fees; a monthly stipend; a thesis grant; return airfare; and a warm-clothing allowance where applicable.",
    howToApply:
      "Apply through the Commonwealth Scholarship Commission's online system, selecting a Shared Scholarship course. Apply for admission to the university separately.",
    field: "Development-related fields",
    applicationUrl: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/",
    officialUrl: "https://cscuk.fcdo.gov.uk/",
    featured: false,
  },
  {
    id: "swiss-excellence-2027",
    slug: "swiss-government-excellence-scholarships",
    title: "Swiss Government Excellence Scholarships",
    provider: "Swiss Government (FCS)",
    country: "Switzerland",
    region: "Europe",
    level: "Masters, PhD",
    fundingType: "Fully Funded",
    amount: "CHF 1,920–3,500/month + tuition waiver",
    deadline: "2027-11-30",
    description:
      "The Swiss Government Excellence Scholarships fund research fellowships, PhD study, and postdoctoral research in Switzerland for international students from over 180 countries.",
    eligibility:
      "Hold a master's degree (for a PhD) or a PhD (for postdoctoral research); have a research proposal and a host supervisor at a Swiss university; be under the age limit for your scholarship type; apply via the Swiss embassy.",
    benefits:
      "A monthly payment of CHF 1,920 (PhD) or CHF 3,500 (postdoc); a tuition fee exemption in most cases; health insurance; a housing allowance; and a return airfare allowance.",
    howToApply:
      "Find a supervisor and research project, prepare your proposal with them, and submit the full application package to the Swiss diplomatic representation in your country by its local deadline.",
    field: "All fields",
    applicationUrl: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    officialUrl: "https://www.sbfi.admin.ch/",
    featured: false,
  },
];

export const REGIONS = ["Europe", "North America", "Asia", "Oceania"];
export const LEVELS = ["Undergraduate", "Masters", "PhD"];
