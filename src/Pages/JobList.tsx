import React from 'react'
import { differenceInDays } from 'date-fns'
import './sass/JobList.sass'
const JobList = ({ Data, setJobId }: any) => {
  return (
    <div className="ContainerJobList">
      {Data?.results &&
        Data.results.map((job: any) => {
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
                  {job.compensation.data.currency} {job.compensation.data.minAmount}-{job.compensation.data.maxAmount}/
                  {job.compensation.data.periodicity}
                </div>
              )}
              <div className="Job__Footer">
                <div className="Job__Footer__Days">{Dias > 0 && <h3>Cierra en {Dias} días</h3>}</div>
                <div className="Job__Footer__Apply">
                  {/* <button className="btn blue">Apply for the Job</button> */}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default JobList
