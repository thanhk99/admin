const IP='127.0.0.1'
export const environment = {
    producttion:true,
    apiGetUsers:`http://${IP}:8082/user`,
    apiGetAtmUser: `http://${IP}:8082/Atm/get`,
    apiGetFullUser: `http://${IP}:8082/admin/allUsers`,
    apiGetInfoUser: `http://${IP}:8082/user/info`,
    apiUpdateUser: `http://${IP}:8082/admin/update`,
    apiDeleteUser: `http://${IP}:8082/admin/delete`,
    apiUpdateAtmUser: `http://${IP}:8082/admin/updateBalan`,
    apiUpdateTKMK: `http://${IP}:8082/admin/updateTkMK`,
    apiSumWin: `http://${IP}:8082/admin/totalMoney`,
    apiSumLose: `http://${IP}:8082/admin/totalLost`,
    apiRengWin: `http://${IP}:8082/admin/totalMoneyGame`,
    apiRengLose: `http://${IP}:8082/admin/totalLostGame`,
    apiClWin: `http://${IP}:8082/admin/totalMoneyCL`,
    apiClLose: `http://${IP}:8082/admin/totalLostCL`,
};
