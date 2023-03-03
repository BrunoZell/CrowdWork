package org.acme.domain

// Everybody can crawl through projects, builders, and investors and recommend a match.
// It needs to come with a proof that the closeness was indeed determined by a well-defined algorithm with the project + builder/investor used as an input
    
// for projects-builders: Skills of builder must be conceptually close to one or more open positons of the project
case class ProjectBuilderMatchProposal(builderWalletAddress: String, projectId: String, proposerWalletAddress: String, closeness: Long, proof: String)

// for projects-investors: Interests of investor must be conceptually close to the value propositon of the project
case class ProjectInvestorMatchProposal(investorWalletAddress: String, projectId: String, proposerWalletAddress: String, closeness: Long, proof: String)
