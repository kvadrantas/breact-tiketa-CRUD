import { useState } from "react";
import isValidf from "../js/isValidf";
// import moment from "moment-timezone";


function NewRecord({create, showNewRecordModal, setShowNewRecordModal, vietostipas, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        renginys: '',
        kaina: '',
        data: '',
        laikas: '',
        renginioadresas: '',
        vietostipas: '',
        vietosnr: '',
    });



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

        // console.log('VALUE ', e.target.value)
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(isValidf('txt', 'required', inputs.renginys, error, setError) &&
            isValidf('num', 'required', inputs.kaina, error, setError) &&
            isValidf('txt', 'required', inputs.data, error, setError) &&
            isValidf('txt', 'required', inputs.laikas, error, setError) &&
            isValidf('txt', 'optional', inputs.renginioadresas, error, setError) &&
            isValidf('txt', 'optional', inputs.vietostipas.slice(0, 10), error, setError) &&
            isValidf('txt', 'optional', inputs.vietosnr, error, setError))
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                renginys: '',
                kaina: '',
                data: '',
                laikas: '',
                renginioadresas: '',
                vietostipas: '',
                vietosnr: '',
            });

            setShowNewRecordModal(false);
            setRadio([false, false, false]);
        }
    }


    return (
        <div className="main-modal" style={{
            display: showNewRecordModal ? 'block' : 'none',
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
                {/* <label>renginys*</label><input kaina="text" value={inputs.renginys} onChange={(e) => formControl(e, 'renginys')} />
                <label>kaina*</label><input kaina="text" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')} /> */}
                <label>Vietos tipas*</label>
                <select name="" id="" value={inputs.kaina} onChange={(e) => formControl(e, 'kaina')}>
                    <option value="default" hidden>Select kaina...</option>
                    {vietostipas.map((e, i) => <option key={i} value={e.kaina}>{e.kaina}</option>)}
                    
                </select>
                <label>data*</label><input kaina="number" value={inputs.data} onChange={(e) => formControl(e, 'data')} />
                {/* <label>laikas*</label><input kaina="number" value={inputs.laikas} onChange={(e) => formControl(e, 'laikas')} />
                <label>In Stock</label>
                <select name="" id="" value={inputs.renginioadresas} onChange={(e) => formControl(e, 'renginioadresas')}>
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select> */}
                {/* ---------- */}
                {/* <label>Last Order</label><input kaina="date" value={moment.tz(inputs.vietostipas, "Europe/Vilnius").format('YYYY-MM-DD')} onChange={(e) => formControl(e, 'vietostipas')} /> */}
                {/* <label>Last Order</label><input kaina="date" value={inputs.vietostipas} onChange={(e) => formControl(e, 'vietostipas')} /> */}
                {/* <label>vietosnr</label><input kaina="number" value={inputs.vietosnr} onChange={(e) => formControl(e, 'vietosnr')} />
                <label>For Sale</label><input kaina="number" value={inputs.forsale} onChange={(e) => formControl(e, 'forsale')} />
                <label>Description</label><textarea value={inputs.description} onChange={(e) => formControl(e, 'description')} /> */}
                
                {/* <label style={{marginTop:'15px'}}>vietosnr:</label>
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
            <button className="form-button" onClick={handleCreate}>Add</button>
            <button className="form-button" onClick={() => setShowNewRecordModal(false)}>Cancel</button>
        </div>
    )
    
}

export default NewRecord;