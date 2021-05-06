const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Dasboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/'},
            { titulo: 'ProgressBar', url: 'progress'},
            { titulo: 'Grafica', url: 'grafica1'},
            { titulo: 'Promesas', url: 'promesas'},
            { titulo: 'RxJS', url: 'rxjs'},
    
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo: 'Usuarios', url: 'usuarios'},
            { titulo: 'Hospitales', url: 'hospitales'},
            { titulo: 'Medicos', url: 'medicos'},
    
          ]
        }
      ];

      if (role === 'ADMIN_ROLE') {

        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios'});

      }

      return menu;

}

module.exports = {

    getMenuFrontEnd

}