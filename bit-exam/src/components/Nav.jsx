// import { useState } from "react";

function Nav({ filterBy, setFilterBy, filterBy2, setFilterBy2, reset, searchBy, setSearchBy, sortConditions, handleSort, vietostipas, vietosnr}) {

// ----------------- FILTER -----------------


    const selectFilter = e => {
        setFilterBy(e.target.value)
        setFilterBy2('');
    }

    const selectFilter2 = e => {
        setFilterBy2(e.target.value)
        setFilterBy('');
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }
    
    // SORT1 & FILTER MIX (SORT1)   
    // const selectSort = e => {
    //     setSortConditions(e.target.value);
    // }

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        // console.log(e)
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setFilterBy2('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
    {/* <option value="in-stock">In Stock</option>
    <option value="out-stock">Out of stock</option> */}
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>Pagal vietos tipą</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select filter...</option>
                            {/* <option value="">Select animal</option> */}
                            {
                                vietostipas.map(t => <option key={t.vietostipas} value={t.vietostipas}>{t.vietostipas}</option>)
                            }
                        </select>
                    </div>

                    <div className="filter">
                        <label>Pagal vietos nr.</label><br></br>
                        <select onChange={selectFilter2} value={filterBy2} >
                            <option value="default" hidden>Select filter...</option>
                            {/* <option value="">Select animal</option> */}
                            {
                                vietosnr.map(t => <option key={t.vietosnr} value={t.vietosnr}>{t.vietosnr}</option>)
                            }
                        </select>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>By kaina</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default"  hidden>Select item...</option>
                            {
                                vietostipas.map(t => <option key={t.kaina} value={t.kaina}>{t.kaina}</option>)
                            }
                        </select>
                    </div>
                </fieldset> */}
                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions.current} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="text-asc,renginys">renginys &#8593;</option>
                            <option value="text-desc,renginys">renginys &#8595;</option>
                            <option value="number-asc,kaina">Kaina &#8593;</option>
                            <option value="number-desc,kaina">Kaina &#8595;</option>
                            <option value="date-asc,data">Data &#8593;</option>
                            <option value="date-desc,data">Data &#8595;</option>
                            <option value="text-asc,laikas">Laikas &#8593;</option>
                            <option value="text-desc,laikas">Laikas &#8595;</option>
                            <option value="text-asc,renginioadresas">Kur vyksta &#8593;</option>
                            <option value="text-desc,renginioadresas">Kur vyksta &#8595;</option>
                            <option value="text-asc,vietostipas">Vietos tipas &#8593;</option>
                            <option value="text-desc,vietostipas">Vietos tipas &#8595;</option>
                            <option value="text-asc,vietosnr">Vietos nr &#8593;</option>
                            <option value="text-desc,vietosnr">Vietos nr &#8595;</option>
                        </select>
                    </div>
                    {/* SORT & FILTER MIX (SORT1)- */}
                    {/* <div className="sort">
                        <label>Select sort criteria</label><br></br>
                        <select onChange={selectSort} value={sortConditions} >
                            <option value="default"  hidden>Select sorting...</option>
                            <option value="in-stock">In Stock</option>
                            <option value="out-stock">Out of stock</option>
                            <option value="number-asc">Price low to high</option>
                            <option value="number-desc">Price hight to low</option>
                        </select>
                    </div> */}
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>Type search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;