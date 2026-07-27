'use strict';

// Task: Remove duplicates
// removeDubs - works with primitives
// removeDubObjs - works with data objects

/* ------------------------------- */
/*  Test data for -  removeDubs */
/* ------------------------------- */
const primitiveStrings = [
  'aa',
  'bb',
  'cc',
  'ccc',
  'cc',
  'cc',
  'cc',
  'dd',
  'aa',
  'cc',
  'bb',
  '01',
  'asdas',
  'cc',
  'aa',
  'a'
];
const expected_primitiveStrings = ['aa', 'bb', 'cc', 'ccc', 'dd', '01', 'asdas', 'a'];

const primitiveNumbers = [
  1,
  10,
  135,
  1,
  -10,
  0,
  -10,
  -10,
  -10,
  -101.123,
  10,
  3123,
  1,
  12312,
  15,
  1,
  -123,
  10
];
const expected_primitiveNumbers = [1, 10, 135, -10, 0, -101.123, 3123, 12312, 15, -123];
const oneItemArray = ['aaa'];

/* ------------------------------------- */
/*  Function Definition -  removeDubs */
/* ------------------------------------- */
/** [description #1] Bad algorithm, it doesn't work, because:
  removing elements of the iterated array inside forEach loop cause side effect:
  forEach skips the next element after removed element and doesn't check it,
  because, after we delete an element from an array, the array automatically adapt its indexes
  to save the numeric sequence of its indexes.
  But forEach doesn't.
  So, in the end mismatch appears (mismatch of real array element index after some element was deleted in the array, and forEach index)
  E.g.
  While iterating the array we removed some element with index 5, on the forEach's iteration number 5;
  after that the element with index 6 changes its index to 5,
  the element with index 7 changes its index to 6,
  but current iteration of the forEach loop doesn't change its number from 5 to 4,
  so, the next iteration number will be 6 but not 5,
  and the next checked element will be the element with index 7 that changed its index to 6,
  and the element with index 6 that changes its index to 5 will be skipped.
*/
// mutable method
// function removeDubs(dataList) {
//   if (!dataList || !(dataList instanceof Array) || dataList?.length < 2) return;
//   dataList.forEach((dataItem, index) => {
//     dataList.forEach((datItem2, index2) => {
//       if (dataItem === datItem2 && index !== index2) {
//         dataList.splice(index2, 1);
//       }
//     });
//   });
// }
/** Proper algorithm */
// mutable method
// imperative style - how we do - using js native loop like `while` or `for`
function removeDubs(dataList) {
  if (!dataList || !(dataList instanceof Array) || dataList?.length < 2) return dataList;
  let index = 0,
    index2 = 0,
    arraySize = dataList.length;
  while (index < arraySize) {
    // NOTE: when use 'wlile' loop, we should drop internal index on each iteration of the closest external loop
    index2 = 0;
    while (index2 < arraySize) {
      if (dataList[index] === dataList[index2] && index !== index2) {
        dataList.splice(index2, 1);
        --index2;
        --arraySize;
      }
      ++index2;
    }
    ++index;
  }

  return dataList;
}

// NOTE [algorithm approach] - deletion dubbed elements from array
/* Actually there are 2 ways to create algorithm for removing dub values"
   1. deletion dubbed values from the original array
   2. filling an additional array with uniq values and checking if a value exists in the additional array

   I've chosen the first approach, because creates less iterations of both external and internal loops
   while iterating dataList array.
   The first approach creates number of iterations from (dataList size)+1 to (dataList size)^2

   At the same time the second approach always creates (dataList size)^2 iterations,
   it double checks dubbed values that was already checked on the previous iterations of external loop.
*/


/* ------------------------------- */
/*  Test data for -  removeDubObjs */
/* ------------------------------- */

const objs = [
  { type: 'dog', name: 'Alex', age: 5 },
  { name: 'Alex', type: 'human', age: 32 },
  { type: 'dog', name: 'Mikky', age: 4 },
  { type: 'dog', name: 'Alex', age: 12 },
  { type: 'human', name: 'Alex', age: 17 },
  { type: 'dog', name: 'Alex', age: 5 },
  { type: 'human', name: 'Alex', age: 17 },
  { type: 'human', name: 'Alex', age: 32 },
  { type: 'dog', name: 'Mikky', age: 4 },
  { type: 'human', name: 'Miranda', age: 18 },
];

const expected_removeDubObjs_1 = [
  { type: 'dog', name: 'Alex', age: 5 },
  { name: 'Alex', type: 'human', age: 32 },
  { type: 'dog', name: 'Mikky', age: 4 },
  { type: 'human', name: 'Miranda', age: 18 },
];

const expected_removeDubObjs_2 = [
  { type: 'dog', name: 'Alex', age: 5 },
  { name: 'Alex', type: 'human', age: 32 },
  { type: 'dog', name: 'Mikky', age: 4 },
  { type: 'dog', name: 'Alex', age: 12 },
  { type: 'human', name: 'Alex', age: 17 },
  { type: 'human', name: 'Miranda', age: 18 }
];

const oneItemObjsArray = [{ type: 'dog', name: 'Alex', age: 5 }];

/* ------------------------------------- */
/*  Function Definition -  removeDubObjs */
/* ------------------------------------- */
/** Bad algorithm, it doesn't work properly, because [see description #1] */
// mutable method
// const removeDubObjs = (dataList, keysToCheck) => {
//   if (!dataList || !(dataList instanceof Array) || dataList?.length < 2) return;
//   dataList.forEach((dataItem, index) => {
//     dataList.forEach((datItem2, index2) => {
//       if (areObjsEqual(dataItem, datItem2, keysToCheck) && index !== index2) {
//         dataList.splice(index2, 1);
//       }
//     });
//   });
// }
/** Proper algorithm */
// mutable method
function removeDubObjs(dataList, keysToCheck) {
  if (!dataList || !(dataList instanceof Array) || dataList?.length < 2) return dataList;
  let index = 0, index2 = 0, arraySize = dataList.length;
  while (index < arraySize) {
    index2 = 0;
    while (index2 < arraySize) {
      if (areObjsEqual(dataList[index], dataList[index2], keysToCheck) && index !== index2) {
        dataList.splice(index2, 1);
        index2--;
        arraySize--;
      }
      index2++;
    }
    index++;
  }
  return dataList;
}


/* ------------------------------- */
/*  Test data for -  areObjsEqual */
/* ------------------------------- */
const obj1 = { type: 'human', name: 'Alex', age: 32 };
const obj2 = { type: 'human', name: 'Alex', age: 32 };
const obj3 = { type: 'human', name: 'Alex', age: 17 };
const obj4 = { type: 'dog', name: 'Mikky', age: 4 };
const obj5 = { type: 'dog', name: 'Alex', age: 5 };
const obj6 = { type: 'dog', name: 'Name', age: 5 };

/* ------------------------------------ */
/*  Function Definition -  areObjsEqual */
/* ------------------------------------ */

/** Bad algorithm, it doesn't work properly, because:
  there is no way to break the whole forEach loop in javascript
  `return false` or just `return` inside forEach callback doesn't works as operator break,
  in works only as operator continue, which stops current iteration but doesn't break the whole loop
*/
// function areObjsEqual(dataItem, dataItem2, keysToCheck) {
//   if (!dataItem || !dataItem2 || !keysToCheck || !(keysToCheck instanceof Array) || keysToCheck?.length < 1) return false;
//   let isEqual = false;
//   keysToCheck.forEach((key) => {
//     if (dataItem[key] === dataItem2[key]) {
//       isEqual = true;
//     } else {
//       isEqual = false;
//       return false;
//     }
//   });
//   return isEqual;
// }
/** Proper algorithm */
function areObjsEqual(obj, obj2, keysToCheck) {
  if (!obj || !obj2 || !keysToCheck || !(keysToCheck instanceof Array) || keysToCheck?.length < 1) return false;
  // [note] - array method .some() is better to apply here than .every()
  // because the .some() method stops iterating as soon as the condition is not true,
  // but the .every() method keeps iterating till the end of an array
  // return keysToCheck.every(key => obj[key] === obj2[key]);
  const areDifferent = keysToCheck.some(key => obj[key] !== obj2[key]);
  return !areDifferent;
}


/* ----------- */
/*  Run Tests  */
/* ----------- */
testRemoveDubs();
testAreObjsEqual();
testRemoveDubObjs();

/* ----------- */
/*  Define Tests  */
/* ----------- */

function testRemoveDubs() {
  console.log('------ removeDubs with primitive strings and numbers: before [js loop style] ------');
  console.log(null);
  console.log(undefined);
  console.log([]);
  console.log('abc');
  console.log(`''`);
  console.log(oneItemArray);
  console.log(primitiveStrings);
  console.log(primitiveNumbers);
  console.log('------ removeDubs: expected ------');
  console.log(null);
  console.log(undefined);
  console.log([]);
  console.log('abc');
  console.log(`''`);
  console.log(oneItemArray);
  console.log(expected_primitiveStrings);
  console.log(expected_primitiveNumbers);
  console.log('------after------');
  console.log(
    removeDubs(null)
  );
  console.log(
    removeDubs(undefined)
  );
  console.log(
    removeDubs([])
  );
  console.log(
    removeDubs('abc')
  );
  const resEmptyStr = removeDubs('');
  console.log(
    resEmptyStr === '' ?
      `''` : 'the result is not empty string as expected, it is : ',
    resEmptyStr
  );
  // NOTE - spread operator `...` allows immutable usage of mutable function
  console.log(
    removeDubs([...oneItemArray])
  );
  console.log(
    removeDubs([...primitiveStrings])
  );
  console.log(
    removeDubs([...primitiveNumbers])
  );
  console.log('\n\n');
}

function testAreObjsEqual() {
  console.log('------ areObjsEqual - are objects equal (skips non-primitive values and functions) ------');
  console.log('1 areObjsEqual, expects true: ', areObjsEqual(obj1, obj2, ['type', 'name', 'age']));
  console.log('2 areObjsEqual, expects true: ', areObjsEqual(obj1, obj2, ['type', 'name']));
  console.log('3 areObjsEqual, expects true: ', areObjsEqual(obj2, obj3, ['type', 'name']));
  console.log('4 areObjsEqual, expects false: ', areObjsEqual(obj2, obj3, ['type', 'name', 'age']));
  console.log('5 areObjsEqual, expects true: ', areObjsEqual(obj2, obj3, ['name']));
  console.log('6 areObjsEqual, expects false: ', areObjsEqual(obj2, obj3, []));
  console.log('7 areObjsEqual, expects false: ', areObjsEqual(obj2, obj3, null));
  console.log('8 areObjsEqual, expects false: ', areObjsEqual(obj2, null, null));
  console.log('9 areObjsEqual, expects false: ', areObjsEqual(null, null, null));
  console.log('A areObjsEqual, expects false: ', areObjsEqual(obj2, obj3, 'abc'));
  console.log('B areObjsEqual, expects false: ', areObjsEqual(obj4, obj5, ['type', 'name']));
  console.log('C areObjsEqual, expects true: ', areObjsEqual(obj4, obj5, ['type']));
  console.log('10 areObjsEqual, expects false: ', areObjsEqual(obj5, obj6, ['type', 'name', 'age']));
  console.log('\n\n');
}

function testRemoveDubObjs() {
  console.log('------removeDubObjs: before------');
  console.log('-- [1] [2] objs -- : ', objs);
  console.log('-- [3] one item objects array -- : ', oneItemObjsArray);
  console.log('-- [4] null -- : ', null);
  console.log('-- [5] undefined -- : ', undefined);
  console.log('------removeDubObjs: expected [1]------', expected_removeDubObjs_1);
  console.log('------removeDubObjs: expected [2]------', expected_removeDubObjs_2);
  console.log('------removeDubObjs: expected [3] : ', oneItemObjsArray);
  console.log('------removeDubObjs: expected [4] : ', null);
  console.log('------removeDubObjs: expected [5] : ', undefined);
  console.log('------after------');
  // NOTE - spread operator `...` allows immutable usage of mutable function
  console.log('[1] removeDubObjs : objects equal criteria - [type, name] : ',
    removeDubObjs([...objs], ['type', 'name']));
  console.log('[2] removeDubObjs : objects equal criteria - [type, name, age] : ',
    removeDubObjs([...objs], ['type', 'name', 'age']));
  console.log('[3] removeDubObjs : [type, name, age] : oneItemObjsArray : ',
    removeDubObjs([...oneItemObjsArray], ['type', 'name', 'age']));
  console.log('[4] removeDubObjs : [type, name, age] : null : ',
    removeDubObjs(null, ['type', 'name', 'age']));
  console.log('[5] removeDubObjs : [type, name, age] : undefined : ',
    removeDubObjs(undefined, ['type', 'name', 'age']));
  console.log('\n\n');
}
