export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crub', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crub-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-doctor',link: '/system/manage-doctor'
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // }
             //quản lý kế hoạch khám bệnh của bác sĩ
                {
                    name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
                },
            
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
            },

        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/specialty-manage'
            },

        ]
    },  
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook-manage'
            },

        ]
    },      
    
];


export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
        // { //quản lý kế hoạch khám bệnh của bác sĩ
        //     name: 'menu.doctor.manage-schedule',
        //     menus: [
                {
                    name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
                },
            // ]
        // }
        ]
    }


];