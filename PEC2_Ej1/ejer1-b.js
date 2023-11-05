/*Funció per trobar un objecte dins de l'array. Es crea una promise que resoldrà si es troba o no l'element. */
const findOne = (list, { key, value }) => { 
    return new Promise((resolve, reject) => {
        /*És una funció global que que serveix per executar un codi passat el temps donat. En aquest cas 2 segons. */ 
        setTimeout(() => {
        /*Es guarda dins la constant element el resultat de buscar a la llista que ens han passat per paràmetre si troba algun element que coincideixi el key amb el value donats.*/
          const element = list.find(element => element[key] === value);
          /* Es comprova si element té algun contingut. Si en té, es completa amb èxit la promise i retorna el contingut. En cas contrari, s'activa el reject i retorna un missatge d'error.*/
          element ? resolve(element) : reject({ msg: 'ERROR: Element Not Found' });  
  
          
        }, 2000);/* El temps especificat*/
      });
     
};

/*Users és un array d'objectes. Cada objecte conté dos keys -name i rol- i cadascun d'aquests guarda un valor.*/
const users = [
    {
    name: 'Carlos',
    rol: 'Teacher'
    },
    {
    name: 'Ana',
    rol: 'Boss'
    }
];

/*Mosta un missatge per consola*/
console.log('findOne success');
/*Executa la funció findOne passant per paràmetre valors que existeixen a la llista. Fa un print "user: Carlos" perquè ho ha trobat dins la llista, per tant, ha acabat resolent amb èxit la promise.*/
findOne(users, { key: 'name', value: 'Carlos' })
    .then(({ name }) => console.log(`user: ${name}`)) /*En cas que la promise es completi amb èxit, print de l'usuari.*/
    .catch (({ msg }) => console.log(msg)); /*En cas que la promise no es completi amb èxit, print del missatge d'error.*/
/*Mosta un missatge per consola*/
console.log('findOne error');
/*Executa la funció findOne passant per paràmetre valors que no existeixen a la llista. Fa un print del missatge d'error perquè no ho ha trobat dins. En aquest cas, la promise s'ha rebutjat.*/
findOne(users, { key: 'name', value: 'Fermin' })
.then(({ name }) => console.log(`user: ${name}`)) /*En cas que la promise es completi amb èxit, print de l'usuari.*/
.catch (({ msg }) => console.log(msg)); /*En cas que la promise no es completi amb èxit, print del missatge d'error.*/

/*
findOne success
findOne error
    //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/