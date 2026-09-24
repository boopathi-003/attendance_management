import React from 'react'
import { useGetPlannedLeaveQuery } from '../redux/ApiSlice';
const PlannedLeave = () => {
  const { data } = useGetPlannedLeaveQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default PlannedLeave;