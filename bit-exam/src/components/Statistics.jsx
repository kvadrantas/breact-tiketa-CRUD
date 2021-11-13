function Statistics ({stats}) {

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Parduota už: <i>{stats.totalPrice}</i></p></span>
                            <span><p>Parduota vnt.: <i>{stats.totalCount}</i></p></span>
                            {/* <span><p>Unique products <i>{stats.uniqueProducts}</i></p></span> */}
                    </div>
                    <div>
                        {/* <span><p>Average price: <i>{parseFloat(stats.avgPrice).toFixed(2)}</i></p></span>
                        <span><p>Items in stock: <i>{stats.itmInStock}</i></p></span> */}
                        {/* <span><p>Items out of stock: <i>{stats.itmOutStock}</i></p></span> */}
                    </div>
                </fieldset>
                <fieldset className="sub-statistics">
                    <legend>Statistics by group</legend>
                    <fieldset>
                        <legend>Pagal atlikėjus</legend>
                        <div className="group-statistics">
                            {stats.groupByArtist.map((e, i) => <span key={i}><p>{e.renginys} : <i>{e.renginysCount}</i></p></span>)}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Pagal Areną</legend>
                        <div className="group-statistics">
                            {stats.goupByAddress.map((e, i) => <span key={i}><p>{e.renginioadresas} : <i>{e.adresasCount}</i></p></span>)}
                        </div>
                    </fieldset>
                    {/* <div>
                        <span><p>Items in stock</p></span>
                        <span><p>Items out of stock:</p></span>
                        <span><p>Item average price:</p></span>
                    </div> */}
                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )

}

export default Statistics;