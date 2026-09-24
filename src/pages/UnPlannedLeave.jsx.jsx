import React from 'react'
import { useGetAbsentQuery } from '../redux/ApiSlice';

const UnPlannedLeave = () => {
  const { data } = useGetAbsentQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default UnPlannedLeave;