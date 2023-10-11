import React from 'react'

const UserProfilePage = ({params}:any) => {
  return (
    <>
        <div>
            UserProfilePage with id 
        </div>
        <span className='bg-red'>{params.id}</span>
    </>
    
  )
}

export default UserProfilePage