export interface Protocol {
  protocolID: string;
  protocolName: string;
  protocolCategory:string;
  protocolDescription: string;
  protocolInstructions: string;
  protocolImageID: string;
  protocolLinkedBenefits: string[];
  protocolSearchTerms: string[];
  protocolCategories: string[];
  protocolRelativeTimeRating: number;
  protocolRelativeCostRating: number;
  protocolOverallImpactRating: number;

}

export interface Benefit {
  benefitID: string;
  benefitName: string; // Change from `name`
  benefitCategory:string;
  benefitDescription: string;
  benefitImageID: string; // Change from `imageId`
  benefitLinkedProtocols: string[];
  benefitSearchTerms: string[];
  benefitCategories: string[];
  
}

export interface ClaimSource {
  title: string;
  authors: string;
  publisher: string;
  year: number;
  url: string;
  summary: string;
}

export interface Claim {
  claimID: string;
  claimProtocolID: string;
  claimBenefitID: string;
  claimDescription: string;
  claimMechanisms: string;
  claimProtocolInstructions: string;
  claimImpactRating: number;
  claimImpactRatingDescription: string;
  claimMaturityRating: number;
  claimMaturityRatingDescription: string;
  claimConsensusRating: number;
  claimConsensusRatingDescription: string;
  claimOverallEvidenceRating: number;
  claimOverallEvidenceRatingDescription: string;
  claimEasyWinRating: number;
  claimSources: ClaimSource[];
}
