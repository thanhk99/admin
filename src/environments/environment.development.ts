const IP='127.0.0.1'
export const environment = {
    production:true,
    apiGetUsers:`http://${IP}:8082/user`,
    apiGetAtmUser: `http://${IP}:8082/Atm/get`,
    apiGetFullUser: `http://${IP}:8082/user/allUsers`,
    apiGetInfoUser: `http://${IP}:8082/user/info`,
    apiUpdateUser: `http://${IP}:8082/user/update`,
    apiDeleteUser: `http://${IP}:8082/user/delete`,
};
