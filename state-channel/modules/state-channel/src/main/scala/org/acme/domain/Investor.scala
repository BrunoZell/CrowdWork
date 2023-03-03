package org.acme.domain

// Request sent and signed by the investor to list create or update his profile
case class UpdateInvestorProfile(
  investorWalletAddress: String,
  name: String,
  bio: String,
  interests: Array[String],
  disinterests: Array[String]
)

// (most recent) snapshot of an investors profile
case class InvestorProfileSnapshot(
  investorWalletAddress: String,
  name: String,
  bio: String,
  interests: Array[String],
  disinterests: Array[String]
)
