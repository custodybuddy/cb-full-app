# CoParent Incident Documentation — AI-Powered Analysis System

This feature transforms user narratives into professional, legally cited reports. Below is the current flow and intent:

## Core Workflow
1) **User input** (wizard): date/time, narrative, people involved, jurisdiction, optional evidence.
2) **AI analysis (Gemini API)**:
   - Narrative transformation: remove emotional language; extract facts; detect patterns (isolation, intimidation, control); produce third-person summary.
   - Incident classification: map to 17+ types; assign severity; assess impact on child welfare.
   - Legal context: map to statutes per jurisdiction (Canada Divorce Act/Criminal Code + provincial acts; US UCCJEA + state coercive-control statutes); generate source URLs.
3) **Structured output**:
   - Professional summary with severity/type/behavioral patterns.
   - Legal classification with primary/secondary statutes and jurisdiction framework.
   - Supporting docs metadata; export-ready PDF.

## Jurisdiction Intelligence
- **Canada**: Divorce Act, Criminal Code, and all 13 provincial/territorial family-law acts.
- **US**: UCCJEA and coercive-control statutes in CA/CT/HI/WA/CO, plus general child-welfare references.

## Example Transformation
- Input: “My ex wouldn’t let me call the kids last night and said I’d regret it if I told anyone.”
- Output: Communication restriction & implied threats; Severity: Medium; Type: CommunicationChallenges; summary highlights isolation/intimidation; cites Divorce Act s.2(1), s.16(4), Criminal Code s.423, CLRA s.24 (ON).

## Technical Notes
- Jurisdiction auto-switching for statutes.
- Markdown-to-PDF pipeline for clean exports.
- Statute lookup utility for fast retrieval.
- Type-safe TypeScript interfaces for incident types.
