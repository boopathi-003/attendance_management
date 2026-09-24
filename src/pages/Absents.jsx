import React from 'react'
import { useGetLeaveRecordQuery } from '../redux/ApiSlice';

const Absents = () => {
  const { data } = useGetLeaveRecordQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default Absents;