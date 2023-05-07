import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import SubSider from '../AdminLayout/SubSider'

const OperationLayout = ({sidebarOptions,title}) => {
    return (
        <Fragment>
            <SubSider sidebarOptions={sidebarOptions} title={title}/>
            <Outlet />
        </Fragment>
    )
}

export default OperationLayout