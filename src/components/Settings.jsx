import React from 'react'
import ExportUserData from './ExportUserData'
import ImportUserData from './ImportUserData'
import AgentInfo from './AgentInfo'

function Settings() {
  return (
   <>
     <h4>Settings</h4>
     <div className="row mt-2">
      <div className="col-md-12">
        <AgentInfo/>
      </div>
     </div>
     <div className="row mt-2">
      <div className="col-md-6">
        <ExportUserData/>
      </div>
      <div className="col-md-6">
        <ImportUserData/>
      </div>
     </div>
   </>
  )
}

export default Settings