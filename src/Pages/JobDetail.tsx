import React from 'react'
import './sass/JobDetail.sass'
import { createBreakpoint } from 'react-use'
const useBreakpoint = createBreakpoint({ Desktop: 800, Mobile: 0 })
const JobDetail = ({
  JobData,
  Loading,
}: {
  JobData: {
    organizations: [{ picture: string; name: string }]
    objective: string
    compensation: { currency: string; minAmount: string; maxAmount: string; periodicity: string }
    details: [{ content: string }]
    strengths: []
    members: []
  }
  Loading: boolean
}) => {
  const breakpoint = useBreakpoint()
  return Loading ? (
    <div className="ContainerNoJobDataLoading">
      <div className="circle"></div>
    </div>
  ) : !JobData ? (
    <div className="ContainerNoJobData">
      <h1>Select a job from the left list to see details</h1>
      <img src="/Images/job-search.svg" />
    </div>
  ) : (
    <div className="ContainerJobDetail">
      <h1>{breakpoint}</h1>
      {JobData.organizations[0] && (
        <div className="Image">
          <img src={JobData.organizations[0]?.picture} />
          <h5>{JobData.organizations[0]?.name}</h5>
        </div>
      )}
      <div className="Title">{JobData.objective}</div>
      <div className="Salary">
        <div>
          {JobData.compensation.currency}
          {JobData.compensation.minAmount} - {JobData.compensation.maxAmount}/ {JobData.compensation.periodicity}
        </div>
      </div>
      <div className="Responsibilities">
        <h5 className="Responsibilities__Title">Requirements</h5>
        <h5 className="Responsibilities__Content">
          {JobData.details.find((it: any): boolean => it.code === 'requirements')?.content}
        </h5>
      </div>
      <div className="Responsibilities">
        <h5 className="Responsibilities__Title">Responsibilities</h5>
        <h5 className="Responsibilities__Content">
          {JobData.details.find((it: any): boolean => it.code === 'responsibilities')?.content}
        </h5>
      </div>

      <div className="Strengths">
        <h5 className="Strengths__Title">Skills</h5>
        {JobData.strengths.map((item: { name: string }) => (
          <div className="Strengths__item">{item.name}</div>
        ))}
      </div>
      <div className="Team">
        <h5 className="Team__Title">Team</h5>
        {JobData.members.map((item: { person: { picture: string; name: string; professionalHeadline: string } }) => (
          <div className="Team__item">
            <div className="left">
              <img src={item.person.picture} />
            </div>
            <div className="right">
              <h5>{item.person.name}</h5>
              <h6>{item.person.professionalHeadline}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobDetail
