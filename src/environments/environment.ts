const IP='127.0.0.1'
export const environment = {
    producttion:false,
    apiGetUsers:`http://${IP}:8082/user`,
    apiGetAtmUser: `http://${IP}:8082/Atm/get`,
    apiGetFullUser: `http://${IP}:8082/admin/allUsers`,
    apiGetInfoUser: `http://${IP}:8082/user/info`,
    apiUpdateUser: `http://${IP}:8082/admin/update`,
    apiDeleteUser: `http://${IP}:8082/admin/delete`,
};
