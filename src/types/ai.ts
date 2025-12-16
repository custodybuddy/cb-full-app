export type Persona = 'Strategic Advisor' | 'Strict but Fair' | 'Empathetic Listener';

export type ToneOption =
  | "BIFF"
  | "Grey Rock"
  | "Friendly Assertive"
  | "Professional (for Lawyers)"
  | "Passive (not recommended)"
  | "Passive-Aggressive (not recommended)"
  | "Aggressive (not recommended)";

export interface JargonItem {
  term: string;
  context: string;
}

export interface EmailAnalysis {
    tone: string;
    summary: string;
    key_demands: string[];
    legal_jargon: JargonItem[];
}
  
export interface EmailDrafts {
    biff: string;
    greyRock: string;
    friendlyAssertive: string;
}
  
export interface EmailBuddyResponse {
    analysis: EmailAnalysis;
    drafts: EmailDrafts;
}

export interface CaseAnalysisReport {
    documentTypes: { type: string; source: string; }[];
    summary: string;
    keyClauses: { clause: string; explanation: string; source: string; }[];
    discrepancies: { description: string; sources: string[]; }[];
    legalJargon: { term: string; explanation: string; }[];
    actionItems: { item: string; deadline?: string; source: string; }[];
    legalInsights?: string;
    suggestedNextSteps: string;
    strategicCommunication?: {
        recommendation: string;
        draftEmail: string;
    };
    disclaimer: string;
}

export type IncidentCategory = 
    | 'Communication Issue'
    | 'Schedule Violation'
    | 'Financial Dispute'
    | 'Child Safety Concern'
    | 'Parental Alienation'
    | 'Legal/Court Matter'
    | 'Other';

export interface IncidentData {
    narrative: string;
    jurisdiction: string;
    incidentDate: string;
    otherPartiesInvolved: string[];
    childrenPresent: string[];
    location: string;
}

export interface IncidentReport {
    title: string;
    category: IncidentCategory;
    severity: 'Low' | 'Medium' | 'High';
    severityJustification: string;
    professionalSummary: string;
    observedImpact: string;
    legalInsights: string;
    sources: string[];
}

export interface FalseAllegationResponse {
    rebuttals: {
        allegation_text: string;
        rebuttal_paragraph: string; // The court-appropriate rebuttal paragraph
        safeguard_flags?: {
            flag_type: 'emotional_explanation' | 'over_justification' | 'self_blame' | 'defensive_tone' | 'irrelevant_info';
            sentence_or_phrase: string;
            suggestion: string; // e.g., "This sentence explains feelings rather than facts."
        }[];
    }[];
    suggested_overall_next_steps: string; // Renamed for clarity
}

// Expanded, AI-ready incident taxonomy (court-relevant)
export type IncidentType =
    | 'BreachOfCourtOrder'
    | 'CancelledVisitations'
    | 'LateDropoff'
    | 'LatePickup'
    | 'WithholdingTheChild'
    | 'RefusalToReturnChild'
    | 'DeniedParentingTime'
    | 'MissedParentingTime'
    | 'LastMinuteScheduleChanges'
    | 'ChallengesDuringVisits'
    | 'ChildRefusalToVisit'
    | 'InterferenceWithCommunication'
    | 'ExcessiveMessaging'
    | 'HarassingCommunication'
    | 'InadequateCommunication'
    | 'DecisionMakingConflict'
    | 'MedicalDecisionConflict'
    | 'SchoolDecisionConflict'
    | 'ActivitySchedulingConflict'
    | 'ChildInvolvedInAdultDisputes'
    | 'InappropriateConversationsWithChild'
    | 'CoachingOrInfluencingChild'
    | 'AlienatingBehavior'
    | 'ConcernsOfSubstanceAbuse'
    | 'SuspectedImpairmentDuringParenting'
    | 'EmotionalHarm'
    | 'EmotionalOutbursts'
    | 'VerbalAggression'
    | 'ThreateningBehavior'
    | 'IntimidationOrControl'
    | 'PhysicalHarmConcerns'
    | 'UnsafeBehavior'
    | 'NeglectConcerns'
    | 'FailureToSupervise'
    | 'ExposureToConflict'
    | 'ExposureToInappropriateMedia'
    | 'DomesticViolenceExposure'
    | 'PostSeparationAbuse'
    | 'FinancialCoercion'
    | 'InterferenceWithSupportObligations'
    | 'LitigationAbuse'
    | 'OngoingLitigation'
    | 'RequestForRestrainingOrder'
    | 'PoliceWelfareCheck'
    | 'MedicalIncident'
    | 'InjuryDuringParentingTime'
    | 'MedicationNonCompliance'
    | 'FailureToProvideMedication'
    | 'ChallengesExchangingChild'
    | 'ExchangeLocationDisputes'
    | 'TransportationIssues'
    | 'SupervisedVisitIssues'
    | 'ReportsFromSchool'
    | 'ReportsFromDaycare'
    | 'TeacherCommunicationIssue'
    | 'CPSOrCASInvolvement'
    | 'ThirdPartyInterference'
    | 'NewPartnerBoundaryIssues'
    | 'ConcernsAboutHomeEnvironment'
    | 'ConcernsAboutHygiene'
    | 'InconsistentRoutines'
    | 'BedtimeOrSleepIssues'
    | 'HomeworkOrSchoolworkIssues'
    | 'MissedMedicalAppointments'
    | 'MissedTherapyAppointments'
    | 'MismanagementOfChildBelongings'
    | 'LossOrDamageOfItems'
    | 'FailureToShareInformation'
    | 'FailureToNotifyOfImportantEvents'
    | 'FailureToNotifyOfMedicalEvents'
    | 'FailureToNotifyOfSchoolIncidents'
    | 'ImplementationOfCourtOrder'
    | 'NonCooperationInCoparenting'
    | 'Gatekeeping'
    | 'ParentingTimeInterference'
    | 'ContemptuousBehavior'
    | 'HostileCoparentingCommunication'
    | 'SuccessfulCoparentingMoments'
    | 'PositiveParentingCooperation'
    | 'ScheduledMeeting'
    | 'OtherConcernsOrIssues'
    | 'InstancesOfPoorJudgment';
