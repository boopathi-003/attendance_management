import React from 'react'
import { useGetSickLeaveQuery } from '../redux/ApiSlice';

const SickLeave = () => {
  const { data } = useGetSickLeaveQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default SickLeave