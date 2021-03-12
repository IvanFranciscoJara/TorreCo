import React from 'react'
import { differenceInDays } from 'date-fns'
import './sass/JobList.sass'
const JobList = ({ Data, setJobId }: { Data: { results: [] }; setJobId: (jobId: string) => void }) => {
  return (
    <div className="ContainerJobList">
      {Data?.results &&
        Data.results.map(
          (job: {
            id: string
            deadline: string
            objective: string
            remote: boolean
            compensation: {
              visible: boolean
              data: { currency: string; minAmount: string; maxAmount: string; periodicity: string }
            }
            type: any
          }) => {
            let Dias = differenceInDays(new Date(job.deadline), new Date())
            return (
              <div className="Job" key={job.id} onClick={() => setJobId(job.id)}>
                <div className="Job__Title">
                  <h3>{job.objective}</h3>
                  {job.remote && <span className="Job__Remote">🌎 Remote</span>}
                </div>
                <h4 className="Job__Type">{job.type}</h4>

                {job.compensation?.visible && (
                  <div className="Job__Compensation">
                    {job.compensation.data.currency} {job.compensation.data.minAmount}-{job.compensation.data.maxAmount}
                    /{job.compensation.data.periodicity}
                  </div>
                )}
                <div className="Job__Footer">
                  <div className="Job__Footer__Days">{Dias > 0 && <h3>Close in {Dias} days</h3>}</div>
                  <div className="Job__Footer__Apply"></div>
                </div>
              </div>
            )
          },
        )}
    </div>
  )
}

export default JobList
