import React from 'react'
import { useGetPresentQuery } from '../redux/ApiSlice';

const Presents = (value,icon) => {
  const { data } = useGetPresentQuery();
  const length = data?.length || 0;
  return (
    <div>{length}</div>
  )
}

export default Presents