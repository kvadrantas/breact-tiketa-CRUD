import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, confirmDelete}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    const stock = (a) => {
        if(a === 1) {
            return 'yes';
        } else {
            return 'no';
        }
    }

    return (
        <div className="main-list-item">
            {/* <i className="fas fa-pencil-alt edit" onClick={showEdit}></i> */}
            {/* <i className="far fa-trash-alt delete" onClick={() => confirmDelete(item.id)}></i> */}
    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.renginys}</span>
                <span><span className="field-names">Kaina: </span>{item.kaina}</span>
                <span><span className="field-names">Data: </span>{moment.tz(item.data, "Europe/Vilnius").format('YYYY-MM-DD')}</span>
                <span><span className="field-names">Laikas: </span>{item.laikas}</span>
                {/* <span><span className="field-names">Total value: </span>{item.laikas * item.data}</span> */}
                <span><span className="field-names">Kur vyksta: </span>{item.renginioadresas}</span>
                <span><span className="field-names">Vietos tipas: </span>{item.vietostipas}  </span>
                <span><span className="field-names">Vietos nr: </span>{item.vietosnr}</span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => confirmDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 