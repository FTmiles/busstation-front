import { useState } from 'react';
import { faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePick from './DatePick';

export default function StaticDates({rule, selectedRule, handleChange, handleAddNewDate, handleDeleteDate, validationOn}){

 
    return(
        <div>
        <div className="input-group mb-3">
            <span className="input-group-text fs-4" id="basic-addon1">Name:</span>
            <input type="text" 
            className={`form-control fs-4" ${validationOn && !rule.periodName ? "my-valid-border" : ""} `}
            placeholder="Rule name..." aria-label="Rule name..." aria-describedby="basic-addon1" 
            defaultValue={rule.periodName}  key={rule.id}
            onChange={(e) => handleChange(e.target.value, [], "periodName", 100)}
            />
        </div>

    
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th><th>Date range</th>
                </tr>
            </thead>
            <tbody>
              {
                rule.timePeriods.map((dateRange, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td className='d-flex gap-5'>
                            <div className={`flex-grow-1'  ${validationOn && (!dateRange.startMonth || !dateRange.startDay || !dateRange.endMonth || !dateRange.endDay) ? "my-valid-border" : ""}`}
                            style={{maxWidth:"240px"}} >
                                <DatePick dateRange={dateRange} handleChange={handleChange} index={i} />
                            </div>
                            <button className='btn' onClick={() => handleDeleteDate(dateRange)}><FontAwesomeIcon icon={faTrashCan} /> </button>
                        </td>
                    </tr>
                ))
              }
              <tr>
                <td colSpan={2}>
                    <button className='btn' onClick={handleAddNewDate}><FontAwesomeIcon icon={faPlus} /> new</button>
                </td>
              </tr>
            </tbody>
        </table>
    </div>
    )
}