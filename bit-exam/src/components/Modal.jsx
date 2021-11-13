import { useEffect, useState } from "react";
import isValidf from "../js/isValidf";
// import moment from "moment-timezone";


function Modal({edit, confirmDelete, modalItem, showModal, setShowModal, kainas, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({        
        renginys: '',
        kaina: '',
        data: '',
        laikas: '',
        renginioadresas: '',
        vietostipas: '',
        vietosnr: '',
    });

    useEffect(() => {
        setInputs({
            renginys: modalItem.renginys,
            kaina: modalItem.kaina,
            data: modalItem.data,
            laikas: modalItem.laikas,
            renginioadresas: modalItem.renginioadresas,
            vietostipas: modalItem.vietostipas,
            vietosnr: modalItem.vietosnr,
        })
        if(modalItem.vietosnr) {
            const radioCopy = [false, false, false];
            radioCopy[modalItem.vietosnr - 1] = true;
            setRadio(radioCopy);
        } else {
            setRadio([false, false, false]);
        }
    }, [modalItem]);

    const handleEdit = () => {
        if(
            !(isValidf('txt', 'required', inputs.renginys, error, setError) &&
            isValidf('num', 'required', inputs.kaina, error, setError) &&
            isValidf('txt', 'required', inputs.data, error, setError) &&
            isValidf('txt', 'required', inputs.laikas, error, setError) &&
            isValidf('txt', 'required', inputs.renginioadresas, error, setError) &&
            isValidf('txt', 'required', inputs.vietostipas.slice(0, 10), error, setError) &&
            isValidf('txt', 'required', inputs.vietosnr, error, setError))
        ) {
            setShowWarningModal(true);
        } else {
            // console.log(modalItem.vietostipas)
            edit({
                renginys: inputs.renginys,
                kaina: inputs.kaina,
                data: inputs.data,
                laikas: inputs.laikas,
                renginioadresas: inputs.renginioadresas,
                vietostipas: inputs.vietostipas,
                vietosnr: inputs.vietosnr,
            }, modalItem.id)
        }
        // console.log(
        //     {
        //         renginys: inputs.renginys,
        //         data: inputs.data,
        //         laikas: inputs.laikas,
        //         renginioadresas: inputs.renginioadresas,
        //         vietostipas: inputs.vietostipas
        //     }
        // )
    };

    const [radio, setRadio] = useState([false, false, false]);
    const radioControl = i => {
        // const radioCopy = radio.slice();
        // radioCopy[i] = !radioCopy[i]
        // setRadio(radioCopy);

        const radioCopy = [false, false, false];
        radioCopy[i] = true;
        setRadio(radioCopy);

        const inputsCopy = {...inputs};
        inputsCopy.vietosnr = i + 1;
        setInputs(inputsCopy);
        // console.log(i)
    }

    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        // if(what ==='forsale') inputsCopy[what] = !inputs.forsale;
        setInputs(inputsCopy);
    }


    return (
        <div className="main-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>Edit item</h2>
                <label htmlFor="">Renginys*</label>
                <input type="text" value={inputs.renginys} onChange={(e) => formControl(e, 'renginys')} />
                <label htmlFor="">Kaina*</label>
                <input type="number" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')} />
                <label htmlFor="">Data*</label>
                <input type="date" value={inputs.data} onChange={(e) => formControl(e, 'data')} />
                <label htmlFor="">Laikas*</label>
                <input type="time" value={inputs.laikas} onChange={(e) => formControl(e, 'laikas')} />
                <label htmlFor="">Kur Vyksta*</label>
                <input type="text" value={inputs.renginioadresas} onChange={(e) => formControl(e, 'renginioadresas')} />

                <label htmlFor="">Vietos tipas*</label>
                <input type="text" value={inputs.vietostipas} onChange={(e) => formControl(e, 'vietostipas')} />
                <label htmlFor="">Vietos nr*</label>
                <input type="text" value={inputs.vietosnr} onChange={(e) => formControl(e, 'vietosnr')} />
                {/* <label>Product*</label><input kaina="text" value={inputs.renginys} onChange={(e) => formControl(e, 'renginys')} />
                <label>Type*</label><input kaina="text" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')} />
                <label>Type*</label>
                <select name="" id="" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')}>
                    {kainas.map((e, i) => <option key={i} value={e.kaina}>{e.kaina}</option>)}
                    
                </select>
                <label>Quantity*</label><input kaina="number" value={inputs.data} onChange={(e) => formControl(e, 'data')} />
                <label>Price*</label><input kaina="number" value={inputs.laikas} onChange={(e) => formControl(e, 'laikas')} />
                <label>In Stock</label>
                <select name="" id="" value={inputs.renginioadresas} onChange={(e) => formControl(e, 'renginioadresas')}>
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select> */}
                {/* --------------------- */}
                {/* <label>Last Order</label><input kaina="date" value={moment.tz(inputs.vietostipas, "Europe/Vilnius").format('YYYY-MM-DD')} onChange={(e) => formControl(e, 'vietostipas')} /> */}
                {/* <label>Last Order</label><input kaina="date" value={inputs.vietostipas} onChange={(e) => formControl(e, 'vietostipas')} /> */}
                {/* <label>Waranty</label><input kaina="number" value={inputs.vietosnr} onChange={(e) => formControl(e, 'vietosnr')} />
                <label>For Sale</label><input kaina="number" value={inputs.forsale} onChange={(e) => formControl(e, 'forsale')} />
                <label>Description</label><textarea value={inputs.description} onChange={(e) => formControl(e, 'description')} /> */}
                
                {/* <label style={{marginTop:'15px'}}>Waranty:</label>
                <div className="vietosnr">
                    <div>
                        <input onChange={(e) => radioControl(0)} kaina="radio" id="1yr" name="1yr"  checked={radio[0]}/>
                        <label htmlFor="1yr">1yr.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(1)} kaina="radio" id="2yr" name="2yr"  checked={radio[1]}/>
                        <label htmlFor="2yr">2yr.</label>
                    </div>

                    <div>
                        <input onChange={(e) => radioControl(2)} kaina="radio" id="3yr" name="3yr"  checked={radio[2]}/>
                        <label htmlFor="3yr">3yr.</label>
                    </div>
                </div> */}

                {/* <div className="sq">
                    <input onChange={() => radioControl(0)} kaina="checkbox" checked={radio[0]} />
                    <input onChange={() => radioControl(1)} kaina="checkbox" checked={radio[1]} />
                    <input onChange={() => radioControl(2)} kaina="checkbox" checked={radio[2]} />
                </div> */}


            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => confirmDelete(modalItem.id)}>Delete</button>
        </div>
    )

}

export default Modal;