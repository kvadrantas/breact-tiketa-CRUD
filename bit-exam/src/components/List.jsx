import Item from "./Item";

function List({items, setShowModal, setModalItem, confirmDelete}) {
    return (
        <div className="main-list">
            <div className="tbl-header">
                <div className="main-list-item-stats">
                    <span>Renginys</span>
                    <span>Kaina</span>
                    <span>Data</span>
                    <span>Laikas</span>
                    <span>Kur vyksta</span>
                    <span>Vietos tipas</span>
                    <span>Vietos nr</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {items.map(item => <Item key={item.id} item={item} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></Item>)}
        </div>
    )
}

export default List; 