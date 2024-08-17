import sequelize from "./connection";

function sincronizar(){
    sequelize.sync()
        .then(() => {
            console.log('Sincronización completa de modelos.');
        })
        .catch(err => {
            console.error('Error al sincronizar modelos:', err);
        });
}

export default sincronizar