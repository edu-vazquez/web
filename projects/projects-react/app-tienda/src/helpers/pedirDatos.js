import data from '../data/data.json'

export const pedirDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(data);
        }, 1000)
    })
}


export const pedirItem = id => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>  {
            const item = data.find( (el) => el.id === id );
            item ? resolve(item) : reject({error: "no se encontro el item"});
        }, 1000) 
    })
}