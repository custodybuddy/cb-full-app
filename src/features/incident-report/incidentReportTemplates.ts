export interface IncidentReportTemplate {
    jurisdiction: string;
    label: string;
    template: string;
}

/**
 * Incident-Report Output Template (Canada / Ontario)
 * Provides a jurisdiction-specific scaffold with statute references and placeholders.
 */
export const INCIDENT_REPORT_TEMPLATES: Record<string, IncidentReportTemplate> = {
    'canada-ontario': {
        jurisdiction: 'Ontario, Canada',
        label: 'Incident-Report Output Template (Canada / Ontario)',
        template: `Title: [IncidentCategory]
Date: [Date] — Time: [Time]
Severity: [High | Medium | Low]

Professional Narrative Summary

On [Month Day, Year] at approximately [Time], a [SeverityType] severity incident occurred involving [IncidentCategory]. During this event, the respondent engaged in behaviour that restricted the reporter’s ability to maintain normal communication with family and support networks. The respondent also used threatening or pressuring language implying consequences if the reporter attempted to reach out to others. These actions caused emotional distress, compromised the reporter’s sense of safety, and contributed to an escalating pattern of control within the co-parenting relationship.

The conduct described demonstrates a combination of isolation and intimidation, both of which are recognized indicators of coercive and controlling behaviour. The pattern suggests an attempt to dominate the reporter’s decision-making and movements, adversely affecting their psychological well-being and reinforcing a significant power imbalance in the parenting environment.

Legal Classification & Statutory References

This behaviour reflects isolation and intimidation, which fall under the legal definition of Family Violence under Divorce Act s. 2(1) (includes coercive & controlling behaviour):
→ https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-1.html#h-1172378

It is also a key consideration in the Best Interests of the Child assessment under Divorce Act s. 16(4) (family violence factors):
→ https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-3.html#h-1172571

Additional Applicable Statutes (Ontario)

Ontario Children’s Law Reform Act — s. 24 (Best Interests of the Child)
https://www.ontario.ca/laws/statute/90c12#BK9

Criminal Code — Intimidation (s. 423)
https://laws-lois.justice.gc.ca/eng/acts/c-46/section-423.html`,
    },
    'canada-general': {
        jurisdiction: 'Canada (Auto-Jurisdiction Switching)',
        label: '🇨🇦 General Canadian Template (Auto-Jurisdiction Switching)',
        template: `Title: [IncidentCategory]
Date: [Date] — Time: [Time]
Severity: [High | Medium | Low]

On [Month Day, Year] at approximately [Time], a [Severity] severity incident occurred involving [IncidentCategory]. The respondent’s conduct included [AI-detected behaviours], which caused emotional harm and contributed to a pattern of coercive or controlling behaviour. These actions negatively impacted the reporter’s sense of safety and stability within the co-parenting environment.

The described actions demonstrate [BehaviourTypes], which fall under the federal definition of Family Violence in the Divorce Act s. 2(1) (includes coercive & controlling behaviour):
→ https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-1.html#h-1172378

This behaviour is also relevant to the Best Interests of the Child considerations under Divorce Act s. 16(4):
→ https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-3.html#h-1172571

Additional Statutes ([Province/Territory])

[Provincial/Territorial Family Law Act Link]
[Best Interests Section Link, if applicable]
Criminal Code — Relevant Offence (e.g., Intimidation s. 423)
https://laws-lois.justice.gc.ca/eng/acts/c-46/section-423.html

🇨🇦 Province/Territory-Specific Statute Inserts

Use these in the section:

Additional Statutes (Ontario)
Ontario Children’s Law Reform Act — s. 24 (Best Interests)
https…

✔ Ontario

CLRA s.24
https://www.ontario.ca/laws/statute/90c12#BK9

FLA (parenting/property)
https://www.ontario.ca/laws/statute/90f03

✔ British Columbia

Family Law Act
https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_01

Best Interests (s. 37)
https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_03#section37

✔ Alberta

Family Law Act
https://kings-printer.alberta.ca/documents/Acts/F04P5.pdf

✔ Saskatchewan

Children’s Law Act, 2020
https://publications.saskatchewan.ca/#/products/10048

✔ Manitoba

Family Maintenance Act
https://web2.gov.mb.ca/laws/statutes/ccsm/f020e.php

✔ Quebec

Civil Code of Quebec (custody articles)
https://ccq.lexum.com/ccq/en

✔ Nova Scotia

Parenting & Support Act
https://nslegislature.ca/sites/default/files/legc/statutes/parenting.pdf

✔ New Brunswick

Family Services Act
https://laws.gnb.ca/en/showfulldoc/cs/F-2.2

✔ Newfoundland & Labrador

Family Law Act
https://www.assembly.nl.ca/legislation/sr/statutes/f02.htm

✔ Prince Edward Island

Family Law Act
https://www.princeedwardisland.ca/en/legislation/shares/family-law-act

✔ Territories

Yukon – Children’s Act
https://laws.yukon.ca/cms/images/LEGISLATION/PRINCIPAL/2002/2002-006/2002-006.pdf

Northwest Territories – Child & Family Services
https://www.justice.gov.nt.ca/en/files/legislation/child-and-family-services/child-and-family-services.a.pdf

Nunavut – Family Law Act
https://www.nunavutlegislation.ca/en/legislation/family-law-act`,
    },
    'markdown-pdf': {
        jurisdiction: 'Generic (Markdown-to-PDF)',
        label: 'Markdown-to-PDF Generator Template',
        template: `# **[IncidentCategory]**
**Date:** [Date]  
**Time:** [Time]  
**Severity:** [High | Medium | Low]

---

## **Summary**

[AI narrative paragraphs here.]

---

## **Legal Classification & Statutory References**

- **Divorce Act s.2(1) — Family Violence**  
  https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-1.html#h-1172378  

- **Divorce Act s.16(4) — Best Interests (Family Violence Factors)**  
  https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-3.html#h-1172571  

### **Additional Statutes — [Province/State]**
- [Statute Name]  
  [Statute Link]  

- Criminal Code — Intimidation (s. 423)  
  https://laws-lois.justice.gc.ca/eng/acts/c-46/section-423.html  

---

## **Notes**
Generated using the CustodyBuddy Incident Documentation System.  
This summary provides statutory references for context and does not constitute legal advice.`,
    },
};

export const getIncidentReportTemplate = (key: string): IncidentReportTemplate | undefined =>
    INCIDENT_REPORT_TEMPLATES[key.toLowerCase()];
