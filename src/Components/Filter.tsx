import React from 'react'
import './sass/Filter.sass'
import CheckBox from './CheckBox'
interface Props {
  title: any
  filterType: any
  filters: any
  handleChangeFilter: any
}
const Filter: React.FC<Props> = ({ title, filterType, filters, handleChangeFilter }: Props) => {
  return (
    <div className="ContainerFilter">
      <div className="Content">
        <div className="filter_title">{title}</div>
        {filters.map((item: any, index: number) => (
          <div className="filter_item" onClick={() => handleChangeFilter(filterType, index, !item.checked)}>
            <div className="filter_item_checkbox">
              <CheckBox checked={!!item.checked} />
            </div>
            <div className="filter_item_text">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
