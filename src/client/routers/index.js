export const routerPublic = [
    {
        path:"/",
        exact: true,
        page:() => ()
    },
    {
        path:"/login",
        page:() => ()
    }
];

export const routerPrivate = [
    {
        path:"/",
        exact: true,
        page:() => ()
    },
    {
        path:"/profile",
        page:() => ()
    },
    {
        path:"/share_location",
        page:() => ()
    },
    {
        path:"/share_group",
        page:() => ()
    },
    {
        path:"/history",
        page:() => ()
    }
]