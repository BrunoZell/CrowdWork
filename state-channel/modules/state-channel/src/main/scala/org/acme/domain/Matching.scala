package org.acme.domain


// Everybody can crawl through projects, builders, and investors and recommend a match.
// It needs to come with a proof:
// for projects-builders: Skills of builder must be conceptually close to one or more open positons of the project
// for projects-investors: Interests of investor must be conceptually close to the value propositon of the project

case class ProjectBuilderMatchProposal(builderWalletAddress: String, projectId: String, proposerWalletAddress: String, closeness: Long, proof: String)
case class ProjectInvestorMatchProposal(investorWalletAddress: String, projectId: String, proposerWalletAddress: String, closeness: Long, proof: String)
