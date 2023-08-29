import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../../context/userContext";
import {create, get} from "../../Service/kindOfSport.service.js";
import {Helmet} from "react-helmet";

function KindOfSport(props) {
    const {state, dispatch} = useContext(UserContext)
    const [kindOfSport, setKindOfSport] = useState({Name: ""});
    const [listKindOfSport, setListKindOfSport] = useState([]);



    const submit = async (data) => {
        data.preventDefault();
        dispatch({type: "SHOW_LOADING"});

        const rs = await create(kindOfSport);
        listKindOfSport.push(kindOfSport)

        dispatch({type: "HIDE_LOADING"});


    }
    const handleInput = (event) => {
        kindOfSport[event.target.name] = event.target.value;
        setKindOfSport(kindOfSport);
    }


    const list = async () => {
        dispatch({type: "SHOW_LOADING"});
        const listKindOfSport = await get();
        setListKindOfSport(listKindOfSport);

        dispatch({type: "HIDE_LOADING"});


    }
    useEffect(() => {
        list()
    }, [])


    return (

        <div>
            <div className="content">
                <Helmet>
                    <script src="../admin/assets/js/plugins/jquery.dataTables.min.js" type = "text/javascript" ></script>
                    <script src = "../admin/assets/demo/datatable.js" type = "text/javascript" />
                </Helmet>
                <div className="container-fluid">
                    <h1>Kind Of Sport</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card ">
                                <div className="card-header card-header-rose card-header-text">
                                    <div className="card-text">
                                        <h4 className="card-title">Create</h4>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <form method="post" className="form-horizontal">
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <input onChange={handleInput} name={'name'} type="text"
                                                           className="form-control"/>
                                                    <span className="bmd-help">A block of help text that breaks onto a new line.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-10
                                   ">
                                                <button onClick={submit} type={'submit'}
                                                        className={'btn btn-primary '}>Submit
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">assignment</i>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="toolbar">
                                        {/*        Here you can write extra buttons/actions for the toolbar              */}
                                    </div>
                                    <div className="material-datatables">

                                        <table id="datatables"
                                               className="table table-striped table-no-bordered table-hover"
                                               cellSpacing={0} width="100%" style={{width: '100%'}}>
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th className="disabled-sorting text-right">Actions</th>
                                            </tr>
                                            </thead>
                                            <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                            </tfoot>
                                            <tbody>
                                            {
                                                listKindOfSport.map((e, i) => {
                                                    return (

                                                        <tr key={i}>
                                                            <td>{e.name}</td>
                                                            <td className="text-right">
                                                                <a href="#"
                                                                   className="btn btn-link btn-info btn-just-icon like"><i
                                                                    className="material-icons">favorite</i></a>
                                                                <a href="#"
                                                                   className="btn btn-link btn-warning btn-just-icon edit"><i
                                                                    className="material-icons">dvr</i></a>
                                                                <a href="#"
                                                                   className="btn btn-link btn-danger btn-just-icon remove"><i
                                                                    className="material-icons">close</i></a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                {/* end content*/}
                            </div>
                            {/*  end card  */}
                        </div>
                        {/* end col-md-12 */}
                    </div>
                    {/* end row */}
                </div>
            </div>

        </div>
    );
}



export default KindOfSport;