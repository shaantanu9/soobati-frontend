import {getAge} from './functions';
import {getItem} from './storage';
const searchFields = [
  'name',
  // 'email',
  'family.father',
  'family.mother',
  'uncle.name',
  'hobbies',
  'education',
  'expectations',
  'bio',
  'subCaste',
  'family.address.city',
  'family.address.state',
  'family.address.country',
];
export const searchUsers = (payload: any) => {
  let userData: any = getItem('userData');
  console.log({
    payload,
    // data: jsonData.data,
    length: userData.length,
  });

  if (payload.search != '') {
    const nameRegex = new RegExp(payload.search, 'i');
    const getFieldByPath = (obj: any, path: string): any => {
      return path
        .split('.')
        .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
    };
    const nameFilteredData = userData.filter((item: any) =>
      searchFields.some(field => {
        const value = getFieldByPath(item, field);
        return typeof value === 'string' && nameRegex.test(value.toLowerCase());
      }),
    );
    userData = [...nameFilteredData];
  }
  // Check salary range
  if (payload.salaryRange) {
    const [minSalary, maxSalary] = payload.salaryRange;
    const salaryFilteredData = userData.filter((item: any) => {
      return (
        (!minSalary || item.salary >= minSalary) &&
        (!maxSalary || item.salary <= maxSalary)
      );
    });
    userData = [...salaryFilteredData];
  }

  // Check age range
  if (payload.salaryRange) {
    const [minAge, maxAge] = payload.ageRange;
    const ageFilteredData = userData.filter((item: any) => {
      const userAgefromDOB = parseInt(getAge(item.dob).split(' ')[0]);
      console.log({userAgefromDOB, minAge, maxAge});
      return (
        (!minAge || userAgefromDOB >= minAge) &&
        (!maxAge || userAgefromDOB <= maxAge)
      );
    });
    userData = [...ageFilteredData];
  }

  console.log({salary: userData.length, users: userData.map((i:any) => i.salary)});
  // Check height range
  if (payload.heightRange) {
    const [minHeight, maxHeight] = payload.heightRange;
    const heightFilteredData = userData.filter((item: any) => {
      return (
        (!minHeight || item.height >= minHeight) &&
        (!maxHeight || item.height <= maxHeight)
      );
    });
    userData = [...heightFilteredData];
  }
  console.log({height: userData.length, users: userData.map((i:any) => i.height)});

  // check city
  if (payload.city) {
    const cityFilteredData = userData.filter(
      (item: any) => item.family.address.city == payload.city,
    );
    userData = [...cityFilteredData];
  }

  // check farm range is between farmRange
  if (payload.farmRange) {
    const [minFarm, maxFarm] = payload.farmRange;

    const farmFilteredData = userData.filter((item: any) => {
      const userFram = item.family.farm.bagayti + item.family.farm.jirayti;
      return (
        (!minFarm || userFram >= minFarm) && (!maxFarm || userFram <= maxFarm)
      );
    });
    userData = [...farmFilteredData];
  }

  // brother count
  if (payload.brother) {
    const brotherFilteredData = userData.filter(
      (item: any) => item.family.brother >= payload.brother,
    );
    userData = [...brotherFilteredData];
  }

  // sister count
  if (payload.sister) {
    const sisterFilteredData = userData.filter(
      (item: any) => item.family.sister >= payload.sister,
    );
    userData = [...sisterFilteredData];
  }

  // check marital status
  if (payload.maritalStatus) {
    const maritalStatusFilteredData = userData.filter(
      (item: any) => item.maritalStatus == payload.maritalStatus,
    );
    userData = [...maritalStatusFilteredData];
  }

  console.log(userData.length, 'LAST');
  return userData;

  // Function to get nested fields by path

  // console.log({name1: name.map(i => i._id), len: name.length});
  // const filteredData = userData.filter((item: any) => {
  //   // Check search criteria
  //   if (payload.search) {
  //     const searchFields = [
  //       'name',
  //       'email',
  //       'fatherName',
  //       'motherName',
  //       'uncleName',
  //       'hobbies',
  //       'education',
  //       'expectations',
  //       'bio',
  //       'subCaste',
  //       'address.city',
  //       'address.state',
  //       'address.country',
  //     ];

  //     const hasMatch = searchFields.some(field => {
  //       const value = item[field];
  //       return (
  //         typeof value === 'string' &&
  //         value.toLowerCase().includes(payload.search.toLowerCase())
  //       );
  //     });

  //     if (!hasMatch) {
  //       return false;
  //     }
  //   }

  //   // Check salary range
  //   if (payload.salaryRange) {
  //     const [minSalary, maxSalary] = payload.salaryRange;
  //     if (!(item.salary >= minSalary && item.salary <= maxSalary)) {
  //       return false;
  //     }
  //   }

  //   // Check height range
  //   if (payload.heightRange) {
  //     const [minHeight, maxHeight] = payload.heightRange;
  //     if (
  //       !(
  //         item.height?.['$numberDecimal'] >= minHeight &&
  //         item.height?.['$numberDecimal'] <= maxHeight
  //       )
  //     ) {
  //       return false;
  //     }
  //   }

  //   // Check age range
  //   if (payload.ageRange) {
  //     let [minAge, maxAge] = payload.ageRange;
  //     if (minAge === 0) minAge = 18;
  //     if (maxAge === 0) maxAge = 100;

  //     const userAgefromDOB = parseInt(getAge(item.dob).split(' ')[0]);
  //     console.log('userAgefromDOB', {
  //       userAgefromDOB,
  //       minAge,
  //       maxAge,
  //       dob: item.dob,
  //       check: !(userAgefromDOB >= minAge && userAgefromDOB <= maxAge),
  //     });
  //     if (!(userAgefromDOB >= minAge && userAgefromDOB <= maxAge)) {
  //       return false;
  //     }
  //   }

  //   // Check brother range
  //   if (payload.brother) {
  //     if (!(item.brother >= 0 && item.brother <= payload.brother)) {
  //       return false;
  //     }
  //   }

  //   // Check sister range
  //   if (payload.sister) {
  //     if (!(item.sister >= 0 && item.sister <= payload.sister)) {
  //       return false;
  //     }
  //   }

  //   // check marital status
  //   if (payload.maritalStatus) {
  //     if (!(item.maritalStatus == payload.maritalStatus)) {
  //       return false;
  //     }
  //   }

  //   // check city
  //   if (payload.city) {
  //     if (!(item.family.address.city == payload.city)) {
  //       return false;
  //     }
  //   }

  //   // check state
  //   if (payload.state) {
  //     if (!(item.family.address.state == payload.state)) {
  //       return false;
  //     }
  //   }

  //   // check country

  //   return true; // All criteria matched
  // });

  // // Apply sorting if specified
  // if (payload.sort) {
  //   const sortOrder =
  //     payload.sort === 'age' ||
  //     payload.sort === 'height' ||
  //     payload.sort === 'salary'
  //       ? 1
  //       : -1;
  //   filteredData.sort(
  //     (a: any, b: any) => (a[payload.sort] - b[payload.sort]) * sortOrder,
  //   );
  // }

  // return filteredData;
};

// // Function to check the search criteria

// // Check search criteria

// export const checkSearchCriteria = (payload: any) => {
//   // check name, email, fatherName, motherName, uncleName, hobbies, education, expectations, bio, subCaste, address.city, address.state, address.country

//   const searchFields = [
//     'name',
//     'email',
//     'fatherName',
//     'motherName',
//     'uncleName',
//     'hobbies',
//     'education',
//     'expectations',
//     'bio',
//     'subCaste',
//     'address.city',
//     'address.state',
//     'address.country',
//   ];

//   const hasMatch = searchFields.some(field => {
//     const value = userData[field];
//     return (
//       typeof value === 'string' &&
//       value.toLowerCase().includes(payload.search.toLowerCase())
//     );
//   });

//   if (!hasMatch) {
//     return false;
//   }
// };

// // Check salary range

// // Check height range

// // Check age range

// // Check brother range

// // Check sister range

// // check marital status

// // check city

// // check state

// // check country

// // Apply sorting if specified

// export const searchUsers = (payload: any) => {
//   // use checkSearchCriteria to filter the data

//   const filteredData = userData.filter((item: any) => {
//     checkSearchCriteria(payload);
//   });
// };

// Assuming userData is an array of user objects
// const userData = [...]; // Replace this with your actual data

// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria
// Function to check the search criteria

// export const checkSearchCriteria = (user, payload) => {
//   const searchFields = [
//     'name',
//     'email',
//     'fatherName',
//     'motherName',
//     'uncleName',
//     'hobbies',
//     'education',
//     'expectations',
//     'bio',
//     'subCaste',
//     'address.city',
//     'address.state',
//     'address.country',
//   ];

//   return searchFields.some(field => {
//     const value = getFieldByPath(user, field);
//     return (
//       typeof value === 'string' &&
//       value.toLowerCase().includes(payload.search.toLowerCase())
//     );
//   });
// };

// // Function to get nested fields by path
// const getFieldByPath = (obj, path) => {
//   return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
// };

// // Check salary range
// const checkSalaryRange = (user, payload) => {
//   return (
//     (!payload.minSalary || user.salary >= payload.minSalary) &&
//     (!payload.maxSalary || user.salary <= payload.maxSalary)
//   );
// };

// // Check height range
// const checkHeightRange = (user, payload) => {
//   return (
//     (!payload.minHeight || user.height >= payload.minHeight) &&
//     (!payload.maxHeight || user.height <= payload.maxHeight)
//   );
// };

// // Check age range
// const checkAgeRange = (user, payload) => {
//   return (
//     (!payload.minAge || user.age >= payload.minAge) &&
//     (!payload.maxAge || user.age <= payload.maxAge)
//   );
// };

// // Check brother range
// const checkBrotherRange = (user, payload) => {
//   return (
//     (!payload.minBrothers || user.brothers >= payload.minBrothers) &&
//     (!payload.maxBrothers || user.brothers <= payload.maxBrothers)
//   );
// };

// // Check sister range
// const checkSisterRange = (user, payload) => {
//   return (
//     (!payload.minSisters || user.sisters >= payload.minSisters) &&
//     (!payload.maxSisters || user.sisters <= payload.maxSisters)
//   );
// };

// // Check marital status
// const checkMaritalStatus = (user, payload) => {
//   return (
//     !payload.maritalStatus || user.maritalStatus === payload.maritalStatus
//   );
// };

// // Check city
// const checkCity = (user, payload) => {
//   return !payload.city || user.address.city.toLowerCase() === payload.city.toLowerCase();
// };

// // Check state
// const checkState = (user, payload) => {
//   return !payload.state || user.address.state.toLowerCase() === payload.state.toLowerCase();
// };

// // Check country
// const checkCountry = (user, payload) => {
//   return !payload.country || user.address.country.toLowerCase() === payload.country.toLowerCase();
// };

// // Apply sorting if specified
// const applySorting = (users, payload) => {
//   if (payload.sortBy) {
//     users.sort((a, b) => {
//       const fieldA = getFieldByPath(a, payload.sortBy);
//       const fieldB = getFieldByPath(b, payload.sortBy);

//       if (typeof fieldA === 'string' && typeof fieldB === 'string') {
//         return fieldA.localeCompare(fieldB);
//       } else {
//         return fieldA - fieldB;
//       }
//     });

//     if (payload.sortOrder === 'desc') {
//       users.reverse();
//     }
//   }

//   return users;
// };

// // Main search function
// export const searchUsers = (payload) => {
//   const filteredData = userData.filter((user) => {
//     return (
//       checkSearchCriteria(user, payload) &&
//       checkSalaryRange(user, payload) &&
//       checkHeightRange(user, payload) &&
//       checkAgeRange(user, payload) &&
//       checkBrotherRange(user, payload) &&
//       checkSisterRange(user, payload) &&
//       checkMaritalStatus(user, payload) &&
//       checkCity(user, payload) &&
//       checkState(user, payload) &&
//       checkCountry(user, payload)
//     );
//   });

//   const sortedData = applySorting(filteredData, payload);
//   return sortedData;
// };
