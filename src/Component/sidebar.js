import {Link} from "react-router-dom";

const Sidebar = () => {
    return (<div className="sidebar" data-color="rose" data-background-color="black"
                 data-image="../admin/assets/img/sidebar-1.jpg">
        <div className="logo">
            <a href="http://www.creative-tim.com/" className="simple-text logo-mini">
                CT
            </a>
            <a href="http://www.creative-tim.com/" className="simple-text logo-normal">
                Creative Tim
            </a>
        </div>
        <div className="sidebar-wrapper">
            <div className="user">
                <div className="photo">
                    <img src="../admin/assets/img/faces/avatar.jpg"/>
                </div>
                <div className="user-info">
                    <a data-toggle="collapse" href="#collapseExample" className="username">
              <span>
                Tania Andrew
                <b className="caret"></b>
              </span>
                    </a>
                    <div className="collapse" id="collapseExample">
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span className="sidebar-mini"> MP </span>
                                    <span className="sidebar-normal"> My Profile </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span className="sidebar-mini"> EP </span>
                                    <span className="sidebar-normal"> Edit Profile </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span className="sidebar-mini"> S </span>
                                    <span className="sidebar-normal"> Settings </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul className="nav">
                <li className="nav-item active ">
                    <Link className="nav-link" to={'/'}>
                        <i className="material-icons">dashboard</i>
                        <p> Dashboard </p>
                    </Link>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" data-toggle="collapse" href="#componentsExamples">
                        <i className="material-icons">apps</i>
                        <p> Product
                            <b className="caret"></b>
                        </p>
                    </a>
                    <div className="collapse" id="componentsExamples">
                        <ul className="nav">
                            <li className="nav-item ">
                                <a className="nav-link" >
                                    <span className="sidebar-mini"> L </span>
                                    {/*<span className="sidebar-normal"> </span>*/}
                                    <Link style={{color: "white"}} className={'sidebar-normal'} to={'/list-product'}> List Product</Link>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link">
                                    <span className="sidebar-mini"> C </span>
                                    <Link style={{color: "white"}} className={'sidebar-normal'} to={'/create-product'}> Create Product</Link>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" >
                                    <span className="sidebar-mini"> GS </span>
                                    <span className="sidebar-normal"> Grid System </span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" data-toggle="collapse" href="#formsExamples">
                        <i className="material-icons">content_paste</i>
                        <p> Category
                            <b className="caret"></b>
                        </p>
                    </a>
                    <div className="collapse" id="formsExamples">
                        <ul className="nav">
                            <li className="nav-item ">
                                <Link className="nav-link" to={'/list-category'}>
                                    <span className="sidebar-mini"> L </span>
                                    <span className="sidebar-normal"> List Category </span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to={'/list-category-details'}>
                                    <span className="sidebar-mini"> L </span>
                                    <span className="sidebar-normal"> List Category Details </span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" data-toggle="collapse" href="#tablesExamples">
                        <i className="material-icons">grid_on</i>
                        <p> Tables
                            <b className="caret"></b>
                        </p>
                    </a>
                    <div className="collapse" id="tablesExamples">
                        <ul className="nav">
                            <li className="nav-item ">
                                <a className="nav-link" href="tables/regular.html">
                                    <span className="sidebar-mini"> RT </span>
                                    <span className="sidebar-normal"> Regular Tables </span>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="tables/extended.html">
                                    <span className="sidebar-mini"> ET </span>
                                    <span className="sidebar-normal"> Extended Tables </span>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="tables/datatables.net.html">
                                    <span className="sidebar-mini"> DT </span>
                                    <span className="sidebar-normal"> DataTables.net </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" data-toggle="collapse" href="#mapsExamples">
                        <i className="material-icons">place</i>
                        <p> Maps
                            <b className="caret"></b>
                        </p>
                    </a>
                    <div className="collapse" id="mapsExamples">
                        <ul className="nav">
                            <li className="nav-item ">
                                <a className="nav-link" href="maps/google.html">
                                    <span className="sidebar-mini"> GM </span>
                                    <span className="sidebar-normal"> Google Maps </span>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="maps/fullscreen.html">
                                    <span className="sidebar-mini"> FSM </span>
                                    <span className="sidebar-normal"> Full Screen Map </span>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="maps/vector.html">
                                    <span className="sidebar-mini"> VM </span>
                                    <span className="sidebar-normal"> Vector Map </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" href="widgets.html">
                        <i className="material-icons">widgets</i>
                        <p> Widgets </p>
                    </a>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" href="charts.html">
                        <i className="material-icons">timeline</i>
                        <p> Charts </p>
                    </a>
                </li>
                <li className="nav-item ">
                    <a className="nav-link" href="calendar.html">
                        <i className="material-icons">date_range</i>
                        <p> Calendar </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>);
}
export default Sidebar;