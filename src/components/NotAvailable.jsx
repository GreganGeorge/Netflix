import React from 'react'

const NotAvailable = ({type,selectedGenre}) => {
  return (
    <h1 className='not-available'>
        {selectedGenre?`No ${type=="movie"?"Movies":"TV Shows"} Available for Selected Genre`:"Please Select a Genre"}
    </h1>
  )
}

export default NotAvailable