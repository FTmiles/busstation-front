import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ReadOnlyRow({ row, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.coords}</td>
      <td>
        <div className="form-check form-switch">
          <input type="checkbox" checked={row.defaultOption} className='form-check-input secondary' 
          readOnly />
        </div>
      </td>
      <td>
        <span className="table-action-td">
        <FontAwesomeIcon className='btn btn-sm' icon={faPencil} onClick={()=>handleEditClick(row)} />
        <FontAwesomeIcon className='btn btn-sm' icon={faTrashCan} onClick={()=>handleDeleteClick(row)} />
        </span>
      </td>
    </tr>
  );
}
