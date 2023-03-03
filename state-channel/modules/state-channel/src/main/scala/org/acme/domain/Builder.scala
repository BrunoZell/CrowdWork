package org.acme.domain

trait Experience
case class UpToOneYear() extends Experience
case class OneToTwoYears() extends Experience
case class TwoToFiveYears() extends  Experience
case class FiveAndMoreYears() extends Experience

case class Skill(skill: String, experience: Experience, interest: Integer)

// Request sent and signed by the builder to list create or update his profile
case class UpdateBuilderProfile(
  builderWalletAddress: String,
  name: String,
  bio: String,
  skillset: Array[Skill]
)

// (most recent) snapshot of a builders profile
case class BuilderProfileSnapshot(
  builderWalletAddress: String,
  name: String,
  bio: String,
  skillset: Array[Skill]
)
