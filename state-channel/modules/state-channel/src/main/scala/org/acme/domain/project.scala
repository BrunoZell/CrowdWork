package org.acme.domain

// Request sent and signed by the project creator to list a new project
case class CreateProject(
  id: String,
  creatorWalletAddress: String,
  name: String,
  description: String,
  openPositions: Array[OpenPosition]
)

trait OpenPosition
case class ContractDeveloperPosition() extends OpenPosition
case class MarketingPosition() extends OpenPosition
case class DesignerPosition() extends OpenPosition

// (most recent) state snapshot representing a single project
case class ProjectSnapshot(
  id: String,
  creatorWalletAddress: String,
  name: String,
  description: String,
  openPositions: Array[OpenPosition]
)
