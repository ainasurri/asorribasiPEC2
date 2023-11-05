const data = require('./data'); 
const prices = data.prices; 
const { hours } = require('./data');
const { animals } = require('./data'); 
const { employees } = require('./data'); 

/***************************************_1_******************************/
function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }

  let total = 0;
  total += (entrants.Adult || 0) * prices.Adult;
  total += (entrants.Child || 0) * prices.Child;
  total += (entrants.Senior || 0) * prices.Senior;

  return total;
}

/***************************************_2_******************************/

function formatHour(hour) {
  if (hour === 0) {
    return '12am';
  } else if (hour === 12) {
    return '12pm';
  } else {
    return `${hour % 12}${hour < 12 ? 'am' : 'pm'}`;
  }
}
function schedule(dayName) {
  const formattedSchedule = {};
  for (const day in hours) {
    if (hours.hasOwnProperty(day)) {
      const dayHours = hours[day];
      if (dayHours.open === 0 && dayHours.close === 0) {
        formattedSchedule[day] = 'CLOSED';
      } else {
        formattedSchedule[day] = `Open from ${formatHour(dayHours.open)} until ${formatHour(dayHours.close)}`;
      }
    }
  }

  if (dayName) {
    return { [dayName]: formattedSchedule[dayName] };
  }
  return formattedSchedule;
}
/***************************************_3_******************************/

function animalCount(species) {
  const counts = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});

    if (species) {
    return counts[species] || 0;
  } else {
    return counts;
  }
}


/***************************************_4_******************************/

function animalMap(options = {}) {
  const map = {};

  animals.forEach((animal) => {
    if (!map[animal.location]) {
      map[animal.location] = [];
    }

    let animalNames = animal.residents;
    
    if (options.sex) {
      animalNames = animalNames.filter(resident => resident.sex === options.sex);
    }
    
    if (options.includeNames) {
      let names = animalNames.map(resident => resident.name);

      if (options.sorted) {
        names.sort();
      }

      map[animal.location].push({ [animal.name]: names });
    } else {
      
      map[animal.location].push(animal.name);
    }
  });

  return map;
}


/***************************************_5_******************************/
function animalPopularity(rating) {
  const sortedAnimals = {};
  const { animals } = require('./data'); 

  animals.forEach(animal => {
    
    if (rating !== undefined && animal.popularity === rating) {
      if (!sortedAnimals[rating]) {
        sortedAnimals[rating] = [];
      }
      sortedAnimals[rating].push(animal.name);
    } else if (rating === undefined) {
      if (!sortedAnimals[animal.popularity]) {
        sortedAnimals[animal.popularity] = [];
      }
      sortedAnimals[animal.popularity].push(animal.name);
    }
  });

  if (rating !== undefined) {
    return sortedAnimals[rating] || [];
  }
  return sortedAnimals;
}
/***************************************_6_******************************/

function animalsByIds(ids) {
  if (!ids) {
    return [];
  }

  const idsArray = Array.isArray(ids) ? ids : [ids];
  return animals.filter(animal => idsArray.includes(animal.id));
}

/***************************************_7_******************************/

function animalByName(animalName) {
  if (!animalName) {
    return {};
  }

  for (let animal of animals) {
    let found = animal.residents.find(resident => resident.name === animalName);
    if (found) {
      return { ...found, species: animal.name };
    }
  }
  return {};
}
/***************************************_8_******************************/

function employeesByIds(ids) {
  if (!ids || ids.length === 0) {
    return [];
  }
  return employees.filter(employee => ids.includes(employee.id));
}

/***************************************_9_******************************/

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  const employee = employees.find(({ firstName, lastName }) => 
    firstName === employeeName || lastName === employeeName
  );
  return employee || {};
}

/***************************************_10_******************************/

function managersForEmployee(idOrName) {
  
  const employee = employees.find((emp) => 
    emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName
  );

  if (!employee) {
    return {};
  }

  const managerNames = employee.managers.map((managerId) => {
    const manager = employees.find((mng) => mng.id === managerId);
    return `${manager.firstName} ${manager.lastName}`;
  });

  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    managers: managerNames,
    responsibleFor: employee.responsibleFor,
  };
}
/***************************************_11_******************************/
function employeeCoverage(idOrName) {
  const fullName = (employee) => `${employee.firstName} ${employee.lastName}`;
  
  if (idOrName) {
    const employee = employees.find(emp =>
      emp.id === idOrName ||
      emp.firstName === idOrName ||
      emp.lastName === idOrName
    );

    if (!employee) {
      return {};
    }

    const coverage = {};
    coverage[fullName(employee)] = animalsByIds(employee.responsibleFor).map(animal=>animal.name);
    return coverage;
  } else {
    const allCoverage = {};

    employees.forEach(emp => {
      allCoverage[fullName(emp)] = animalsByIds(emp.responsibleFor).map(animal=>animal.name);
    });
    
    return allCoverage;
  }
}

console.log(employeeCoverage());

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
