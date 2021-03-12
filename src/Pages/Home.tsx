// import React from 'react'
// import Button from '../Components/Button'
import { useEffect, useState } from 'react'
// import { useStore } from 'react-redux'
import { RootState } from '../Redux/store'
import useFetch from '../GlobalFiles/useFetch'
import { differenceInDays } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { SaveCustomFilter, DeleteCustomFilter } from '../Redux/CustomFiltersDuck'
import { useHistory } from 'react-router-dom'
import { produce } from 'immer'
import CheckBox from '../Components/CheckBox'
import Filter from '../Components/Filter'
import './sass/Home.sass'
import { IconEquis, IconDelete } from '../GlobalFiles/Icons'

const Home = () => {
  const dispatch = useDispatch()
  const StoreCustomFilters = useSelector((state: RootState) => state.customFilters)
  const [filtersOpen, setFiltersOpen] = useState(true)

  interface Props {
    status: any[]
    type: any[]
    remote: any[]
    compensationrange: any[]
    skill: any[]
  }

  const [filters, setFilters] = useState<any>({
    status: [],
    type: [],
    remote: [],
    compensationrange: [],
    skill: [],
  })
  const [haveChange, setHaveChange] = useState(false)
  const [page] = useState(0)
  const [responseGet, invokeGet] = useFetch(
    'https://search.torre.co/',
    `opportunities/_search?currency=USD%24&page=${page}&periodicity=hourly&lang=en&size=10&aggregate=true&offset=0`,
    () => {
      let data: any = {}

      let checkedStatus = filters.status.filter((i: any) => i.checked)
      let checkedType = filters.type.filter((i: any) => i.checked)
      let checkedCompensarionRange = filters.compensationrange.filter((i: any) => i.checked)
      let checkedSkill = filters.skill.filter((i: any) => i.checked)

      if (checkedStatus.length > 0) {
        data.status = { code: checkedStatus[0].value }
      }

      if (checkedType.length > 0) {
        data.type = { code: checkedType[0].value }
      }

      if (checkedCompensarionRange.length > 0) {
        let valor = checkedCompensarionRange[0].value
        let last = valor.indexOf('/')
        let minAmount = parseInt(valor.slice(5, last).split('-')[0])
        let maxAmount = parseInt(valor.slice(5, last).split('-')[1])
        data.compensationrange = { minAmount, maxAmount, currency: 'USD$', periodicity: 'hourly' }
      }

      if (checkedSkill.length > 0) {
        data.skill = { term: checkedSkill[0].value, experience: 'potential-to-develop' }
      }

      data = [
        { type: data.type },
        { status: data.status },
        { compensationrange: data.compensationrange },
        { skill: data.skill },
      ]
      return { and: data }
    },
    'POST',
    () => {
      if (filters.status.length === 0) {
        setFilters({
          status: responseGet.data.aggregators.status,
          type: responseGet.data.aggregators.type,
          remote: responseGet.data.aggregators.remote,
          compensationrange: responseGet.data.aggregators.compensationrange,
          skill: responseGet.data.aggregators.skill,
        })
      }
    },
  )

  const Sum_status = filters.status.filter((item: any) => item.checked).length
  const Sum_type = filters.type.filter((item: any) => item.checked).length
  //  const Sum_remote = filters.remote.filter((item: any) => item.checked).length
  const Sum_compensationrange = filters.compensationrange.filter((item: any) => item.checked).length
  const Sum_skill = filters.skill.filter((item: any) => item.checked).length

  useEffect(() => {
    invokeGet()
  }, [])

  const handleChangeFilter = (filter: any, index: any, value: any) => {
    setHaveChange(true)
    let newFilters = produce(filters, (drafFilters: any) => {
      drafFilters[filter][index].checked = value
    })
    setFilters(newFilters)
  }

  const saveCustomFilter = () => {
    if (StoreCustomFilters.length > 2) {
      alert('Sorry, you only can save 3 custom filters, please delete')
      return
    }
    let name: any = prompt('Please enter a filter name', 'Filter Name')
    const customFilter = {
      name: name?.toString(),
      status: filters.status.filter((item: any) => item.checked),
      type: filters.type.filter((item: any) => item.checked),
      compensationrange: filters.compensationrange.filter((item: any) => item.checked),
      skill: filters.skill.filter((item: any) => item.checked),
    }
    console.log(customFilter)
    dispatch(SaveCustomFilter(customFilter))
  }

  const setCustomFilter = (index: any) => {
    let newFilters = produce(filters, (drafFilters: any) => {
      drafFilters.status = drafFilters.status.map((item: any) => ({
        ...item,
        checked: StoreCustomFilters[index].status.map((i: any) => i.value).includes(item.value),
      }))
      drafFilters.type = drafFilters.type.map((item: any) => ({
        ...item,
        checked: StoreCustomFilters[index].type.map((i: any) => i.value).includes(item.value),
      }))
      drafFilters.compensationrange = drafFilters.compensationrange.map((item: any) => ({
        ...item,
        checked: StoreCustomFilters[index].compensationrange.map((i: any) => i.value).includes(item.value),
      }))
      drafFilters.skill = drafFilters.skill.map((item: any) => ({
        ...item,
        checked: StoreCustomFilters[index].skill.map((i: any) => i.value).includes(item.value),
      }))
    })
    setFilters(newFilters)
  }
  return (
    <div className="ContainerJobSearch">
      <div className={`ModalFilters ${filtersOpen ? 'show' : 'hide'}`}>
        <div className="Container">
          <div className="MF__Title">
            <h3>Filters</h3>
          </div>
          <div className="MF__Close" onClick={() => setFiltersOpen(!filtersOpen)}>
            <IconEquis />
          </div>
          {StoreCustomFilters.length > 0 && (
            <div className="MF__CustomFilters">
              <div className="title">Custom Filters: </div>
              {StoreCustomFilters.map((customfilter: any, index: any) => (
                <div className="item">
                  <div className="item_text" onClick={() => setCustomFilter(index)}>
                    {customfilter.name}
                  </div>
                  <div
                    className="item_delete "
                    title="Delete custom filter"
                    onClick={() => dispatch(DeleteCustomFilter(index))}
                  >
                    <IconDelete />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="MF__AllFilters">
            <Filter
              title="Status"
              filterType="status"
              filters={filters.status}
              handleChangeFilter={handleChangeFilter}
            />
            <Filter title="Job Type" filterType="type" filters={filters.type} handleChangeFilter={handleChangeFilter} />
            <Filter
              title="Compensation"
              filterType="compensationrange"
              filters={filters.compensationrange}
              handleChangeFilter={handleChangeFilter}
            />
            <Filter title="Skills" filterType="skill" filters={filters.skill} handleChangeFilter={handleChangeFilter} />
          </div>
          <div className="MF__Footer">
            <button className="btn purple" onClick={() => saveCustomFilter()}>
              Save Custom Filter
            </button>
            <button
              className="btn purple"
              onClick={() => {
                setFiltersOpen(!filtersOpen)
                invokeGet()
              }}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
      <div className="Filters">
        {/* <div className='Left'>

        </div> */}
        <div className="Filters__Text">
          <input type="text" placeholder="Keywords" />
        </div>
        <div className="Filters__Summary">
          <h4 className="title">Filters: </h4>
          {Sum_status === 0 ? (
            <h5 className="empty">Status</h5>
          ) : (
            <h5 className="fill">
              <span>
                <p>{Sum_status}</p>
              </span>
              Status
            </h5>
          )}
          {Sum_type === 0 ? (
            <h5 className="empty">Job Type</h5>
          ) : (
            <h5 className="fill">
              <span>{Sum_type}</span> Job Type
            </h5>
          )}
          {Sum_compensationrange === 0 ? (
            <h5 className="empty">Compensation</h5>
          ) : (
            <h5 className="fill">
              <span>{Sum_compensationrange}</span> Compensation
            </h5>
          )}
          {Sum_skill === 0 ? (
            <h5 className="empty">Skills</h5>
          ) : (
            <h5 className="fill">
              <span>{Sum_skill}</span> Skills
            </h5>
          )}
          <div className="abrirfiltros">
            {haveChange && (
              <button className="btn purple" onClick={() => invokeGet()}>
                Find Jobs
              </button>
            )}
            <button className="btn purple" onClick={() => setFiltersOpen(!filtersOpen)}>
              Filters
            </button>
          </div>
        </div>
      </div>
      <div className="Jobs">
        {responseGet.data?.results &&
          responseGet.data.results.map((job: any) => {
            let Dias = differenceInDays(new Date(job.deadline), new Date())
            return (
              <div className="Job" key={job.id}>
                <div className="Job__Title">
                  <h3>{job.objective}</h3>
                  {job.remote && <span className="Job__Remote">🌎 Remote</span>}
                </div>
                <h4 className="Job__Type">{job.type}</h4>

                {job.compensation.visible && (
                  <div className="Job__Compensation">
                    {job.compensation.data.currency} {job.compensation.data.minAmount}-{job.compensation.data.maxAmount}
                    /{job.compensation.data.periodicity}
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
      <div className="Pagination"></div>
    </div>
    // <ResponsiveForm onSubmit={HandleSubmit}>
    //   <div className="ContainerHome">
    //     <div className="Logo">
    //       <div className="Logo__image">
    //         <IconQuizApp />
    //       </div>
    //       <h1>QuizApp</h1>
    //     </div>
    //     <div className="welcome">
    //       <h2>Welcome</h2>
    //       <p>You will be presented with 10 True or False questions</p>
    //       <p className="question">Can you score 100%?</p>
    //     </div>
    //     <div className="button">
    //       <Button text="Begin" onClick={responseGet} loading={response.loading} />
    //     </div>
    //   </div>
    // </ResponsiveForm>
  )
}
export default Home
