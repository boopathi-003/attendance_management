import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers) => {
           
            const token = sessionStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'user',
        }),
        getUserById: builder.query({
            query: (userId) => `user/id/${userId}`,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/id/${userId}`,
                method: 'DELETE',
            }),
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: 'user/adduser',
                method: 'POST',
                body: userData,
                responseType: 'text',
            }),
        }),
        updateUser: builder.mutation({
            query: ({ userId, ...data }) => ({
                url: `/user/${userId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAttendance: builder.query({
            query: () => 'attendance',
        }),
        getAttendanceById: builder.query({
            query: (attendanceId) => `attendance/id/${attendanceId}`,
        }),
        updateAttendance: builder.mutation({
            query: ({ attendanceId, ...data }) => ({
                url: `/attendance/${attendanceId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getDeleteAttendance: builder.mutation({
            query: (attendanceId) => ({
                url: `attendance/id/${attendanceId}`,
                method: 'DELETE',
            }),
        }),
        postAttendance: builder.mutation({
            query: (attendanceData) => ({
                url: 'attendance/add-attendance',
                method: 'POST',
                body: attendanceData,
            }),
        }),
        deleteAttendance: builder.mutation({
            query: (attendanceId) => ({
                url: `attendance/id/${attendanceId}`,
                method: 'DELETE',
            }),
        }), 
        getPresent: builder.query({
            query: () => `attendance/present`,
        }),   
        getAbsent: builder.query({
            query: () => `attendance/absent`,
        }),   
        getLeaveRecord: builder.query({
            query: () => 'leaverecord',
        }),  
        getLeaveRecordById: builder.query({
            query: (leaveRecordId) => `leaverecord/id/${leaveRecordId}`,
        }),
        getSickLeave: builder.query({
            query: () => 'attendance/sick',
        }),  
        getPlannedLeave: builder.query({
            query: () => 'attendance/planned-leave',
        }),
    
    }),
});

export const {
    useGetUsersQuery, useGetUserByIdQuery,useDeleteUserMutation,useCreateUserMutation,
    useUpdateUserMutation,useGetAttendanceQuery,usePostAttendanceMutation,useDeleteAttendanceMutation,
    useGetPresentQuery,useGetAbsentQuery,useGetLeaveRecordQuery,useGetLeaveRecordByIdQuery,
    useGetSickLeaveQuery,useGetPlannedLeaveQuery,useGetAttendanceByIdQuery,useUpdateAttendanceMutation,
    useGetDeleteAttendanceMutation
} = userApi;
