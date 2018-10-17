const filterData = (data, searchString, searchParam) => {
  const reg = new RegExp(`.*${searchString}.*`, 'i');
  return data.filter(item => reg.test(item[searchParam]));
};

export default filterData;
