import React from 'react';
import Login from '../pages/login';
import Private from '../pages/private';
import Profile from '../pages/profile';
import ShareLocation from '../pages/share_location';
import ShareGroup from '../pages/share_group';
import History from '../pages/history';

export const routerPublic = [
    {
        path:"/",
        exact: true,
        page:() => (<Login/>)
    },
    {
        path:"/login",
        page:() => (<Login/>)
    }
];

export const routerPrivate = [
    {
        path:"/",
        exact: true,
        page:() => (<Private/>)
    },
    {
        path:"/profile",
        page:() => (<Profile/>)
    },
    {
        path:"/share_location",
        page:() => (<ShareLocation/>)
    },
    {
        path:"/share_group",
        page:() => (<ShareGroup/>)
    },
    {
        path:"/history",
        page:() => (<History/>)
    }
]