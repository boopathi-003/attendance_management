import React from 'react'
import { useGetUsersQuery } from '../redux/ApiSlice';

const TotalEmployees = () => {
    const { data } = useGetUsersQuery();
    const length = data?.length || 0;
    console.log(length);
    
  return (
    <div>{length}</div>
  )
}

export default TotalEmployees

